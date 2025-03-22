'use client'

import { signIn } from "next-auth/react";
import React, { useState } from "react";
import InputItem from "./InputItem";

export default function LogInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signIn("credentials", {
      username: email,
      password: password,
      redirect: true,
      callbackUrl: 'http://localhost:3000'
    });

    // Reset the form after successful login
    setEmail('');
    setPassword('');
    setError('');
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  return(
    <div className="flex justify-center items-center flex-col text-[1.5rem]">
      <h2 className="text-[2rem] font-bold my-[1rem]">Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
            className="pl-[10px]"
          />
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
            className="pl-[10px]"
          />
        </div>

        <button type="submit" className="mt-[1rem]">Log In</button>
      </form>
    </div>
  );
}