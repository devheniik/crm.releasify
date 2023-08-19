import {CreateToastFnReturn} from "@chakra-ui/react";


export default function handleValidationErrors(error: any, toast: CreateToastFnReturn) {
    if (Object.keys(error.response?.data?.data).length > 0) {
        for (const key in error.response?.data?.data) {
            toast({
                title: 'Validation error',
                description: error.response?.data?.data[key][0],
                status: 'error',
                duration: 9000,
                isClosable: true,
            })
        }
    }
}