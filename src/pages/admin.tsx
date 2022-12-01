import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Checkbox,
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
  useMediaQuery,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { getSubscriptions } from "../lib/api";
import { SubscriptionTable } from "../components/subscriptionTable";
import { Subscription } from "../types/models";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { useSearchParams } from "react-router-dom";

const Admin = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    search: "",
    isPending: "false",
  });
  const pageTitle = document.getElementById("page-title");
  pageTitle!.innerHTML = "Subscription Requests - Binotify";

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  const { token, logout } = useAuth();
  const toast = useToast();
  var offset = 0;
  // if smallScreen, page will only display 4 subscriptions
  // else page will display 6 subscriptions
  if (smallScreen) {
    offset = 6;
  } else {
    offset = 9;
  }

  const page = parseInt(searchParams.get("page") || "1");
  const filteredSubscriptions = subscriptions.filter(
    (subscription) =>
      subscription.name
        .toLowerCase()
        .includes(searchParams.get("search") || "") &&
      subscription.status.includes(
        searchParams.get("isPending") == "true" ? "PENDING" : ""
      )
  );
  const reqSubset = filteredSubscriptions.slice(
    offset * (page - 1),
    offset * page
  );

  const previousPage = () => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page > 1) {
      setSearchParams({ page: (page - 1).toString() });
    }
  };

  const nextPage = () => {
    const page = parseInt(searchParams.get("page") || "1");
    if (page < Math.ceil(filteredSubscriptions.length / offset)) {
      setSearchParams({ page: (page + 1).toString() });
    }
  };

  useEffect(() => {
    if (token) {
      getSubscriptions(token).then((res) => {
        if (res.isError) {
          toast({
            id: "get-subscription-error",
            title: "Get Subscription Error",
            description: res.message,
            status: "error",
          });
        } else if (res.data) {
          setSubscriptions(res.data);
        }
      });
    }
  }, [token]);

  return (
    <>
      <VStack padding="20px 40px 40px" gap="20px" width="100%" h="100vh">
        <Flex direction="row" justify="space-between" width="100%">
          <Heading color="palette.lightPink" fontSize="3xl">
            Subscription Requests
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
                onClick={() => logout()}
                color="gray"
                fontWeight="semibold"
                fontSize="1.2rem"
                _hover={{
                  color: "palette.white",
                  cursor: "pointer",
                }}
              />
              <Link
                color="gray"
                onClick={() => logout()}
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
        <Spacer />
        <HStack bottom="0" justifyContent="flex-end" width="90%" gap="10px">
          <Checkbox
            onChange={(e) => {
              setSearchParams({ isPending: e.target.checked.toString() });
            }}
            color="palette.lightPink"
          >
            Only Pending
          </Checkbox>
          <Spacer />
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
      </VStack>
    </>
  );
};

export default Admin;
