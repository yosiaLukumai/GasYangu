import "./../../App.scss"
import { useEffect, useState } from "react"
import { Box, Text, Table, TableContainer, Tr, Td, Tfoot, Tbody, Thead, Th, TableCaption } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import { MainUrl } from "../../../variables"
import { retriveData } from "../../utils/localStorage"
import TableParameter from "./../../components/tableParameter"
import TableParametersBox from "../../components/tableParameterBox"
export const History = () => {
    const [loading, setLoading] = useState(true)
    const { parameter } = useParams()
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    console.log(parameter);
    useEffect(() => {

        const fetchData = async () => {
            try {
                // Set loading to true while fetching data
                setLoading(true);

                // Fetch data from an API (replace with your API endpoint)
                // /specific/:parameter/:id
                const response = await fetch(`${MainUrl}data/specific/${parameter}/${retriveData("PData")._id}`);
                const result = await response.json();
                console.log(result);
                // // Set the fetched data to the state
                if (result.success) {
                    setData(result.body);
                    // console.log(result.body);

                }
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

    return (
        <>
            <Box px="0.7rem" mx="auto">
                <Box mx="auto" pt="2rem" pb="1rem" width={{ base: '100%', sm: '80%', md: '70%' }}>
                    <Text fontWeight="bold" fontSize="1.7rem" color="#023047"> {(parameter == "size") ? "Vegetables" : ''} {parameter} Logs.</Text>
                </Box>
                {
                    (parameter == "Temperature" || parameter == "Humidity") && <TableParameter data={data} parameter={parameter} />
                }
                {
                    parameter == "size" && <TableParametersBox data={data} />
                }

            </Box>

        </>
    )
}