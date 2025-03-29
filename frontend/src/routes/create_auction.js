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

    useEffect(() => {
        if (isAuthenticated && user.user_type !=='company') {
            navigate('/')
        }
    }, [isAuthenticated, user, navigate])

    return (
        <VStack>
            <h1>Create a new Auction</h1>
        </VStack>
    )
}

export default CreateAuction;