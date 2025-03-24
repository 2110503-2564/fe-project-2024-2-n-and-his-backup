'use client'

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import InputItem from "./InputItem";
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
    // console.log(typeof e);
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const formWidth = 80;

  return(
    <div className="w-full h-auto">
      <form action={handleSubmit} className="flex flex-col gap-6 items-start text-white">
        <InputItem id="email" type="email" isRequired={true} tag={<MdEmail />} width={formWidth} onValueChange={handleEmailChange}/>

        <InputItem id="password" type="password" isRequired={true} tag={<RiLockPasswordFill />} width={formWidth} onValueChange={handlePasswordChange}/>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" className="block rounded-md mt-3 bg-amber-600 w-fit text-black text-[1.35rem] font-bold px-10 py-2 hover:bg-amber-300 cursor-pointer">Log In</button>
      </form>
    </div>
  );
}