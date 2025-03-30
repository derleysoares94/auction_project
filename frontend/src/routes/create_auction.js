import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    FormControl,
    FormLabel,
    Button,
    VStack,
    Input,
    Text,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';

const CreateAuction = () => {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [startPrice, setStartPrice] = useState('')
    const [currentPrice, setCurrentPrice] = useState('')

    useEffect(() => {
        if (isAuthenticated && user.user_type !=='company') {
            navigate('/')
        }
    }, [isAuthenticated, user, navigate])

    return (
        <VStack minH="500px" w="100%" maxW="800px" justifyContent="start" alignItems="start">
            <Text mb="20px" color="gray.700" fontSize="44px" fontWeight="bold">New Auction</Text>
            <FormControl mb="20px">
                <FormLabel>Title</FormLabel>
                <Input bg="white" onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Title" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Description</FormLabel>
                <Input bg="white" onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Description" />
            </FormControl>
            <FormControl mb="20px">
                <FormLabel>Start Price</FormLabel>
                <Input bg="white" onChange={(e) => setStartPrice(e.target.value)} value={startPrice} type="money" placeholder="Start price" />
            </FormControl>
            <FormControl>
                <FormLabel>Current Price</FormLabel>
                <Input bg="white" onChange={(e) => setCurrentPrice(e.target.value)} value={currentPrice} type="money" placeholder="Current price" />
            </FormControl>
            <Button mb="10px" colorScheme="blue" mt="20px" w="100%" >Register</Button>
        </VStack>
    )
}

export default CreateAuction;