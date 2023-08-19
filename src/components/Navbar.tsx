import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon
} from "@chakra-ui/icons"

import {
    Flex,
    Box,
    useDisclosure,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Image, Avatar
} from "@chakra-ui/react"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux";
import {UserStore} from "../types/User.ts";

export default function Navbar() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const userStore = useSelector((state: { user: UserStore }) => state.user)

    return (
        <Flex
            as="nav"
            align="center"
            justify="space-between"
            wrap="wrap"
            padding="1.5rem"
            bg="white"
            color="gray.600"
            className={"shadow-sm"}
        >
            <Flex align="center" mr={5}>
                <Image
                    src="logo.png"
                    h="8"
                />
            </Flex>

            <Box display={{ base: "block", md: "none" }} onClick={onOpen}>
                <HamburgerIcon />
            </Box>

            <Box
                display={{ base: isOpen ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}
            >
                <Flex
                    align="center"
                    justify={["center", "space-between", "flex-end", "flex-end"]}
                    direction={["column", "row", "row", "row"]}
                    pt={[4, 4, 0, 0]}
                >
                    <Button variant="ghost" mx={2}>
                        <Link to="/">Dashboard</Link>
                    </Button>
                    <Button variant="ghost" mx={2}>
                        <Link to="/projects">Projects</Link>
                    </Button>
                </Flex>
            </Box>

            <Flex
                align="center"
                flex={{ base: 1, md: "auto" }}
                justify={["center", "center", "flex-end", "flex-end"]}
                flexDir="row"
            >
                <Menu>
                    <MenuButton
                        as={Button}
                        variant="link"
                        rightIcon={<ChevronDownIcon />}
                    >
                        <Avatar
                            src={userStore.user.avatar_url}
                            size="sm"
                            name={userStore.user.username}
                        />
                    </MenuButton>
                    <MenuList>
                        <Link to="/profile">
                            <MenuItem>Profile</MenuItem>
                        </Link>
                        {/*<MenuItem>Settings</MenuItem>*/}
                        <MenuItem>Logout</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            {isOpen ? (
                <Box pb={4} display={{ md: "none" }}>
                    <CloseIcon color="gray.600" onClick={onClose} />
                </Box>
            ) : null}

        </Flex>
    )
}