import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Image, useToast
} from '@chakra-ui/react'
import {useSelector} from "react-redux"
import {UserStore} from "../types/User.ts"
import React, {useState} from "react"
import handleChangeObject from "../hooks/handleChangeObject.ts"
import {UpdateUser} from "../types/User.ts"
import updateProfile from "../apis/updateProfile.ts";
import handleAxiosErrors from "../hooks/handleAxiosErrors.ts";

const ProfilePage = () => {

    const userStore = useSelector((state: { user: UserStore }) => state.user)
    const toast = useToast()

    const [user, setUser] = useState<UpdateUser>({
        name: userStore.user.name,
        username: userStore.user.username,
        email: userStore.user.email,
        avatar_url: userStore.user.avatar_url,
        password: "",
        repeat_password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeObject(user, setUser, event)
    }

    const handleSubmit = () => {
        updateProfile(user)
            .then(() => {
                console.log("Profile updated")
            })
            .catch((error) => {
                handleAxiosErrors(error, toast)
            })
    }

    return (
        <div className={"space-y-6 sm:w-1/2"}>

            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                    name="name"
                    defaultValue={user.name}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                    name="username"
                    defaultValue={user.username}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                    name="email"
                    type="email"
                    defaultValue={user.email}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Avatar</FormLabel>
                <Image
                    src={user.avatar_url}
                    className={"mb-2"}
                    alt="Avatar"
                    width="100px"
                    height="100px"
                />
                <Input
                    name="avatar_url"
                    type="url"
                    defaultValue={user.avatar_url}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                    name="password"
                    type="password"
                    defaultValue={user.password}
                    onChange={handleChange}
                />
            </FormControl>

            <FormControl>
                <FormLabel>Repeat password</FormLabel>
                <Input
                    name="repeat_password"
                    type="password"
                    defaultValue={user.repeat_password}
                    onChange={handleChange}
                />
            </FormControl>

            <div className={"space-x-2"}>
                <Button colorScheme="blue" onClick={handleSubmit}>Update</Button>
                <Button color="red" >Delete account</Button>
            </div>

        </div>
    )
}

export default ProfilePage