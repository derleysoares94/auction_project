import { VStack, Heading, Text, Button } from "@chakra-ui/react";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { get_auctions, logout } from "../api/endpoints";

const Home = () => {
    const [auctions, setAuctions] = useState([])
    const nav = useNavigate();

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctions = await get_auctions()
            setAuctions(auctions)
        }
        fetchAuctions();
    }, [])

    return (
        <VStack>
            <Heading>Welcome back</Heading>
            <VStack>
                {auctions.map((auction) => {
                    return <Text key={auction.id}>{auction.description}</Text>
                })}
            </VStack>
        </VStack>
    )
}

export default Home;