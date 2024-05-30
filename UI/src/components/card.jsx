import { Text, Box, Stack, Input, Button } from '@chakra-ui/react'
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react'
import { MainUrl } from "../../variables"
import { retriveData, save } from "./../utils/localStorage"
const CardComponent = ({ onChildEvent }) => {
    const [stateChoose, setStateChosen] = useState("Login")
    const toast = useToast()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState("");
    const [loading, setLoading] = useState(false)
    const [loadingR, setLoadingR] = useState(false)



    const handleLogin = async () => {
        setLoading(true)
        // check if all credential are provided 
        if (password.trim() != "" || email.trim() != "") {
            // a request can be sent to login
            console.log("Main Url", `${MainUrl}/user/login`);
            const result = await fetch(`${MainUrl}user/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim()
                }),
                mode: "cors"
            })
            const response = await result.json();
            if (response.success != false && response.body != null) {
                // a user is registered check the payload save the user to the 
                save("PData", response.body.user)
                onChildEvent(response.body.user)


            } else if (response.body == "Incorrect Password") {
                toast({
                    title: ' Incorrect Password',
                    status: 'info',
                    position: "top",
                    duration: 3000,
                    isClosable: true,

                })
            } else {
                toast({
                    title: ' No such user..',
                    status: 'error',
                    position: "top",
                    duration: 3000,
                    isClosable: true,

                })
            }
        } else {
            toast({
                title: 'Fill all the field.',
                status: 'warning',
                position: "top",
                duration: 4000,
                isClosable: true,

            })
        }
        setLoading(false)

    }


    const handleRegister = async () => {
        setLoadingR(true);
        if (email.trim() != "" && deviceId.trim() != "" && password.trim() != "") {
            const result = await fetch(`${MainUrl}user/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim(),
                    deviceId: deviceId.trim()
                }),
                mode: "cors"
            })
            const response = await result.json();
            // console.log(response);
            if (response.success) {
                // console.log(response);
                toast({
                    title: 'Successful created the account.',
                    status: 'success',
                    position: "top",
                    duration: 2500,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'Email | deviceId already taken.',
                    status: 'warning',
                    position: "top",
                    duration: 2500,
                    isClosable: true,
                })
            }
        } else {
            toast({
                title: 'Please fill all Field.',
                status: 'warning',
                position: "top",
                duration: 2500,
                isClosable: true,
            })
        }
        setLoadingR(false)
    }

    return (<>

        <Text fontWeight="bold" fontSize="1.6rem" align="center"> {stateChoose}</Text>
        <Box my="2rem">
            {
                stateChoose == "Login" ? (
                    <>
                        <Stack
                            alignItems="center"  // Center the items horizontally within the Stack
                            mx="auto"
                            my="0"
                            spacing={4}
                            width={{ base: '100%', sm: '80%', md: '70%' }}
                        >
                            <Input value={email} onChange={e => setEmail(e.target.value)} variant='outline' placeholder='Email' color="red" fontWeight="bold" _placeholder={{ opacity: 1, color: 'pink.700' }} />
                            <Input value={password} onChange={e => setPassword(e.target.value)} variant='outline' color="red" fontWeight="bold" placeholder='Password' _placeholder={{ opacity: 1, color: 'pink.700' }} />
                        </Stack>

                        <Box width={{ base: '100%', sm: '80%', md: '70%' }} mx='auto' mt="1.3rem">
                            <Button my="0rem" onClick={() => handleLogin()} colorScheme='blue' px="6rem" isLoading={loading}>Login</Button>
                        </Box>

                        <Box width={{ base: '100%', sm: '80%', md: '70%' }} mx="auto" my="0" pt="1rem" display="flex">
                            <Box>
                                <Text fontSize="1.2rem" fontWeight="bold" display="flex">No acc.?  </Text>
                            </Box>
                            <Box>
                                <Text pl="0.7rem" fontSize="1.2rem" cursor="pointer" onClick={(e) => setStateChosen("Sign Up")} fontWeight="bold" display="flex" color="blue.600">Register here.</Text>
                            </Box>

                        </Box>

                    </>


                ) : stateChoose == "Sign Up" && (
                    <>
                        <Stack
                            alignItems="center"  // Center the items horizontally within the Stack
                            mx="auto"
                            my="0"
                            spacing={4}
                            width={{ base: '100%', sm: '80%', md: '70%' }}
                        >
                            <Input value={email} onChange={e => setEmail(e.target.value)} variant='outline' placeholder='Email' color="red" fontWeight="bolder" _placeholder={{ opacity: 1, color: 'pink.700' }} />
                            <Input value={password} onChange={e => setPassword(e.target.value)} variant='outline' color="red" fontWeight="bolder" placeholder='Password' _placeholder={{ opacity: 1, color: 'pink.700' }} />
                            <Input value={deviceId} onChange={e => setDeviceId(e.target.value)} variant='outline' color="red" fontWeight="bolder" placeholder='DeviceId' _placeholder={{ opacity: 1, color: 'pink.700' }} />
                        </Stack>

                        <Box width={{ base: '100%', sm: '80%', md: '70%' }} mx='auto' mt="1.3rem">
                            <Button colorScheme='blue' my="0rem" px="6rem" onClick={handleRegister} isLoading={loadingR}>Register</Button>
                        </Box>

                        <Box width={{ base: '100%', sm: '80%', md: '70%' }} mx="auto" my="0" pt="1rem" display="flex">
                            <Text onClick={() => setStateChosen("Login")} fontSize="1.2rem" fontWeight="bold" color="blue.600" cursor="pointer">Login here</Text>
                        </Box>
                    </>

                )
            }

        </Box>




    </>)
}

export default CardComponent;