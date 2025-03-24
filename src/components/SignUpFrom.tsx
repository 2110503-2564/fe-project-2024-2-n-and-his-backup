'use client'

import React, { useState } from "react";
// import InputItem from "./InputItem";
// import { redirect, useSearchParams } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";

export default function SignUpFrom() {
//   const query = useSearchParams();

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

  return(
    <div className="w-full h-auto">
      <form action={handleSubmit} className="flex flex-col gap-6 justify-center items-center text-white">
        <div className="flex flex-row px-4 py-3 bg-gray-800 text-white rounded-lg w-[55%] gap-3">
          <IoPersonSharp className="text-[1.6rem]"/>

          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Username"
            required
            className="w-full bg-transparent outline-none focus:ring-0"
            />
        </div>

        <div className="flex flex-row px-4 py-3 bg-gray-800 text-white rounded-lg w-[55%] gap-3">
          <FaPhoneAlt className="text-[1.6rem]"/>

          <input
            type="tel"
            id="contactNumber"
            value={contactNum}
            onChange={handleContactNumChange}
            placeholder="Contact number"
            required
            className="w-full bg-transparent outline-none focus:ring-0"
            />
        </div>
        
        <div className="flex flex-row px-4 py-3 bg-gray-800 text-white rounded-lg w-[55%] gap-3">
          <MdEmail className="text-[1.6rem]"/>

          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className="w-full bg-transparent outline-none focus:ring-0"
            />
        </div>

        <div className="flex flex-row px-4 py-3 bg-gray-800 text-white rounded-lg w-[55%] gap-3">
          <RiLockPasswordFill className="text-[1.6rem]"/>

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className="w-full bg-transparent outline-none focus:ring-0"
            />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="block rounded-md mt-2 bg-amber-600 w-fit text-black text-[1.4rem] font-bold px-20 py-2 hover:bg-amber-300 cursor-pointer">Register</button>

      </form>
    </div>
  );
}