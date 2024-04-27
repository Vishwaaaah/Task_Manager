"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Register() {
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //create a handle login function to send post request to localhost:3000/users/login
  
  const handleRegister = async () => {
    const response = await fetch("http://localhost:3000/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password , name}),
    });
    const data = await response.json();
    //response 201 then redirect to login page
    if (response.status === 201) {
      alert("Registered Successfully");
      window.location.href = "/login";
    }
    else {
      alert(data.message);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome to Task Manager</h1>
      <div className="bg-white rounded-lg p-4 space-y-4 border-2">
        <Input type="text" placeholder="name" className="w-full" onChange={(e) => setName(e.target.value)} />
        <Input type="Email" placeholder="email" className="w-full" onChange={(e) => setEmail(e.target.value)} />
        <Input type="Password" placeholder="password" className="w-full" onChange={(e) => setPassword(e.target.value)}  />
        <div className="flex justify-between">
          <Button onClick={handleRegister}>Register</Button>
        </div>
      </div>
    </div> 
  );
}

