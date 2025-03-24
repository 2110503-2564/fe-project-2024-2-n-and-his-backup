'use client'

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import InputItem from "./InputItem";
import { redirect, useSearchParams } from "next/navigation";

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
    <div className="flex justify-center items-center flex-col text-[1.5rem]">
      <h2 className="text-[2rem] font-bold my-[1rem]">Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form action={handleSubmit} className="flex flex-col gap-3 items-center">
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
            required
            className="pl-[10px] border-b-2 p-2"
          />
        </div>

        <div>

          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            required
            className="pl-[10px] border-b-2 p-2"
          />
        </div>

        <button type="submit" className="mt-[1rem] bg-green-500 w-fit text-black font-bold px-5 py-2 hover:bg-green-300 cursor-pointer">Log In</button>
      </form>
    </div>
  );
}