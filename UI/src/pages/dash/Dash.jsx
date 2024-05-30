import { useNavigate } from "react-router-dom"
import { useMediaQuery } from "./../../Hooks/mediaQuery"
import { retriveData } from "../../utils/localStorage"
import { Chart } from "react-google-charts"
import { MainUrl } from "../../../variables"
import "../../../src/App.scss"
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHigh } from "react-icons/fa";
import { IoMdResize } from "react-icons/io";
import { Box, SimpleGrid, Icon, Text, useToast, Flex } from "@chakra-ui/react"
import { Grid, GridItem } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { io } from "socket.io-client"
import { Switch } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import ToggleSwitch from "../../components/toogler"
import GaugeChart from 'react-gauge-chart'
// import isEqual from "lodash/isEqual";





export const Dash = () => {
    let screenSize = useMediaQuery()
    const [sizeData, setSizeData] = useState(null)
    const [theresizeData, settheresizeData] = useState(false)
    let [data, setData] = useState(null)
    let [graphData, setGraphData] = useState(null)
    let [loading, setLoading] = useState(true)
    let [error, setError] = useState("")
    const navigator = useNavigate()
    const toast = useToast()
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


        const fetchGraphData = async () => {
            try {

                // Set loading to true while fetching data
                setLoading(true);
                // Fetch data from an API (replace with your API endpoint)
                const response = await fetch(`${MainUrl}data/graphdata/${retriveData("PData")?.deviceId}`);
                const result = await response.json();
                // console.log(result);
                if (result.success) {
                    let results = result?.body?.reverse();
                    let dataArray = [["Time", "Temp", "Hum"]]
                    results.map(element => {
                        dataArray.push([element?.createdAt.slice(11, 16), element?.temp, element?.hum])
                    })
                    setGraphData(dataArray)
                }
                // Set the fetched data to the state
                setLoading(false);
            } catch (error) {
                // Set error state in case of an error
                setError(error);
            } finally {
                // Set loading to false once the data is fetched (whether successful or not)
                setLoading(false);
            }
        };

        fetchGraphData();
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
            if (retriveData("PData")._id == data.userId) {
                setData(data)
                console.log("runned initially...");
                setGraphData((prevData) => {
                    if (prevData) {
                        setGraphData([prevData[0], ...prevData?.slice(2), [data?.createdAt?.slice(11, 16), data?.temp, data?.hum, data?.size]])

                    }
                })
                // fired socket should update the graph too
                // let graphDataCopy = graphData;
                // console.log("copy:   ", graphDataCopy);
                // let dataGraphMod = [graphDataCopy[0], ...graphDataCopy.slice(2), [data?.createdAt.slice(11, 16), data?.temp, data?.hum, data?.size]];
                // console.log(dataGraphMod);
                // setGraphData(dataGraphMod)
            }
        })
    }, [])

    useEffect(() => {
        const fetchSizes = async () => {
            try {

                // Set loading to true while fetching data
                settheresizeData(false);
                // Fetch data from an API (replace with your API endpoint)
                const response = await fetch(`${MainUrl}data/graphdata/sizes/${retriveData("PData")?.deviceId}`);
                const result = await response.json();
                console.log(result);
                if (result.success) {
                    let results = result?.body;
                    let dataArray = [["Time", "Avg Size"]]
                    results.map(element => {
                        dataArray.push([element?.createdAt.slice(11, 16), element?.average])
                    })
                    setSizeData(dataArray)
                    settheresizeData(true)
                }
                // Set the fetched data to the state
                setLoading(false);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSizes();
    }, [])


    const navigateTo = (path) => {
        navigator(`/auth/${retriveData("PData")._id}/history/${path}`)
    }

    const chartStyle = {
        height: "250px",
        width:"auto"
      }

    return (
        <>
            <Box px="0.7rem" mx="auto">
                <Box>
                    <Box mx="auto"  mt="3rem" width={{ base: '100%', sm: '80%', md: '70%' }}  className="glassBGS displayCenterVerically">
                        <Center>
                            <GaugeChart id="gauge-chart5"
                                nrOfLevels={120}
                                arcsLength={[0.3, 0.5, 0.2]}
                                colors={['#5BE12C', '#F5CD19', '#EA4228']}
                                percent={0.57}
                                formatTextValue={(v) => v+ "C"}
                                arcPadding={0.02}
                                // style={chartStyle} 
                            />
                        </Center>
                        <Center>
                            <ToggleSwitch />
                        </Center>
                        <Box pb={"1.2rem"}></Box>
                    </Box>

                </Box>

            </Box>
        </>
    )
}

