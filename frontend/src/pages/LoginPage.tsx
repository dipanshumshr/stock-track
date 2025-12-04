import type { JSX } from "react";
import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createLoginQuery } from "../queryOptions/loginQuery";


type User = {
  username: string,
  password: string
}

type UserError = Partial<Record<keyof User, string>>

type Touched = Partial<Record<keyof User, boolean>>

function validateRecord(name: keyof UserError, value: string): string | undefined {
  if (name === "username") {
    if (!value) return "Please enter the username"
  }
  if (name === "password") {
    if (!value) return "Password required"
    if (value.length < 8) return "Password must be at least 8 characters"
  }
  return undefined
}

function LoginPage(): JSX.Element {
  const [userDetails, setUserDetails] = useState<User>({
    username: "",
    password: ""
  })

  const [userError, setUserError] = useState<UserError>({})
  const [touched, setTouched] = useState<Touched>({})
  const [showPassword , setShowPassword] = useState(false)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()

  const { mutate , isPending } = useMutation({...createLoginQuery ,
    onError : (Error) => {
        console.log("Something wrong, Please try again", Error.message)
    },
    onSuccess : (data) => {
        console.log("Successfully Loaded", data)
        login()
        navigate("/dashboard")
    },
  })


  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setTouched(prev => ({ ...prev, [name as keyof User]: true }))
    setUserError(prev => ({ ...prev, [name as keyof User]: validateRecord(name as keyof User, value) }))
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setTouched(prev => ({
      ...prev, [name]: false
    }))
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const newError = {
      username: validateRecord("username", userDetails.username),
      password: validateRecord('password', userDetails.password)
    }
    setUserError(newError)
    setTouched({ username: true, password: true })

    if (newError.username || newError.password) {
      console.log("Validation errors, not submitting");
      return;
    }
    mutate(userDetails)
  }

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-zinc-800 border border-zinc-700">

        {/* Left Column: Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-16 flex flex-col justify-center bg-zinc-800">
          <h1 className="text-5xl font-bold text-white mb-3">Welcome Back</h1>
          <p className="text-zinc-400 mb-12 text-lg">Sign in to continue your journey</p>

          <div className="space-y-8">
            {/* Username/Email Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-zinc-300 mb-3"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="john.doe@example.com"
                value={userDetails.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#A2AF9B] focus:border-[#A2AF9B] transition-all duration-200"
              />
              {touched.username && userError.username && (
                <p className="mt-2 text-sm text-red-400">{userError.username}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-300 mb-3"
              >
                Password
              </label>
              {/* 1. Add the relative positioning container */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={userDetails.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  // 2. Add padding to the right to make space for the icon
                  className="w-full pl-4 pr-12 py-3 bg-zinc-700 border border-zinc-600 rounded-lg text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#A2AF9B] focus:border-[#A2AF9B] transition-all duration-200"
                />
                {/* 3. Add the absolutely positioned button */}
                <button
                  type="button" 
                  onClick={() => {setShowPassword(prev => !prev)}}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-zinc-400 hover:text-[#A2AF9B] transition-colors duration-200"
                >
                  {/* Your React Icon component will go here, e.g., <FaEye /> */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </div>
              {touched.password && userError.password && (
                <p className="mt-2 text-sm text-red-400">{userError.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled = {isPending}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white bg-[#9CAFAA] hover:bg-[#57564F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-800 focus:ring-orange-500 transition-all duration-200"
              >
                {isPending ? "Signing In..." : "Sign in"}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="w-1/2 hidden md:block relative">
          <div className="absolute inset-0 bg-gradient-to-l from-zinc-800/60 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="medicine"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default LoginPage