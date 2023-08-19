import axios from '../utils/axios'
import {UpdateUser} from "../types/User.ts"
const updateProfile = async (payload: UpdateUser) => await axios.put('profile', payload)

export default updateProfile