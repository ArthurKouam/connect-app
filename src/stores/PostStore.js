import { defineStore, acceptHMRUpdate } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./UserStore";
import { useRouter } from "vue-router";
import {computed, ref} from "vue";


export const usePostStore = defineStore('posts', ()=>{

  const page = ref(1)
  const posts = ref([]);
  const morePage = ref(true)
  const isLoading = ref(false)
  const profilePost = ref();
  const currentPost = ref();

  const userStore = useUserStore();
  const router = useRouter();

  const token = userStore.getToken;

  const getLoading = computed(()=> isLoading.value);
  const getPage = computed(()=> morePage.value);
  const getPosts = computed(()=>posts.value);
  const getMorePage = computed(()=> morePage.value);
  const getProfilePost = computed(()=> profilePost.value);
  const getCurrentPost = computed(()=> currentPost.value);

  const getById = (id)=>{
    for(const tabPost of posts.value){
      for (const post of tabPost) {
        if(post.post.id === id) {
          currentPost.value = post;
          return
        }
      }
    }

    getPost(id).then(res => currentPost.value = res);

  }

  const newPost = async (content, files) => {

    if (content === "" && !files) {
      return
    }

    isLoading.value = true;

    try {

      const response = await api.postForm('/posts', {description: content, picture: files}, {
        headers: {
          Authorization: `${token.type} ${token.token}`,
          'Content-Type': 'multipart/form-data',
        }
      });

      if(response.status === 200){
        reset();
        await router.replace('/');
      }

    } catch (error) {
      console.log(error);
    }finally{
      isLoading.value = false
    }

  }

  const getPost = (id)=>{
    try {
      const response = api.get(`/posts/${id}`).then(res => res.data)
      return response;
    } catch (error) {
      console.error(error)
    }
  }

  const getAllPost = async ()=>{
    if(isLoading.value || !morePage.value){
      return;
    }else {
      isLoading.value = true;
      try {
        const response = await api.get('/posts', {
          params: {
            page: page.value,
          }
        });

        if(response.status === 200){
          posts.value.push(response.data.tabPosts);
          console.log(posts.value);
          morePage.value = response.data.meta.current_page < response.data.meta.last_page;
          page.value ++;
          console.log("post: ", getById(17))
        }
      }catch (e) {
        console.log(e);
      }finally {
        isLoading.value = false;
      }

    }
  }

  const getPostforUser = async (id) => {
    try{
      const response = await api.get(`/posts/users/${id}`);

      profilePost.value = response.data;
    }catch(e){
      console.log(e)
    }
  }

  const reset = ()=>{
    page.value = 1;
    posts.value = [];
    morePage.value = true;
    isLoading.value = false;
  }
  return {newPost, getAllPost, getPosts, getCurrentPost, getLoading, getPage, getMorePage, reset, getById, getPostforUser, getProfilePost}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostStore, import.meta.hot))
}
