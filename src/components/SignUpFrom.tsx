'use client'

import React, { useState } from "react";
import InputItem from "./InputItem";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

export default function SignUpFrom() {
  const [email, setEmail] = useState('');
  const [contactNum, setContactNum] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    // function for sign up
  };

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    // console.log(typeof e);
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleContactNumChange(e: React.ChangeEvent<HTMLInputElement>) {
    setContactNum(e.target.value);
  }

  const formWidth = 55;

  return(
    <div className="w-full h-auto">
      <form action={handleSubmit} className="flex flex-col gap-6 justify-center items-center text-white">
        <InputItem id="username" type="text" isRequired={true} tag={<IoPersonSharp />} width={formWidth} onValueChange={handleUsernameChange}/>

        <InputItem id="contact number" type="tel" isRequired={true} tag={<FaPhoneAlt />} width={formWidth} onValueChange={handleContactNumChange}/>

        <InputItem id="email" type="email" isRequired={true} tag={<MdEmail />} width={formWidth} onValueChange={handleEmailChange}/>

        <InputItem id="password" type="password" isRequired={true} tag={<RiLockPasswordFill />} width={formWidth} onValueChange={handlePasswordChange}/>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="block rounded-md mt-2 bg-amber-600 w-fit text-black text-[1.4rem] font-bold px-20 py-2 hover:bg-amber-300 cursor-pointer">Register</button>

      </form>
    </div>
  );
}