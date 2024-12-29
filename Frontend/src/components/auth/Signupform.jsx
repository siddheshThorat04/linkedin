"use client";

import axios from "axios";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios.js"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { Loader } from "lucide-react"
const Signupform = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState(""); 
	const [password, setPassword] = useState("");

	const { mutate: signupMutation, isloading } = useMutation({
		mutationFn: async (data) => {
			const res = await axiosInstance.post('/auth/signup', data)
			return res.data
		},
		onSuccess: () => { toast.success("Account created successfully"); },
		onError: (err) => { toast.error( err.response.data.message ||  "Something went wrong") },
	})
	const handleSignUp = (e) => {
		e.preventDefault();
		signupMutation({ name, username, email, password })
	};

	return (
		<form onSubmit={handleSignUp} className='flex overflow-hidden text-black px-4   flex-col gap-4'>
			<input
				type='text'
				placeholder='Full name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password (6+ characters)'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<button type='submit' className='btn  font-bold  bg-transparent text-blue-600  border-none    outline-none   mt-4 mx-auto   btn-primary w-1/3 '>
				 "Sign Up"
			</button>

		</form>
	);
};
export default Signupform;