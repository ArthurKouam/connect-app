import { defineStore, acceptHMRUpdate } from "pinia";
import { api } from 'src/boot/axios'
import { useUserStore } from './UserStore'
import {computed, ref} from "vue";

export const useFriendStore = defineStore('friends', () => {
  const userStore = useUserStore()
  const token = userStore.getToken.token

  const friendAsks = ref([])
  const friends = ref([])
  const recommend = ref([])
  const myFriend = ref([])

  const getRecommend = computed(() => recommend.value)
  const getAsks = computed(()=> friendAsks.value)
  const getFriendsReq = computed(()=> friends.value)
  const getMyFriend = computed(()=> myFriend.value)


  const getMyFriends = async ()=>{
    try {
      const response = await api.get('/friend', {
        headers: {
          Authorization: `bearer ${token}`
        }

      })
      myFriend.value = response.data;
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const getFriendAsks = async () => {
    try {
      const response = await api.get('/friend-requests/for_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data)
      friendAsks.value = response.data
    } catch (error) {
      console.error(error)
    }
  }


  const getRecommendFriends = async () => {
    const userStore = useUserStore();
    const user = userStore.getUser
    const token = userStore.getToken.token;
    try {
      const response = await api.get(`/friend-requests/recommend/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      recommend.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getFriendsRequest = async () => {
    try {
      const response = await api.get('/friend-requests/from_user', {
        headers: { Authorization: `Bearer ${token}` }
      })
      friends.value = response.data
    } catch (error) {
      console.error(error)
    }
  }

  const sendFriendRequest = async (userId) => {
    try {
      await api.post('/friend-requests', { id: userId }, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const acceptFriendRequest = async (first) => {
    const userStore = useUserStore();
    const user = userStore.getUser
    try {
      const response = await api.put('/friend-requests', { first, second: user.id}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      console.log(response.data)
      getFriendAsks()
    } catch (error) {
      console.error(error)
    }
  }

  const rejectFriendRequest = async (first) => {
    const userStore = useUserStore();
    const user = userStore.getUser
    try {
      const response = await api.delete('/friend-requests', {
        headers: { Authorization: `Bearer ${token}` },
        params: { first, second: user.id}
      })
      console.log(response.data);
      getFriendAsks()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getAsks,
    friends,
    recommend,
    getMyFriend,
    getRecommend,
    getFriendsReq,
    getFriendsRequest,
    getMyFriends,
    getRecommendFriends,
    getFriendAsks,
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFriendStore, import.meta.hot))
}

