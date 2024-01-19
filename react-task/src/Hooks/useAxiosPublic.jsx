import axios from "axios"

const axiosPublic = axios.create({
    baseURL: 'https://react-task-backend-phi.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;