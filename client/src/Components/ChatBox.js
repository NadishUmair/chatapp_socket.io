import { Box } from "@chakra-ui/react";
import { useChatState } from "../Context/ChatProvider";
import SingleChat from "./singleChat";


const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { SelectedChat } = useChatState();

  return (
    <Box
      display={{ base: SelectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="white"
      w={{ base: "100%", md: "68%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;