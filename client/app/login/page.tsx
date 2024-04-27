"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //create a handle login function to send post request to localhost:3000/users/login
  
  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);  };
    window.location.href = "/tasks";
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4 ">Welcome to Task Manager</h1>
      <div className="bg-white rounded-lg p-4 space-y-4 border-2">
        <Input type="Email" placeholder="email" className="w-full" onChange={(e) => setEmail(e.target.value)} />
        <Input type="Password" placeholder="password" className="w-full" onChange={(e) => setPassword(e.target.value)}  />
        <div className="flex justify-between">
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={ () => window.location.href = '/register'}>Register</Button>
        </div>
      </div>
    </div> 
  );
}

