import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import Inputs from '../Components/Inputs';
import Button from '../Components/Button';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function RegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    try {
      const res = await axios.post('/user/createuser', {
        fullname,
        email,
        username,
        password,
      });

      if (res.data.success) {
        toast.success('Registration successful!');
        setFullName('');
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
      } else {
        toast.error('Registration failed.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred during registration.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bf-[#1E1E1E]">
      <div className="w-full max-w-md flex flex-col justify-center items-center my-12">
        <img
          className="rounded-[1rem] w-20 mb-1"
          src={Logo}
          alt="This is the logo"
        />
        <h1 className="font-bold text-3xl text-white text-center">
          Registration Form
        </h1>
        <h3 className="my-2 text-white text-center">
          Please fill out all the fields.
        </h3>
        <form
          onSubmit={handleRegister}
          className="w-full flex flex-col items-center justify-center gap-4 mt-4"
        >
          <div className="w-full flex flex-col gap-4">
            <Inputs
              placeholder="Enter your fullname"
              className="bg-[#EAF1FF] text-black w-full"
              type="text"
              value={fullname}
              onChange={(e) => setFullName(e.target.value)}
            />
            <Inputs
              placeholder="Enter your email"
              type="email"
              className="bg-[#EAF1FF] text-black w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Inputs
              placeholder="Enter your username"
              type="text"
              className="bg-[#EAF1FF] text-black w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="relative">
              <Inputs
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
                className="bg-[#EAF1FF] text-black w-full"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (confirmPassword && e.target.value !== confirmPassword) {
                    setPasswordMatchError('Passwords do not match.');
                  } else {
                    setPasswordMatchError('');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaEyeSlash size={30} color="black" />
                ) : (
                  <FaEye size={30} color="black" />
                )}
              </button>
            </div>
            <div className="relative">
              <Inputs
                placeholder="Confirm your password"
                type={showPassword ? 'text' : 'password'}
                className="bg-[#EAF1FF] text-black w-full"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);
                  if (password && value && password !== value) {
                    setPasswordMatchError('Passwords do not match.');
                  } else {
                    setPasswordMatchError('');
                  }
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-3 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <FaEyeSlash size={30} color="black" />
                ) : (
                  <FaEye size={30} color="black" />
                )}
              </button>
              {passwordMatchError && (
                <p className="text-red-500 text-sm mt-1">
                  {passwordMatchError}
                </p>
              )}
            </div>
          </div>
          <Button
            label="REGISTER"
            className="w-full bg-[#F3F5FA] text-2xl font-semibold hover:bg-[#abadb3] text-black"
            disabled={!!passwordMatchError}
          />
        </form>
        <h3 className="text-white my-2 text-center">
          Already have an account?
          <Link to="/">
            <span className="underline ml-2 hover:text-blue-400 cursor-pointer">
              Login Here.
            </span>
          </Link>
        </h3>
      </div>
    </div>
  );
}
