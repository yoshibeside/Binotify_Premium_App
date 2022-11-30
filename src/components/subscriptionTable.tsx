import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import {
    Button, ButtonGroup, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery
} from '@chakra-ui/react';
import { useState } from 'react';

import { Subscription } from '../types/models';


const SubscriptionEntry = ({ subscription }: { subscription: Subscription }) => {
    
    function RenderButton () {

        const handleAccept = () => {
            console.log('accept');
    
            // belum diimplementasi
        }
    
        const handleReject = () => {
            console.log('reject');
    
            // belum diimplementasi
        }

        if (subscription.status == 'PENDING') {
            return (
                <ButtonGroup
                    display='flex'
                    justifyContent='start'
                    size='sm'
                    gap='5px'
                    alignItems='center'>
                        <Button
                            leftIcon={<CheckIcon/>}
                            onClick={handleAccept}>
                                Approve
                        </Button>
                        <Button
                            leftIcon={<CloseIcon />}
                            onClick={handleReject}>
                                Reject
                        </Button>
                    </ButtonGroup>
            )
        }
        if (subscription.status == 'ACCEPTED') {
            return (
                <Text color='green'>Accepted</Text>
            )
        }
        if (subscription.status == 'REJECTED') {
            return (
                <Text color='red'>Rejected</Text>
            )
        }
        return (
            <Text color='gray'></Text>
        )
    }

    return (
        <Tr>
            <Td padding='10px' height='60px'>
                <Text 
                    fontSize='1rem' 
                    fontWeight='500' 
                    overflow='hidden'
                    maxWidth='1rem'
                    textOverflow='ellipsis'
                    >{subscription.creatorId}
                </Text>
            </Td>
            <Td padding='10px'>
                <Text 
                    fontSize='1rem' 
                    fontWeight='500' 
                    overflow='hidden'
                    textOverflow='ellipsis'
                    >{subscription.creatorName}
                </Text>
            </Td>
            <Td padding='10px'>
                <Text 
                    fontSize='1rem' 
                    fontWeight='500' 
                    overflow='hidden'
                    textOverflow='ellipsis'
                    >{subscription.subscriberId}
                </Text>
            </Td>
            <Td padding='10px' width='-webkit-fit-content'>
                <RenderButton />
            </Td>
        </Tr>
    );
};

export const SubscriptionTable = ({ subscriptions }: { subscriptions: Subscription[] }) => {
    const [smallScreen] = useMediaQuery("(max-width: 800px)");
    const tableWidth = ((smallScreen) ? "100%" : "1000px");

    return (
        <TableContainer display='block' width={tableWidth}>
            <Table textColor='#D9D9D9'>
                <Thead>
                    <Tr>
                        <Th color='palette.lightPink' fontSize='1rem' padding='10px'>Creator ID</Th>
                        <Th color='palette.lightPink' fontSize='1rem' padding='10px'>Creator Name</Th>
                        <Th color='palette.lightPink' fontSize='1rem' padding='10px'>Subscriber ID</Th>
                        <Th color='palette.lightPink' fontSize='1rem' padding='10px' width='60px'>Status</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {subscriptions.map((subscription) => (
                        <SubscriptionEntry subscription={subscription} />
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    );
};