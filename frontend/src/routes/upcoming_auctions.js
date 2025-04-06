import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, List, ListItem, Spinner } from '@chakra-ui/react';
import { useAuth } from '../context/useAuth';
import { get_user_auctions } from "../api/endpoints";

const UpcomingAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchAuctions = async () => {
            const auctions = await get_user_auctions(user.id)
            setAuctions(auctions)
            setLoading(false);
        }
        fetchAuctions()
    }, [])

    return (
        <Box p={6}>
            <Heading mb={4}>Upcoming or Ongoing Auctions</Heading>
            {loading ? (
                <Spinner size="xl" />
            ) : auctions.length > 0 ? (
                <List spacing={4}>
                        {auctions.map((auction) => (
                        <ListItem key={auction.id} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                            <VStack align="start">
                                <Heading size="md">{auction.title}</Heading>
                                <Text>
                                        <strong>Start:</strong> {new Date(auction.start_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                </Text>
                                <Text>
                                        <strong>End:</strong> {new Date(auction.end_date).toLocaleString('en-IE', { dateStyle: 'short' })}
                                </Text>
                            </VStack>
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Text>No upcoming or ongoing auctions.</Text>
            )}
        </Box>
    );
};

export default UpcomingAuctions;