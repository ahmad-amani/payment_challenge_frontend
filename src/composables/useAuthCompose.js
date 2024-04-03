import { useAuthStore } from "@/stores/Auth"
import { ref } from "vue";
import { useRouter } from "vue-router"
import { toast } from 'vue3-toastify';
import axios from "@/axios";
export default function useAuthCompose() {
    const password = ref('')
    const username = ref('')
    const auth = useAuthStore()
    const router = useRouter()

    const logout = () => {
        //todo: request to api. skip for now
        auth.user = null
        localStorage.removeItem('user')
        router.push('login')
    }

    const login = async () => {
        try {
            const res = await axios.post('login', { password: password.value, username: username.value })
            updateUser(res.data.user)
            router.push('/dashboard')

        } catch (e) {
            console.log(e);
        }
    }
    const register = async () => {
        try {
            if (password.value.length < 8) {
                toast.error('password must be at least 8 char')
                return;
            }


            const res = await axios.post('register', { username: username.value, password: password.value })
            toast('successfull, redirect to login page...', { autoClose: 1000 })
            setTimeout(() => router.push('/login'), 1600)
        } catch (e) { }

        return true;
    }

    const updateUser = (user) => {

        if (auth.user && auth.user.token && !user.token) {
            user.token = auth.user.token
        }

        auth.user = user
        localStorage.setItem('user', JSON.stringify(user))

    }

    return { username, password, login, logout, register, updateUser }

}