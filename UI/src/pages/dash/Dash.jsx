import { retriveData } from "../../utils/localStorage"
import { MainUrl } from "../../../variables"
import "../../../src/App.scss"
import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { Center, Square, Circle } from '@chakra-ui/react'
import GaugeChart from 'react-gauge-chart'




export const Dash = () => {
    let [data, setData] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState("")
    const [percentage, setpercentage] = useState(0)
    useEffect(() => {
        //
        const fetchData = async () => {
            try {
                // Set loading to true while fetching data
                setLoading(true);

                // Fetch data from an API (replace with your API endpoint)
                const response = await fetch(`${MainUrl}data/retrieve/${retriveData("PData")._id}`);
                const result = await response.json();

                // Set the fetched data to the state
                setData(result.body);
                setpercentage(Number((result?.body?.weight / result?.body?.GasSize)).toFixed(3))

                setLoading(false);
            } catch (error) {
                // Set error state in case of an error
                setError(error);
            } finally {
                // Set loading to false once the data is fetched (whether successful or not)
                setLoading(false);
            }
        };

        // Call the fetchData function when the component mounts
        fetchData();
    }, [])

    const options = {
        title: "Temp + Humidity",
        titleTextStyle: {
            fontSize: 20
        },
        legend: { position: "bottom" },
    };
    const option2 = {
        title: "Average size",
        titleTextStyle: {
            fontSize: 20
        },
        legend: { position: "bottom" },
    };




    useEffect(() => {
        let socket = io(MainUrl)
        socket.on("connect", () => {
            console.log("connected... successfull, id: ", socket.id);
        })
        socket.on("newData", (data) => {
            if (true) {
                // retriveData("PData")._id == data.userId
                setData(data)
                setpercentage(Number(data?.weight / data?.GasSize).toFixed(4))
            }
        })
    }, [])


    return (
        <>
            <Box px="0.7rem" mx="auto">
                <Box mx="auto" mt="3rem" width={{ base: '100%', sm: '90%', md: '70%' }} className="glassBGS displayCenterVerically">
                    <Box mx="auto" width={{ base: '100%', sm: '80%', md: '60%' }}>
                        <Center>
                            <GaugeChart id="gauge-chart5"
                                nrOfLevels={100}
                                arcsLength={[0.3, 0.5, 0.2]}
                                colors={['#EA4228', '#F5CD19','#5BE12C', ]}
                                percent={Number(percentage)}
                                formatTextValue={(v) => v + "%"}
                                needleColor="rgb(21    1, 34, 63)"
                                arcPadding={0.02}
                                hideText
                            // style={chartStyle}
                            />

                        </Center>

                        <Box py={"0rem"} style={{ fontSize: "1.9rem", color: "whitesmoke", top: "-19px", position: "relative", textAlign: "center", fontWeight: "bolder" }}>
                            {Number(percentage* 100).toFixed(2)} %
                        </Box>

                        <Box py={"1.6rem"}>
                            <div className="container row infoDesc">
                                <div style={{color:"#1b4332"}} className="col s8 textFontSized">Current Weight:  </div>
                                <div style={{ textAlign: "center" }} className="col s4 namespec textFontSized"> {Number(data?.weight).toFixed(2)} kg</div>
                            </div>
                            <div className="container row infoDesc">
                                <div style={{color:"#1b4332"}} className="col s8 textFontSized">Usage %:  </div>
                                <div style={{ textAlign: "center" }} className="col s4 namespec textFontSized">  {Number(percentage* 100).toFixed(2)} </div>
                            </div>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

