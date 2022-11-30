import {
    Button, FormControl,
    FormLabel, Heading, Input, Modal, ModalBody,
    ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack
} from '@chakra-ui/react';
import { forwardRef } from 'react';
import { createSong } from '../lib/api';
import { Res } from '../types/api';
import { Song } from '../types/models';

const AddSong = forwardRef(({isOpen, onClose}: {isOpen:boolean, onClose:any}) => {
    const handleSubmit = () => {
        // get input value
        const title = document.getElementById("title") as HTMLInputElement;
        const audiofile = document.getElementById("audiofile") as HTMLInputElement;
        const token = localStorage.getItem("token");
        console.log(token);
        console.log(title.value);

        const submitHandler = async (
            judul: string,
            audiopath: File,
            token: string
        ): Promise<Res<Song> | null> => {
            const res = await createSong(judul, audiopath, token);
            if (res.isError || res.data === null) {
                return null;
            }
            else {
                return res;
            }
        }
        if (title.value !== "" && audiofile.files && token) {
            const res = submitHandler(title.value, audiofile.files[0], token);
            console.log(res);

            // close modal
            onClose();
        }
    }

    return (
    <Modal
        isOpen={isOpen}
        onClose={onClose} 
        isCentered={true}>
        <ModalOverlay bg='rgba(0,0,0,0.6)'>
          <ModalContent bg="black" border="1px solid" borderColor="palette.lightPink" borderRadius="15px" padding='20px 40px 20px'>
            <ModalHeader fontSize='1.8rem' fontWeight='extrabold' color="palette.lightPink">
                <Heading color='palette.lightPink'>Add Song</Heading>
            </ModalHeader>

            <ModalCloseButton 
                boxSize='3rem'
                fontSize='1rem'
                color='gray'
                _hover={{color:'palette.white'}}/>

            <ModalBody color="palette.sheerPink">
            <   VStack spacing='1.5rem'>
                    <FormControl id='judul'>
                        <FormLabel color='palette.lightPink' fontSize='1.2rem'>Judul</FormLabel>
                        <Input 
                            id='title'
                            placeholder='Judul' 
                            focusBorderColor='palette.white' 
                            color='palette.sheerPink'/>
                    </FormControl>
                    <FormControl id='judul'>
                        <FormLabel color='palette.lightPink' fontSize='1.2rem'>Upload Audio File</FormLabel>
                        <Input id='audiofile' placeholder='Judul' type='file' accept='audio/mp3' color='palette.sheerPink' variant='unstyled'></Input>
                    </FormControl>
                </VStack>
            </ModalBody>

            <ModalFooter justifyItems='end'>
                <Button onClick={handleSubmit}>Submit</Button>              
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      </Modal>
)
})

export default AddSong;