import React, { useState, useEffect } from 'react'
import { Box, Heading, Text, VStack, List, ListItem, Spinner, Button } from '@chakra-ui/react'
import { useAuth } from '../context/useAuth'
import { get_user_auctions, delete_auction } from "../api/endpoints"

import { useNavigate } from 'react-router-dom'

const UpcomingAuctions = () => {
    const [auctions, setAuctions] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useAuth()
    const nav = useNavigate()

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctions = await get_user_auctions(user.id)
            setAuctions(auctions)
            setLoading(false)
        }
        fetchAuctions()
    }, [])

    const handleDelete = async (auction_id) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (confirmDelete) {
            setLoading(true);
            await delete_auction(auction_id);
            const auctions = await get_user_auctions(user.id)
            setAuctions(auctions)
            setLoading(false)
        }
    }

    return (
        <Box p={6}>
            <Heading mb={4}>Upcoming or Ongoing Auctions</Heading>
            {loading ? (
                <Spinner size="xl" />
            ) : auctions.length > 0 ? (
                <List spacing={4}>
                        {auctions.map((auction) => (
                            <ListItem key={auction.id} position="relative" padding="20px" border="1px solid #ccc" borderRadius="8px" boxShadow="md">
                            <VStack align="start">
                                <Heading size="md">{auction.title}</Heading>
                                <Text>
                                        <strong>Start:</strong> {new Date(auction.start_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                </Text>
                                <Text>
                                        <strong>End:</strong> {new Date(auction.end_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                </Text>
                                <Box
                                    position="absolute"
                                    bottom="10px"
                                    right="10px"
                                    display="flex"
                                    gap="10px"
                                >
                                    <Button mb="10px" colorScheme="green" mt="20px" w="100%" onClick={() => nav(`/update_auction/${auction.id}/`)}>Edit</Button>
                                    <Button mb="10px" colorScheme="red" mt="20px" w="100%" onClick={() => handleDelete(auction.id)}>Delete</Button>
                                </Box>
                            </VStack>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Text>No upcoming or ongoing auctions.</Text>
            )}
        </Box>
    )
}

export default UpcomingAuctions;