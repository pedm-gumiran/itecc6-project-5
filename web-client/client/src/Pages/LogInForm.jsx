import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function LogInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/user/userlogin', {
        username,
        password,
      });

      if (res.data.success) {
        localStorage.setItem('token', res.data.token); // Store the token in local storage
        toast.success('Login Succesfull');
        navigate('/dashboard'); // Redirect to the dashboard after successful login
      } else {
        toast.error('Username or password is invalid');
      }
    } catch (error) {
      console.error(error);
      toast.error('Username and password is invalid');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col justify-center items-center my-12">
        <img
          className="rounded-[1rem] w-20 my-3"
          src={Logo}
          alt="This is the logo"
        />
        <h1 className="font-bold text-3xl text-white text-center">
          Login Form
        </h1>
        <h3 className="my-2 text-white text-center">
          Welcome Back! Please Login To continue.
        </h3>
        <form
          className="w-full flex flex-col items-center justify-center gap-4 mt-4"
          onSubmit={handleLogin}
        >
          <div className="w-full flex flex-col gap-4">
            <Inputs
              placeholder="Enter your username"
              className="bg-[#EAF1FF] text-black w-full "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative">
              <Inputs
                placeholder="Enter your password"
                className="bg-[#EAF1FF] text-black w-full"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3  top-1/2 -translate-y-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaEyeSlash size={30} color="black" />
                ) : (
                  <FaEye size={30} color='black' />
                )}
              </button>
            </div>
          </div>

          <Button
            label="LOGIN"
            className="w-full  bg-[#F3F5FA] text-2xl font-semibold hover:bg-[#abadb3] text-black "
          />
        </form>
        <h3 className="text-white my-2 text-center">
          Don’t have an account?
          <Link to="/register">
            <span className="underline ml-2 hover:text-blue-400 cursor-pointer">
              Register Here.
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
}
