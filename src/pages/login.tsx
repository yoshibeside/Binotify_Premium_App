import {
  Flex,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  useMediaQuery,
  Text,
  Link,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAuth } from "../context/auth";

const Login = () => {
  const pageTitle = document.getElementById("page-title");
  pageTitle!.innerHTML = "Login - Binotify";
  const [smallScreen] = useMediaQuery("(max-width: 800px)");
  const logoWidth = smallScreen ? "150px" : "200px";

  const { login } = useAuth();

  const [usernameInvalid, setUsernameInvalid] = useState(false);
  const [passwordInvalid, setPasswordInvalid] = useState(false);

  const handleLogin = (e: any) => {
    e.preventDefault();
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    if (username && password) {
      if (username.value === "") {
        setUsernameInvalid(true);
      }
      if (password.value === "") {
        setPasswordInvalid(true);
      }
    }

    if (usernameInvalid || passwordInvalid) {
      return;
    }
    login(username.value, password.value);
  };

  const handleInputChange = () => {
    const username = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    // if username is focused
    if (document.activeElement === username) {
      setUsernameInvalid(false);
    }
    // if password is focused
    if (document.activeElement === password) {
      setPasswordInvalid(false);
    }
  };

  return (
    <Flex
      direction="column"
      height="100vh"
      width="100%"
      justify="center"
      align="center"
      gap="1rem"
    >
      <Image
        src="/assets/logo_name_vertical_binotify.png"
        alt="logo"
        width={logoWidth}
        padding="20px 0 20px"
      />
      <FormControl
        isRequired
        width="500px"
        isInvalid={usernameInvalid}
        onClick={handleInputChange}
      >
        <FormLabel color="palette.lightPink">Username</FormLabel>
        <Input
          id="username"
          textColor="palette.sheerPink"
          focusBorderColor="palette.white"
        />
        {usernameInvalid ? (
          <FormErrorMessage>Username is required</FormErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>
      <FormControl
        isRequired
        width="500px"
        isInvalid={passwordInvalid}
        onClick={handleInputChange}
      >
        <FormLabel color="palette.lightPink">Password</FormLabel>
        <Input
          id="password"
          type="password"
          textColor="palette.sheerPink"
          focusBorderColor="palette.white"
        />
        {passwordInvalid ? (
          <FormErrorMessage>Password is required</FormErrorMessage>
        ) : (
          <></>
        )}
      </FormControl>
      <Button borderRadius="50px" width="6rem" onClick={handleLogin}>
        Login
      </Button>
      <Text color="palette.lightPink">
        Don't have an account?&nbsp;
        <Link
          href="/register"
          color="palette.darkPink"
          _hover={{ textDecoration: "underline" }}
        >
          {" "}
          Register{" "}
        </Link>
      </Text>
    </Flex>
  );
};

export default Login;
