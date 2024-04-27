"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format, parseISO } from "date-fns";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Task from "@/components/ui/task";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  Date: z.date(),
});

const TaskPage: React.FC = () => {
  const [completedTasks, setCompletedTasks] = useState(0);

  const [tasks, setTasks] = useState([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleCompletionChange = (id, completed) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? { ...task, completed } : task))
    );
  };

  const handleTaskDeletion = (id) => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        } else {
          console.error("Failed to delete task");
        }
      })
      .catch((error) => console.error("Error deleting task:", error));
  };
  const onSubmit = (data) => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        form.reset();
      })
      .catch((error) => console.error("Error creating task:", error));
  };
  useEffect(() => {
    const completed = tasks.filter((task) => task.completed).length;
    setCompletedTasks(completed);
  }, [tasks]);
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:3000/tasks", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const sortedData = [...data].sort(
          (a, b) => new Date(a.Date) - new Date(b.Date)
        );
        setTasks(sortedData);
      })

      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-lg z-10">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <a className="font-semibold text-lg text-gray-800" href="#">
            Task Manager
          </a>
          <div className="space-x-4">
            <ScrollLink
              className="text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer"
              activeClass="text-blue-500"
              to="add-task"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Add Task
            </ScrollLink>
            <ScrollLink
              className="text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer"
              activeClass="text-blue-500"
              to="calendar-view"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              Calendar View
            </ScrollLink>
            <ScrollLink
              className="text-gray-700 hover:text-blue-500 transition duration-200 cursor-pointer"
              activeClass="text-blue-500"
              to="all-tasks"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
            >
              All Tasks
            </ScrollLink>
          </div>
        </div>
      </nav>
      <section id="add-task" className="p-4 h-screen bg-red-200">
        <h2 className="text-2xl font-bold mb-4">Add Task</h2>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full md:w-1/2 lg:w-1/3 mx-auto">
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <Form {...form} className="space-y-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-lg font-medium">Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        className="border p-2 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-lg font-medium">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Description"
                        {...field}
                        className="border p-2 rounded"
                      />
                    </FormControl>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="Date"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel className="text-lg font-medium">
                      Task End Date
                    </FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className="border p-2 rounded"
                          >
                            {field.value ? (
                              format(new Date(field.value), "PPP", {
                                timeZone: "Asia/Kolkata",
                              })
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            const event = {
                              target: {
                                name: field.name,
                                value: date,
                              },
                            };
                            field.onChange(event);
                          }}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage className="text-sm text-red-600" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add Task
              </Button>
            </form>
          </Form>
        </div>
      </section>

      <section id="calendar-view" className="p-4 bg-yellow-100">
        <h2 className="text-2xl font-bold mb-4">Calendar View</h2>
        <div className="bg-white border-4 rounded-lg shadow-2xl">
          <div className="w-full">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              events={tasks.map((task) => ({
                title: `${task.title} - ${task.description}`,
                date: task.Date.split("T")[0],
              }))}
            />
          </div>
        </div>
      </section>
      <section id="all-tasks" className="p-4 h-screen bg-blue-100">
        <h2 className="text-2xl font-bold mb-4">All Tasks</h2>
        <div className="h-2 bg-gray-200 rounded">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded animate-pulse"
            ></div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-4">
          {tasks.map((task, index) => (
            <Task
              key={index}
              checkid={task._id}
              completed={task.completed}
              title={
                task.title +
                " - " +
                format(parseISO(task.Date), "PPP", { timeZone: "Asia/Kolkata" })
              }
              description={task.description}
              onCompletionChange={handleCompletionChange}
              onDeletion = {handleTaskDeletion}
              className="p-4 border rounded shadow"
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TaskPage;
