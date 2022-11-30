import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Link,
  Text,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { getSubscriptions } from "../lib/api";
import { SubscriptionTable } from "../components/subscriptionTable";
import { Subscription } from "../types/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";

const Admin = () => {
  const pageTitle = document.getElementById("page-title");
  pageTitle!.innerHTML = "Subscription Requests - Binotify";

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  const { token } = useAuth();
  var offset = 0;
  var page = 1;
  // if smallScreen, page will only display 4 songs
  // else page will display 6 songs
  if (smallScreen) {
    offset = 6;
  } else {
    offset = 9;
  }

  // TODO: add pagination
  const reqSubset = subscriptions.slice(offset * (page - 1), offset * page);

  useEffect(() => {
    getSubscriptions(token).then((res) => {
      if (res.data) {
        setSubscriptions(res.data);
      }
    });
  }, []);

  return (
    <>
      <VStack padding="20px 40px 20px" gap="20px" width="100%">
        <Flex direction="row" justify="space-between" width="100%">
          <Heading color="palette.lightPink" fontSize="3xl">
            Your Songs
          </Heading>
          <Flex direction="row" align="center" gap="10px">
            <Input
              placeholder="Search"
              focusBorderColor="palette.white"
              height="2rem"
            />
            <Flex gap="5px" align="center" minW="-webkit-fit-content">
              <Icon
                as={MdLogout}
                href="/user/1"
                color="gray"
                fontWeight="semibold"
                fontSize="1.2rem"
                _hover={{
                  color: "palette.white",
                  cursor: "pointer",
                }}
              />
              <Link
                href="/user/1"
                color="gray"
                fontWeight="semibold"
                fontSize="1rem"
                _hover={{
                  color: "palette.white",
                  cursor: "pointer",
                }}
              >
                Log Out
              </Link>
            </Flex>
          </Flex>
        </Flex>
        <Divider />
        <SubscriptionTable subscriptions={reqSubset} />
        <HStack bottom="0" justifyContent="flex-end" width="90%" gap="10px">
          <IconButton
            aria-label="Previous Page"
            fontSize="1.5rem"
            size="sm"
            icon={<ChevronLeftIcon />}
          />
          <Text color="palette.lightPink" fontSize="1.2rem">
            0
          </Text>
          <IconButton
            aria-label="Next Page"
            fontSize="1.5rem"
            size="sm"
            icon={<ChevronRightIcon />}
          />
        </HStack>
      </VStack>
    </>
  );
};

export default Admin;
