import {
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Spacer,
  Text,
  useDisclosure,
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
//import { getSelfData } from "../lib/api";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import { MdLogout } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import AddSong from "../components/addSong";
import SongTable from "../components/songTable";
import { getSongs } from "../lib/api";
import { ManySongBodyRes, Res } from "../types/api";
import { Song } from "src/types/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

const Penyanyi = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    search: "",
  });
  const [songs, setSongs] = useState<Song[]>([]);
  const { token, logout } = useAuth();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  var offset = 0;
  // if smallScreen, page will only display 4 songs
  // else page will display 6 songs
  if (smallScreen) {
    offset = 4;
  } else {
    offset = 6;
  }
  const page = parseInt(searchParams.get("page") || "1");
  const filteredSongs = songs.filter((song) =>
    song.judul.toLowerCase().includes(searchParams.get("search") || "")
  );
  const songsSubset = filteredSongs.slice((page - 1) * offset, page * offset);

  const previousPage = () => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
    }
  };

  const nextPage = () => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page < Math.ceil(filteredSongs.length / offset)) {
      setSearchParams({ page: (page + 1).toString() });
    }
  };

  useEffect(() => {
    if (token) {
      getSongs(token).then((res) => {
        if (res.isError) {
          toast({
            id: "get-songs-error",
            title: "Get Songs Error",
            description: res.message,
            status: "error",
          });
        } else if (res.data) {
          setSongs(res.data.songs);
        }
      });
    }
  }, [token]);

  return (
    <>
      <VStack padding="20px 40px 20px" gap="20px" width="100%" h="100vh ">
        <Flex direction="row" justify="space-between" width="100%">
          <Heading color="palette.lightPink" fontSize="3xl">
            Your Songs
          </Heading>
          <Flex direction="row" align="center" gap="10px">
            <PlusSquareIcon
              color="palette.lightPink"
              boxSize="2rem"
              _hover={{ color: "palette.white", cursor: "pointer" }}
              onClick={onOpen}
            />
            <Input
              placeholder="Search"
              focusBorderColor="palette.white"
              height="2rem"
              onChange={(e) => {
                setSearchParams({ search: e.target.value });
              }}
            />
            <Flex gap="5px" align="center" minW="-webkit-fit-content">
              <Icon
                as={MdLogout}
                onClick={() => logout()}
                color="gray"
                fontWeight="semibold"
                fontSize="1.2rem"
                _hover={{ color: "palette.white", cursor: "pointer" }}
              />
              <Link
                onClick={() => logout()}
                color="gray"
                fontWeight="semibold"
                fontSize="1rem"
                _hover={{ color: "palette.white", cursor: "pointer" }}
              >
                Log Out
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <SongTable songs={songsSubset} />
        <HStack
          position="absolute"
          bottom="40px"
          justifyContent="flex-end"
          width="81%"
          gap="10px"
        >
          <IconButton
            aria-label="Previous Page"
            fontSize="1.5rem"
            size="sm"
            icon={<ChevronLeftIcon />}
            onClick={previousPage}
          />
          <Text color="palette.lightPink" fontSize="1.2rem">
            {page}
          </Text>
          <IconButton
            aria-label="Next Page"
            fontSize="1.5rem"
            size="sm"
            icon={<ChevronRightIcon />}
            onClick={nextPage}
          />
        </HStack>
        <AddSong isOpen={isOpen} onClose={onClose} />
      </VStack>
    </>
  );
};

export default Penyanyi;
