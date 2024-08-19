import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [formdata, setformdata] = useState(new FormData()); // Initialize with FormData
  const [isloading,setIslaoding]=useState(false)
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === 'file') {
      formdata.append(name, files[0]); // Append the file to FormData
    } else {
      formdata.set(name, value); // Set other form fields in FormData
    }
    setformdata(formdata); // Update the formdata state
  };

  const submitHandler = async () => {
    try {
       setIslaoding(true);
      const response = await axios.post("http://localhost:5000/api/user/register", formdata, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      setIslaoding(false)
    }
  };

  return (
    <>
      <ToastContainer />
      <VStack spacing="5px">
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input name="name" size="sm" placeholder="Enter Your Name" onChange={handleChange}></Input>
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input name="email" type={"email"} size="sm" placeholder="Enter Your Email" onChange={handleChange}></Input>
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input name="password" placeholder="Enter Your Password" size="sm" onChange={handleChange} type={show ? "text" : "password"}></Input>
            <InputRightElement width="3rem" h="100%">
              <Button h="100%" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup>
            <Input name="confirmpassword" size="sm" placeholder="Enter Your Password" onChange={handleChange} type={show ? "text" : "password"}></Input>
            <InputRightElement width="3rem" h="100%">
              <Button h="100%" size="sm" onClick={() => setShow(!show)}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="avatar" isRequired>
          <FormLabel>Upload Image</FormLabel>
          <Input name="avatar" accept="image/*" size="sm" h="100%" type={"file"} placeholder="" p={1.5} onChange={handleChange}></Input>
        </FormControl>
        <Button isLoading={isloading} colorScheme="blue" width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
