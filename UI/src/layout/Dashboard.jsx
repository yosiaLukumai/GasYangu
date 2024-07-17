import { NavLink, Outlet, useNavigate } from "react-router-dom"
import "./../App.scss"
import { useMediaQuery } from "./../Hooks/mediaQuery"
import { PiPlant } from "react-icons/pi";
import { retriveData, save } from "../utils/localStorage"
import { IoLogInOutline } from "react-icons/io5";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";
import { Box, Flex, Heading, Spacer, Icon } from "@chakra-ui/react"
import { MdDeviceHub } from "react-icons/md";
export const DashBoard = () => {
    let screenSize = useMediaQuery()
    const navigator = useNavigate()

    const navigateTo = (path) => {
        navigator(`/auth/${retriveData("PData")?._id}/${path}`)
    }

    const logout = () => {
        console.log("logging out");
        save("PData", null);
        // console.log(retriveData("PData"), "data....");

        navigator("/", { replace: true });

    }
    return (
        <>
            <Box background="#8b808b" height="100vh">
                <Box backgroundColor="#023047">
                    <Box py="0.7rem" px="0.7rem" mx="auto" width={{ base: '100%', sm: '80%', md: '70%' }}>
                        <Flex minWidth='max-content' alignItems='center' gap='2'>
                            <Box p='2' cursor="pointer" onClick={() => navigateTo("")}>
                                <Heading size='lg' color="#70e000" display="flex" gap="2"><  MdDeviceHub color="white" /> G.Yangu </Heading>
                            </Box>
                            <Spacer />
                            <Icon color="white" cursor="pointer" onClick={() => navigateTo("info")} boxSize="1.5rem" as={FaInfoCircle} />
                            <Icon color="white" cursor="pointer" ml="0.7rem" boxSize="1.9rem" as={IoLogInOutline} onClick={() => logout()} />
                        </Flex>
                    </Box>
                </Box>

                <Box>
                    <Outlet />
                </Box>
            </Box>
        </>
    )
}
