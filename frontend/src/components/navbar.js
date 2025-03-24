import React from "react";
import { Box, Flex, IconButton, useDisclosure, Heading, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Navbar = () => {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <Box bg="blue.500" px={4} position="fixed" top="0" left="0" width="100%" zIndex="1000">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Heading size="md" color="white">
                    Auction
                </Heading>
                <Flex display={{ base: "none", md: "flex" }} gap={4}>
                    <Button variant="link" color="white">
                        Home
                    </Button>
                    <Button variant="link" color="white">
                        About
                    </Button>
                    <Button variant="link" color="white">
                        Contact
                    </Button>
                </Flex>
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: "none" }}
                    onClick={onToggle}
                />
            </Flex>
            {isOpen && (
                <Box pb={4} display={{ md: "none" }}>
                    <Flex direction="column" gap={2}>
                        <Button variant="link" color="white">
                            Home
                        </Button>
                        <Button variant="link" color="white">
                            About
                        </Button>
                        <Button variant="link" color="white">
                            Contact
                        </Button>
                    </Flex>
                </Box>
            )}
        </Box>
    );
};

export default Navbar;