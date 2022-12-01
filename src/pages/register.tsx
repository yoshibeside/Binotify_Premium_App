import {
  Flex,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api";

const Register = () => {
  const pageTitle = document.getElementById("page-title");
  pageTitle!.innerHTML = "Register - Binotify";

  const [nameTooShort, setNameTooShort] = useState(false);
  const [usernameTooShort, setUsernameTooShort] = useState(false);
  const [passwordTooShort, setPasswordTooShort] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const handleNameChange = (e: any) => {
    if (e.target.value.length < 8) {
      setNameTooShort(true);
    } else {
      setNameTooShort(false);
    }
  };

  const handleUsernameChange = (e: any) => {
    if (e.target.value.length < 8) {
      setUsernameTooShort(true);
    } else {
      setUsernameTooShort(false);
    }
  };

  const handleEmailChange = (e: any) => {
    const email = e.target.value;
    // check if email is invalid
    if (!email.includes("@") || !email.includes(".")) {
      setEmailInvalid(true);
    } else {
      setEmailInvalid(false);
    }
  };

  const handlePasswordChange = (e: any) => {
    const password = e.target.value;
    if (password.length < 8) {
      setPasswordTooShort(true);
    } else {
      setPasswordTooShort(false);
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;

    if (password && confirmPassword) {
      if (password.value !== confirmPassword.value) {
        setPasswordsDontMatch(true);
      } else {
        setPasswordsDontMatch(false);
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const name = document.getElementById("name") as HTMLInputElement;
    const username = document.getElementById("username") as HTMLInputElement;
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const confirmPassword = document.getElementById(
      "confirm-password"
    ) as HTMLInputElement;

    if (
      name &&
      username &&
      email &&
      password &&
      confirmPassword &&
      !nameTooShort &&
      !usernameTooShort &&
      !passwordTooShort &&
      !emailInvalid &&
      !passwordsDontMatch
    ) {
      register(username.value, name.value, email.value, password.value).then(
        (res) => {
          if (res.isError) {
            toast({
              id: "register-error",
              title: "Register Error",
              description: res.message,
              status: "error",
            });
          } else {
            navigate("/login");
          }
        }
      );
    }
  };

  return (
    <Flex
      direction="row"
      width="100%"
      height="100vh"
      padding="20px 40px 20px"
      align="center"
      justify="space-around"
      overflow="hidden"
    >
      <Image
        src="/src/assets/logo_name_vertical_binotify.png"
        alt="logo"
        width="50%"
        padding="40px"
        maxW="400px"
      />
      <Flex direction="column" width="50%" justify="center" gap="1rem">
        <Heading color="palette.lightPink" paddingBottom="5px">
          Register
        </Heading>
        <FormControl isRequired isInvalid={nameTooShort}>
          <FormLabel color="palette.lightPink" marginBottom="0">
            Name
          </FormLabel>
          <Input
            id="name"
            textColor="palette.sheerPink"
            focusBorderColor="palette.white"
            onChange={handleNameChange}
            height="2rem"
          />
          {nameTooShort ? (
            <FormErrorMessage marginTop="0">
              Name must be at least 8 characters long
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={usernameTooShort}>
          <FormLabel color="palette.lightPink" marginBottom="0">
            Username
          </FormLabel>
          <Input
            id="username"
            textColor="palette.sheerPink"
            focusBorderColor="palette.white"
            onChange={handleUsernameChange}
            height="2rem"
          />
          {usernameTooShort ? (
            <FormErrorMessage marginTop="0">
              Userame must be at least 8 characters long
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={emailInvalid}>
          <FormLabel color="palette.lightPink" marginBottom="0">
            Email
          </FormLabel>
          <Input
            id="email"
            type="email"
            textColor="palette.sheerPink"
            focusBorderColor="palette.white"
            onChange={handleEmailChange}
            height="2rem"
          />
          {emailInvalid ? (
            <FormErrorMessage marginTop="0">Email is invalid</FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={passwordTooShort}>
          <FormLabel color="palette.lightPink" marginBottom="0">
            Password
          </FormLabel>
          <Input
            id="password"
            type="password"
            textColor="palette.sheerPink"
            focusBorderColor="palette.white"
            onChange={handlePasswordChange}
            height="2rem"
          />
          {passwordTooShort ? (
            <FormErrorMessage marginTop="0">
              Password must be at least 8 characters long
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <FormControl isRequired isInvalid={passwordsDontMatch}>
          <FormLabel color="palette.lightPink" marginBottom="0">
            Confirm Password
          </FormLabel>
          <Input
            id="confirm-password"
            type="password"
            textColor="palette.sheerPink"
            focusBorderColor="palette.white"
            onChange={handleConfirmPasswordChange}
            height="2rem"
          />
          {passwordsDontMatch ? (
            <FormErrorMessage marginTop="0">
              Passwords don't match
            </FormErrorMessage>
          ) : (
            <></>
          )}
        </FormControl>
        <Button
          onClick={handleSubmit}
          borderRadius="50px"
          padding="5px 25px 5px"
          alignSelf="flex-end"
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
};

export default Register;
