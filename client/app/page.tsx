"use client"; 
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
    } else {
      window.location.href = '/tasks';
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-4xl font-bold ">Welcome to Task Manager</h1>
    </div>
  );
}