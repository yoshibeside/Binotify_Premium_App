import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Icon,
  IconButton,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdDelete, MdPause, MdPlayArrow } from "react-icons/md";
import { Song } from "src/types/models";
import { useAuth } from "../context/auth";
import { deleteSong, updateSong } from "../lib/api";

type SongEntry = Song & {
  isEditable: boolean;
  audio: File | null;
};

const SongTable = ({ songs }: { songs: Song[] }) => {
  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  const maxWidthTitle = smallScreen ? "200px" : "350px";
  const maxWidthPath = smallScreen ? "200px" : "350px";
  const { token } = useAuth();

  const audioRef = useRef<HTMLAudioElement>(null);
  const [songsEntry, setSongsEntry] = useState<SongEntry[]>([]);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setSongsEntry(
      songs.map((song) => {
        return {
          ...song,
          isEditable: false,
          audio: null,
        };
      })
    );
    audioRef.current!.pause();
    setPlayingIndex(-1);
    setIsPlaying(false);
  }, [songs]);

  const handleEditable = (index: number) => {
    const newSongsEntry = [...songsEntry];
    newSongsEntry[index].isEditable = true;
    setSongsEntry(newSongsEntry);

    if (playingIndex == index && audioRef.current !== null) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleReset = (index: number) => {
    const newSongsEntry = [...songsEntry];
    newSongsEntry[index] = { ...songs[index], isEditable: false, audio: null };
    setSongsEntry(newSongsEntry);
  };

  const handleDelete = (songId: number) => {
    if (confirm("Are you sure you want to delete this song?")) {
      deleteSong(songId, token).then((res) => {
        if (res.isError) {
          toast({
            id: "delete-song-error",
            title: "Delete song failed",
            description: res.message,
            status: "error",
          });
        } else {
          window.location.reload();
        }
      });
    }
  };

  const handleUpdate = (index: number) => {
    const oldSong = songs[index];
    const newSong = songsEntry[index];
    const diff: any = {};
    if (oldSong.judul !== newSong.judul) {
      diff.judul = newSong.judul;
    }
    if (newSong.audio !== null) {
      diff.audio = newSong.audio;
    }

    updateSong(newSong.songId, diff, token).then((res) => {
      if (res.isError) {
        toast({
          id: "update-song-error",
          title: "Update song failed",
          description: res.message,
          status: "error",
        });
      } else {
        window.location.reload();
      }
    });
  };

  const handlePlay = (index: number) => {
    const audio = audioRef.current as HTMLAudioElement;
    console.log({ paused: audio.paused, index, playingIndex });
    if (playingIndex === index) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } else {
      audio.src =
        import.meta.env.VITE_REST_API_URL + songsEntry[index].audioPath;
      audio.play();
      setPlayingIndex(index);
      setIsPlaying(true);
    }

    audio.onended = () => {
      setPlayingIndex(-1);
      setIsPlaying(false);
    };
  };

  return (
    <>
      <audio ref={audioRef} />
      <Table textColor="#D9D9D9" maxWidth="1000px">
        <Thead>
          <Tr>
            <Th color="palette.lightPink" fontSize="1rem" width="1rem">
              #
            </Th>
            <Th
              maxW={maxWidthTitle}
              color="palette.lightPink"
              fontSize="1rem"
              width={maxWidthTitle}
            >
              Title
            </Th>
            <Th
              maxW={maxWidthPath}
              color="palette.lightPink"
              fontSize="1rem"
              width={maxWidthPath}
            >
              Audio
            </Th>
            <Th color="palette.lightPink" fontSize="1rem" width="1rem">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {songsEntry.map((song, index) => (
            <Tr key={index}>
              <Td>{song.songId}</Td>
              <Td>
                <Editable
                  onChange={(newJudul) => {
                    const newSongsEntry = [...songsEntry];
                    newSongsEntry[index].judul = newJudul;
                    setSongsEntry(newSongsEntry);
                  }}
                  value={song.judul}
                  isDisabled={!song.isEditable}
                >
                  <Text
                    noOfLines={1}
                    maxWidth={maxWidthTitle}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    as={EditablePreview}
                  />
                  <EditableInput />
                </Editable>
              </Td>
              <Td>
                {song.isEditable ? (
                  <Input
                    type="file"
                    accept="audio/*"
                    color="palette.sheerPink"
                    variant="unstyled"
                    onChange={(e) => {
                      const newSongsEntry = [...songsEntry];
                      newSongsEntry[index].audio = e.target.files?.[0] || null;
                      setSongsEntry(newSongsEntry);
                    }}
                  />
                ) : playingIndex === index &&
                  !!audioRef.current &&
                  isPlaying ? (
                  <IconButton
                    aria-label="pause"
                    variant="unstyled"
                    color="palette.lightPink"
                    onClick={() => handlePlay(index)}
                    icon={<Icon as={MdPause} fontSize="1.5rem" />}
                  />
                ) : (
                  <IconButton
                    aria-label="play"
                    variant="unstyled"
                    color="palette.lightPink"
                    icon={<Icon as={MdPlayArrow} fontSize="1.5rem" />}
                    onClick={() => handlePlay(index)}
                  />
                )}
              </Td>
              <Td>
                <HStack py={2}>
                  {song.isEditable ? (
                    <>
                      <IconButton
                        colorScheme="transparent"
                        variant="ghost"
                        aria-label="submit"
                        icon={
                          <CheckIcon
                            color="palette.lightPink"
                            fontSize="1.2rem"
                          />
                        }
                        onClick={() => handleUpdate(index)}
                      />
                      <IconButton
                        colorScheme="transparent"
                        variant="ghost"
                        aria-label="cancel"
                        icon={
                          <CloseIcon
                            color="palette.lightPink"
                            fontSize="1.2rem"
                          />
                        }
                        onClick={() => handleReset(index)}
                      />
                    </>
                  ) : (
                    <>
                      <IconButton
                        aria-label="edit"
                        icon={
                          <EditIcon
                            color="palette.lightPink"
                            fontSize="1.2rem"
                          />
                        }
                        colorScheme="transparent"
                        variant="ghost"
                        onClick={() => handleEditable(index)}
                      />
                      <IconButton
                        aria-label="delete"
                        icon={
                          <Icon
                            as={MdDelete}
                            color="palette.lightPink"
                            fontSize="1.4rem"
                          />
                        }
                        colorScheme="transparent"
                        variant="ghost"
                        onClick={() => handleDelete(song.songId)}
                      />
                    </>
                  )}
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default SongTable;
