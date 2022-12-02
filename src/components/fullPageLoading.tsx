import { Center, Spinner } from "@chakra-ui/react";

const FullPageLoading = () => {
  return (
    <Center w="100vw" h="100vh">
      <Spinner size="xl" color="palette.lightPink" thickness="4px" />
    </Center>
  );
};

export default FullPageLoading;
