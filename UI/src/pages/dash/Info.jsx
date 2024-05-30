import "./../../App.scss"
import { useState } from "react"
import { retriveData } from "../../utils/localStorage"
import { Box, Icon } from "@chakra-ui/react";
import { VscRadioTower } from "react-icons/vsc";
import { useMediaQuery } from "../../Hooks/mediaQuery";

export const Info = () => {
    const [user, changeUser] = useState(retriveData("PData"))
    let screensxize = useMediaQuery()

    return (
        <>
            <Box background="#8b808b">
                <Box py="0.7rem" px="0.7rem"  mx="auto" width={{ base: '100%', sm: '80%', md: '70%' }}>
                    <Box   py={5} className="glassBGS">
                        <div className="dashIcon" style={{ padding: "1rem 0" }}>
                            <Icon color="#023047" ml="0.7rem" boxSize="5.4rem" as={VscRadioTower} />
                        </div>
                        <div style={{ paddingTop: "1.2rem 0", textAlign: "center", fontSize: "1.5rem", fontWeight: "bolder", color: "white" }}>
                            Your Account Info
                        </div>
                        <div style={{ paddingTop: "20px" }}></div>
                        <div className="container row infoDesc">
                            <div className="col s4 ">Email </div>
                            <div className="col s7 namespec">{user?.email}</div>
                        </div>
                        <div className="container row infoDesc">
                            <div className="col s4">Device Id</div>
                            <div className="col s6 namespec">{user?.deviceId}</div>
                        </div>
                    </Box>
                </Box>

            </Box>

        </>
    )
}