import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { forwardRef } from "react";
import { useAuth } from "../context/auth";
import { createSong } from "../lib/api";
import { Res } from "../types/api";
import { Song } from "../types/models";

const AddSong = ({ isOpen, onClose }: { isOpen: boolean; onClose: any }) => {
  const { token } = useAuth();
  const toast = useToast();

  const handleSubmit = () => {
    // get input value
    const title = document.getElementById("title") as HTMLInputElement;
    const audiofile = document.getElementById("audiofile") as HTMLInputElement;
    const audio = audiofile.files?.[0];

    if (title.value && audio) {
      createSong(title.value, audio, token).then((res: Res<Song>) => {
        if (res.isError) {
          toast({
            id: "add-song-error",
            title: "Create song failed",
            description: res.message,
            status: "error",
          });
        } else {
          onClose();
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
      <ModalOverlay bg="rgba(0,0,0,0.6)">
        <ModalContent
          bg="black"
          border="1px solid"
          borderColor="palette.lightPink"
          borderRadius="15px"
          padding="20px 40px 20px"
        >
          <ModalHeader
            fontSize="1.8rem"
            fontWeight="extrabold"
            color="palette.lightPink"
          >
            <Heading color="palette.lightPink">Add Song</Heading>
          </ModalHeader>

          <ModalCloseButton
            boxSize="3rem"
            fontSize="1rem"
            color="gray"
            _hover={{ color: "palette.white" }}
          />

          <ModalBody color="palette.sheerPink">
            <VStack spacing="1.5rem">
              <FormControl id="judul">
                <FormLabel color="palette.lightPink" fontSize="1.2rem">
                  Judul
                </FormLabel>
                <Input
                  id="title"
                  placeholder="Judul"
                  focusBorderColor="palette.white"
                  color="palette.sheerPink"
                />
              </FormControl>
              <FormControl id="judul">
                <FormLabel color="palette.lightPink" fontSize="1.2rem">
                  Upload Audio File
                </FormLabel>
                <Input
                  id="audiofile"
                  placeholder="Judul"
                  type="file"
                  accept="audio/*"
                  color="palette.sheerPink"
                  variant="unstyled"
                ></Input>
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter justifyItems="end">
            <Button onClick={handleSubmit}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default AddSong;
