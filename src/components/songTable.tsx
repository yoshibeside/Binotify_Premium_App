import {
    ButtonGroup, Editable, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useMediaQuery,
    VStack
} from '@chakra-ui/react';


import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { Icon } from '@chakra-ui/react';
import { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { deleteSong } from '../lib/api';
import { Song } from '../types/models';

type SongColumn = 
    | 'id'
    | 'title'
    | 'path'
    | 'duration'
    | 'album';

const SongData = {
    id: {
        label: "ID",
        render: (song: Song) => song.songId,
    },
    title: {
        label: "Title",
        render: (song: Song) => song.judul,
    },
    path: {
        label: "Path",
        render: (song: Song) => song.audioPath,
    },
}

const SongEntry = ({song}: {song: Song}) => {
    const [smallScreen] = useMediaQuery("(max-width: 800px)");
    const maxWidthTitle = ((smallScreen) ? "200px" : "350px");
    const maxWidthPath = ((smallScreen) ? "200px" : "350px");
    const titleId = "song-title-" + song.songId;
    const pathId = "song-path-" + song.songId;
    const audioId = "song-audio-" + song.songId;
    const buttonGroupId = "song-button-group-" + song.songId;
    const editableId = "song-editable-" + song.songId;
    const [isEditing, setIsEditing] = useState(false);
    const [initialTitle, setInitialTitle] = useState(song.judul);
    const token = localStorage.getItem("token");

    const handleEditClick = () => {
        const title = document.getElementById(titleId);
        const path = document.getElementById(pathId);
        const audio = document.getElementById(audioId);
        const editable = document.getElementById(editableId);

        if (title !== null && path !== null && audio !== null && editable !== null) {
            title.contentEditable = "true";
            title.focus();
            title.style.textOverflow = "clip";

            audio.style.display = 'block';

            setIsEditing(true);
        }
    };

    const handleDeleteClick = () => {
        if (token) {
            deleteSong(song.songId, token).then((res) => {
                if (res && res.data) {
                    window.location.reload();
                }
            });
        }
    }

    const handleCheckClick = () => {
        const title = document.getElementById(titleId);
        const audio = document.getElementById(audioId);
        const editable = document.getElementById(editableId);

        const newTitle = title?.textContent;
        if (audio) {
            const newAudio = audio as HTMLInputElement;
            const newAudioFile = newAudio.files?.item(0);

            console.log("new title: ", newTitle);
            console.log("new audio: ", newAudioFile);


        }

        // post request to update song

        setIsEditing(false);
    };


    const handleCancelClick = () => {
        const title = document.getElementById(titleId);
        const audio = document.getElementById(audioId);

        if (title !== null && audio !== null) {
            console.log("initial title: ", initialTitle);
            title.textContent = initialTitle;
            title.contentEditable = "false";
            title.style.textOverflow = "ellipsis";

            audio.style.display = 'none';
        }
        setIsEditing(false);
    };

    function EditableControls() {
        
        return isEditing ? ( 
            <ButtonGroup 
                display='flex' 
                justifyContent='center' 
                size='sm' 
                gap='5px' 
                alignItems='center'>
                <CheckIcon 
                    fontSize='1.2rem'
                    color='palette.lightPink'
                    _hover={{color:'palette.white', cursor:'pointer'}}
                    onClick={handleCheckClick} />
                <CloseIcon
                    fontSize='1rem'
                    color='palette.lightPink'
                    _hover={{color:'palette.white', cursor:'pointer'}}
                    onClick={handleCancelClick} />
            </ButtonGroup>
        ) : (
            <ButtonGroup display='flex' justifyContent='center' size='sm' gap='5px' alignItems='center'>
                <EditIcon 
                    fontSize='1.2rem'
                    color='palette.lightPink'
                    _hover={{color:'palette.white', cursor:'pointer'}}
                    onClick={handleEditClick}/>
                <Icon
                    as={MdDelete}
                    fontSize='1.3rem'
                    color='palette.lightPink'
                    _hover={{color:'palette.white', cursor:'pointer'}}
                    onClick={handleDeleteClick}/>
            </ButtonGroup>
            
        )
    }

    return (
        <Tr lineHeight='50px'>
            <Td padding='5px 24px 5px'>{song.songId}</Td>
            <Td padding='5px 24px 5px'>
                <Text 
                    id={titleId}
                    fontSize='1rem' 
                    fontWeight='500' 
                    maxWidth={maxWidthTitle}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    >{song.judul}</Text>
            </Td>
            <Td height='80px' padding='5px 24px 5px'>
                <VStack align='start'>
                <Text
                    id={pathId}
                    fontSize='1rem' 
                    fontWeight='500' 
                    maxWidth={maxWidthPath}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    >{song.audioPath}</Text>
                <Input 
                    id={audioId} 
                    display='none' 
                    type='file' 
                    accept='audio/mp3' 
                    color='palette.sheerPink' 
                    variant='unstyled'
                    />
                </VStack>
            </Td>
            <Td padding='5px 24px 5px'>
                <Editable id={editableId} alignItems='center'>
                    <EditableControls />
                </Editable>
                
            </Td>
        </Tr>
    );
}

export const SongTable = ({songs}: {songs: Song[] | undefined}) => {
    // create table rows from song entries
    console.log(songs);

    const [smallScreen] = useMediaQuery("(max-width: 800px)");
    const maxWidthTitle = ((smallScreen) ? "200px" : "350px");
    const maxWidthPath = ((smallScreen) ? "200px" : "350px");
    const tableWidth = ((smallScreen) ? "100%" : "1000px");

    if (!songs) {
        return <Text color='palette.lightPink' fontSize='2xl' >There are no songs.</Text>
    }
    
    if (songs.length === 0) {
        return <Text color='palette.lightPink' fontSize='2xl' >There are no songs.</Text>
    }

    const songEntries = songs.map((song) => {
        return <SongEntry song={song} />
    });

    return (
        <TableContainer display='block' width={tableWidth} alignItems="center" >
            <Table textColor='#D9D9D9'>
                <Thead>
                    <Tr>
                        <Th color='palette.lightPink' fontSize='1rem' width='1rem'>#</Th>
                        <Th color='palette.lightPink' fontSize='1rem' width={maxWidthTitle}>Title</Th>
                        <Th color='palette.lightPink' fontSize='1rem' width={maxWidthPath}>Audio Path</Th>
                        <Th color='palette.lightPink' fontSize='1rem' width='1rem' >Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {songEntries}
                </Tbody>
            </Table>
        </TableContainer>
    );
}
