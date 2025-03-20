import { defineStore, acceptHMRUpdate } from "pinia";
import { LocalStorage } from "quasar";
import { api } from "src/boot/axios";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";


export const useUserStore = defineStore('user', ()=>{

  const user = ref(LocalStorage.getItem('user') || null);
  const token = ref(LocalStorage.getItem('token') || null);
  const profile = ref();
  const router = useRouter();
  

  const getUser = computed(()=> user.value);

  const getToken = computed(()=> token.value);

  const getProfile = computed(()=> profile.value)

  const isAuthentificate = computed(()=> user.value !== null && token.value !== null);

  const setUser = (NewUser)=>{
    user.value = NewUser;
    LocalStorage.setItem('user', NewUser)
  }


  const register = async (email, name, username, password) =>{
    try {
      const response = await api.postForm('/auth/register', {email, name, username, password});

      if(response.status == 200){
        const data = response.data;
        user.value = data.user;
        LocalStorage.setItem('user', data.user)
        token.value = data.token;
        LocalStorage.setItem('token', data.token)
        router.replace('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (email, password) => {
    try {
      const response = await api.postForm('/auth/login', {email, password});

      if(response.status == 200){
        const data = response.data;
        user.value = data.user;
        LocalStorage.setItem('user', data.user)
        token.value = data.token;
        LocalStorage.setItem('token', data.token)
        router.replace('/');
      }
    } catch (error) {
      console.log(error)
    }
  }

  const replace = ()=>{
    if(!isAuthentificate.value){
      router.replace('/login');
    }
  }

  const logout = ()=>{
    user.value = null;
    token.value = null;
    LocalStorage.setItem('user', null);
    LocalStorage.setItem('token', null)
    router.replace('/login');
  }

  const getUserProfile = async (id) => {
    try {
      const user = await api.get(`/user/${id}`, {
        headers: {
          Authorization: `bearer ${token.value.token}`,
        }
      });
      console.log(user.data)
     profile.value = user.data;
    } catch (error) {
      console.log(error)
    }
  }

  return {login, logout, register, replace, isAuthentificate, getUser, getToken, setUser, getUserProfile, getProfile}
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}