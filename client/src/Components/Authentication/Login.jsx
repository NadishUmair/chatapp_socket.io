import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'

import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [show, setShow] = useState(false);
    const [formdata, setformdata] = useState();
    const [Loading,setLoading]=useState(false);
    const navigate=useNavigate();
    const handleChange = (e) => {
      const {name,value}=e.target;
      setformdata(prev=>({
        ...prev,
        [name]:value
      }))
    };
  
    const submitHandler=async()=>{
       try {
        setLoading(true);
         const response=await axios.post("http://localhost:5000/api/user/login",formdata);
         toast.success(response.data.message)
         console.log(response);
       } catch (error) {
        toast.error(error.response.data.message)
       }finally{
        setLoading(false);
        navigate('/chat')
       }
    }
  return (
  <>
  <ToastContainer/>

<VStack spacing="5px">
          <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input name="email" type={"email"} size="sm" placeholder="Enter Your Email"
          onChange={handleChange}
        ></Input>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input name="password" placeholder="Enter Your Password" size="sm" onChange={handleChange}
            type={`${show ? "text" : "password"}`}
          ></Input>
          <InputRightElement width="3rem" h="100%">
      <Button h="100%" size="sm" onClick={() => setShow(!show)}>
        {show ? "Hide" : "Show"}
      </Button>
    </InputRightElement>
        </InputGroup>
        </FormControl>
        <Button
      colorScheme="blue"
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      >
     Login
      </Button>
        <Button
        variant='solid'
      colorScheme="red"
      width="100%"
      style={{marginTop:15}}
      onClick={submitHandler}
      isLoading={Loading}
      >
   Get Guest Credentials
      </Button>
        </VStack>
        </>
  )
}

export default Login;