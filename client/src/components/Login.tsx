"use client";
import { showAlert } from "@/features/alertSlice";
import { signInAsync } from "@/features/authSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "../assets/gestmedLogo.png";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const searchParams = useSearchParams();
  const expired = searchParams.get("expired");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    if (token) {
      router.push("/home");
    }
  }, [token]);

  useEffect(() => {
    if (expired) {
      dispatch(
        showAlert({
          placement: "bottomEnd",
          type: "info",
          title: "Sua sessão expirou. Faça login novamente.",
        })
      );
    }
  }, [expired, dispatch]);

  const handleLogin = async (event: FormEvent) => {
    try {
      event.preventDefault();
      await dispatch(signInAsync(user)).unwrap();
    } catch (error) {
      console.error("Falha ao fazer login", error);
      dispatch(
        showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "Usuário ou senha inválidos.",
        })
      );
    }
  };

  return (
    <div className='w-screen bg-[#025959] h-screen flex align justify-center items-center relative'>
      <div className="bg-[#fff]  mx-5 flex justify-center items-center flex-col rounded-lg border-2 shadow-lg sm:flex-row w-[500px]" >
        <div className='mt-4 sm:mb-2' >
          <Image className='w-40 sm:max-w-80' src={Logo} alt='Logo do Sistema' />
        </div>

        <div className='flex items-center justify-center' >
          <form className='p-6' onSubmit={handleLogin}>
            <h2 className='mb-4 text-xl font-extrabold'>Login</h2>
            <div className='mb-2'>
              <label className='my-1 text-left font-semibold ' htmlFor='username'>Usuário:</label>
              <br />

              <input className='border-2 w-56 px-3 py-0.5 rounded-md font-medium' autoComplete="email" type='text' id='username' name='email' required onChange={handleInputChange} />
              <br />
              <label className='my-1 text-left font-semibold  ' htmlFor='password'>Senha:</label>

              <br />
              <input className='border-2 w-56 px-3 py-0.5 rounded-md font-medium ' autoComplete="current-password" type='password' id='password' name='password' required onChange={handleInputChange} />
            </div>

            {/* <Link href="/home"> */}
            <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Entrar</button>
            {/* </Link> */}
          </form>
        </div>
      </div>
    </div>
  );
}