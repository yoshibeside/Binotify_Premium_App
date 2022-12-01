import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/auth";
import { acceptSubscription, rejectSubscription } from "../lib/api";

import { Subscription } from "../types/models";

const SubscriptionEntry = ({
  subscription,
}: {
  subscription: Subscription;
}) => {
  const { token } = useAuth();
  const toast = useToast();
  function RenderButton() {
    const handleAccept = () => {
      acceptSubscription(
        subscription.creator_id,
        subscription.subscriber_id,
        token
      ).then((res) => {
        if (res.isError) {
          toast({
            id: "accept-subscription-error",
            title: "Accept subscription failed",
            description: res.message,
            status: "error",
          });
        } else {
          window.location.reload();
        }
      });
    };

    const handleReject = () => {
      rejectSubscription(
        subscription.creator_id,
        subscription.subscriber_id,
        token
      ).then((res) => {
        if (res.isError) {
          toast({
            id: "reject-subscription-error",
            title: "Reject subscription failed",
            description: res.message,
            status: "error",
          });
        } else {
          window.location.reload();
        }
      });
    };

    if (subscription.status == "PENDING") {
      return (
        <ButtonGroup
          display="flex"
          justifyContent="start"
          size="sm"
          gap="5px"
          alignItems="center"
        >
          <Button leftIcon={<CheckIcon />} onClick={handleAccept}>
            Approve
          </Button>
          <Button leftIcon={<CloseIcon />} onClick={handleReject}>
            Reject
          </Button>
        </ButtonGroup>
      );
    }
    if (subscription.status == "ACCEPTED") {
      return <Text color="green">Accepted</Text>;
    }
    if (subscription.status == "REJECTED") {
      return <Text color="red">Rejected</Text>;
    }
    return <Text color="gray"></Text>;
  }

  return (
    <Tr key={`${subscription.creator_id}-${subscription.subscriber_id}`}>
      <Td padding="10px" height="60px">
        <Text
          fontSize="1rem"
          fontWeight="500"
          overflow="hidden"
          maxWidth="1rem"
          textOverflow="ellipsis"
        >
          {subscription.creator_id}
        </Text>
      </Td>
      <Td padding="10px">
        <Text
          fontSize="1rem"
          fontWeight="500"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {subscription.name}
        </Text>
      </Td>
      <Td padding="10px">
        <Text
          fontSize="1rem"
          fontWeight="500"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          {subscription.subscriber_id}
        </Text>
      </Td>
      <Td padding="10px" width="-webkit-fit-content">
        <RenderButton />
      </Td>
    </Tr>
  );
};

export const SubscriptionTable = ({
  subscriptions,
}: {
  subscriptions: Subscription[];
}) => {
  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  const tableWidth = smallScreen ? "100%" : "1000px";

  return (
    <TableContainer display="block" width={tableWidth}>
      <Table textColor="#D9D9D9">
        <Thead>
          <Tr>
            <Th color="palette.lightPink" fontSize="1rem" padding="10px">
              Creator ID
            </Th>
            <Th color="palette.lightPink" fontSize="1rem" padding="10px">
              Creator Name
            </Th>
            <Th color="palette.lightPink" fontSize="1rem" padding="10px">
              Subscriber ID
            </Th>
            <Th
              color="palette.lightPink"
              fontSize="1rem"
              padding="10px"
              width="60px"
            >
              Status
            </Th>
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
