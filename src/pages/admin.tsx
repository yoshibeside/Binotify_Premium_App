import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import {
    Divider, Flex,
    Heading, HStack, Icon, IconButton, Input, Link, Text,
    useMediaQuery, VStack
} from "@chakra-ui/react";
import { MdLogout } from 'react-icons/md';
import { SubscriptionTable } from "../components/subscriptionTable";
import { Subscription } from "../types/models";

const sampleSubs1: Subscription = {
    creatorId: 1,
    creatorName: 'test',
    subscriberId: 1,
    status: 'PENDING'
}

const sampleSubs2: Subscription = {
    creatorId: 2,
    creatorName: 'test2',
    subscriberId: 1,
    status: 'ACCEPTED'
}

const sampleSubs3: Subscription = {
    creatorId: 3,
    creatorName: 'test3',
    subscriberId: 1,
    status: 'REJECTED'
}

const Admin = () => {
    const token = localStorage.getItem('token');

    const requests = [sampleSubs1, sampleSubs2, sampleSubs3, sampleSubs1, sampleSubs2, sampleSubs3, sampleSubs1, sampleSubs2, sampleSubs3, sampleSubs1, sampleSubs2, sampleSubs3];

    const [smallScreen] = useMediaQuery("(max-width: 800px)");
    var offset = 0;
    var page = 1;
    // if smallScreen, page will only display 4 songs
    // else page will display 6 songs
    if (smallScreen) {
        offset = 6;
    }
    else {
        offset = 9;
    }

    const reqSubset = requests.slice(offset * (page - 1), offset * page);

    return (
        <>
        <VStack padding='20px 40px 20px' gap='20px' width='100%'>
            <Flex direction='row' justify='space-between' width='100%'>
                <Heading color='palette.lightPink'
                fontSize='3xl'
                >Your Songs</Heading>
                <Flex direction='row' align='center' gap='10px'>
                    <Input placeholder='Search' 
                    focusBorderColor='palette.white'
                    height='2rem'/>
                    <Flex gap='5px' align='center' minW='-webkit-fit-content'>
                        <Icon
                            as={MdLogout}
                            href='/user/1' 
                            color='gray' 
                            fontWeight='semibold' 
                            fontSize='1.2rem' 
                            _hover={{color:'palette.white', cursor:'pointer'}}  />
                        <Link href="/user/1" 
                            color='gray' 
                            fontWeight='semibold' 
                            fontSize='1rem'
                            _hover={{color:'palette.white', cursor:'pointer'}}>Log Out</Link>
                    </Flex>
                </Flex>
            </Flex>
            <Divider />
            <SubscriptionTable subscriptions={reqSubset}/>
            <HStack bottom='0' justifyContent='flex-end' width='90%' gap='10px'>
                <IconButton 
                    aria-label="Previous Page" 
                    fontSize='1.5rem' 
                    size='sm' 
                    icon={<ChevronLeftIcon />}
                     />
                <Text color='palette.lightPink' fontSize='1.2rem'>0</Text>
                <IconButton 
                    aria-label="Next Page" 
                    fontSize='1.5rem' 
                    size='sm' 
                    icon={<ChevronRightIcon />}
                     />
            </HStack>
        </VStack>
        </>
    );
}

export default Admin;