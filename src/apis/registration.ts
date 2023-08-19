import axios from 'axios'

export default async function register(username: string, email: string, password: string) {
    return await axios.post(import.meta.env.VITE_API_URL + 'register', {
        username,
        email,
        password
    })
}

// export default getProfile