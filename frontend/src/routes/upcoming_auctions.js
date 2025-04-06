import React, { useState, useEffect } from 'react';
import { Box, Heading, Text, VStack, List, ListItem, Spinner } from '@chakra-ui/react';

const UpcomingAuctions = () => {
    const [auctions, setAuctions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Mock de dados ou chamada para API
    useEffect(() => {
        const fetchAuctions = async () => {
            // Substitua pelo fetch de uma API real, se necessário
            const mockData = [
                { id: 1, title: 'Auction 1', startTime: '2025-10-10T10:00:00', endTime: '2025-10-10T12:00:00' },
                { id: 2, title: 'Auction 2', startTime: '2025-10-12T14:00:00', endTime: '2025-10-12T16:00:00' },
                { id: 3, title: 'Auction 3', startTime: '2025-10-08T08:00:00', endTime: '2025-10-08T10:00:00' },
            ];
            setTimeout(() => {
                setAuctions(mockData);
                setLoading(false);
            }, 1000); // Simula um delay de carregamento
        };

        fetchAuctions();
    }, []);

    // Filtrar leilões futuros ou em andamento
    const getUpcomingOrOngoingAuctions = () => {
        const now = new Date();
        return auctions.filter(
            (auction) =>
                (new Date(auction.startTime) <= now && new Date(auction.endTime) >= now) || // Em andamento
                new Date(auction.startTime) > now // Futuros
        );
    };

    const filteredAuctions = getUpcomingOrOngoingAuctions();

    return (
        <Box p={6}>
            <Heading mb={4}>Upcoming or Ongoing Auctions</Heading>
            {loading ? (
                <Spinner size="xl" />
            ) : filteredAuctions.length > 0 ? (
                <List spacing={4}>
                    {filteredAuctions.map((auction) => (
                        <ListItem key={auction.id} borderWidth="1px" borderRadius="lg" p={4} boxShadow="md">
                            <VStack align="start">
                                <Heading size="md">{auction.title}</Heading>
                                <Text>
                                    <strong>Start:</strong> {new Date(auction.startTime).toLocaleString()}
                                </Text>
                                <Text>
                                    <strong>End:</strong> {new Date(auction.endTime).toLocaleString()}
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