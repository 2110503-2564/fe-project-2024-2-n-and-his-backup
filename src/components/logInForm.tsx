'use client'

import { signIn } from "next-auth/react";
import React, { useState } from "react";
// import InputItem from "./InputItem";
import { redirect, useSearchParams } from "next/navigation";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


export default function LogInForm() {
  const query = useSearchParams();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);

    const response = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
      callbackUrl: 'http://localhost:3000'
    }) as any;

    if (!response.ok) {
      return setError((response as any).error);
    }

    let url = "/";

    try {
      const urlParam = query.get("redirect");
      if (urlParam) {
        url = decodeURIComponent(atob(urlParam))
      }
    } catch(e) {}

    redirect(url);
  };

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(typeof e);
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  return(
    <div className="w-full h-auto">
      <form action={handleSubmit} className="flex flex-col gap-6 items-start text-white">
        <div className="flex flex-row px-4 py-2 bg-gray-800 text-white rounded-lg w-[80%] gap-3">
          <MdEmail className="text-[1.8rem]"/>

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

        <div className="flex flex-row px-4 py-2 bg-gray-800 text-white rounded-lg w-[80%] gap-3">
          <RiLockPasswordFill className="text-[1.8rem]"/>

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

        <button type="submit" className="block rounded-md mt-4 bg-green-500 w-fit text-black text-[1.6rem] font-bold px-10 py-2 hover:bg-green-300 cursor-pointer">Log In</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}