import {
    Divider, Flex,
    Heading, HStack, Icon, IconButton, Input, Link, Text, useDisclosure, useMediaQuery, useToast, VStack
} from "@chakra-ui/react";
//import { getSelfData } from "../lib/api";
import { ChevronLeftIcon, ChevronRightIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from "react-router-dom";
import AddSong from '../components/addSong';
import { SongTable } from "../components/songTable";
import { getSongs } from "../lib/api";
import { ManySongBodyRes, Res } from '../types/api';


const Penyanyi = () => {
    const toast = useToast();
    const token = localStorage.getItem("token");
    console.log(token);

    const navigate = useNavigate();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const fetchSongs = async (token: string): Promise<Res<ManySongBodyRes> | null> => {
        const res = await getSongs(token);
        if (res.isError || res.data === null) {
            return null;
        }
        else {
            return res;
        }
    }
    if (token) {
        fetchSongs(token).then((res) => {
            if (res && res.data) {
                localStorage.setItem("songs", JSON.stringify(res.data.songs));
            }
        });
    }
    const songs = JSON.parse(localStorage.getItem("songs") || "[]");
    console.log(songs);

    const [smallScreen] = useMediaQuery("(max-width: 800px)");
    var offset = 0;
    var page = 1;
    // if smallScreen, page will only display 4 songs
    // else page will display 6 songs
    if (smallScreen) {
        offset = 4;
    }
    else {
        offset = 6;
    }

    const previousPage = () => {
        if (page > 1) {
            page -= 1;
        }
    }

    const nextPage = () => {
        if (page < Math.ceil(songs.length / offset)) {
            page += 1;
        }
    }

    const songsSubset = songs.slice((page - 1) * offset, page * offset);

    return (
        <>
        <VStack padding='20px 40px 20px' gap='20px' width='100%'>
            <Flex direction='row' justify='space-between' width='100%'>
                <Heading color='palette.lightPink'
                fontSize='3xl'
                >Your Songs</Heading>
                <Flex direction='row' align='center' gap='10px'>
                    <PlusSquareIcon 
                    color='palette.lightPink' 
                    boxSize='2rem'
                    _hover={{color:'palette.white', cursor:'pointer'}}
                    onClick={onOpen}
                    />
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
            <SongTable songs={songsSubset} />
            <HStack bottom='0' justifyContent='flex-end' width='90%' gap='10px'>
                <IconButton 
                    aria-label="Previous Page" 
                    fontSize='1.5rem' 
                    size='sm' 
                    icon={<ChevronLeftIcon />}
                    onClick={previousPage} />
                <Text color='palette.lightPink' fontSize='1.2rem'>{page}</Text>
                <IconButton 
                    aria-label="Next Page" 
                    fontSize='1.5rem' 
                    size='sm' 
                    icon={<ChevronRightIcon />}
                    onClick={nextPage} />
            </HStack>
            <AddSong isOpen={isOpen} onClose={onClose} />
        </VStack></>
    );
}

export default Penyanyi;