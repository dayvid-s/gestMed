"use client"
import React, { useState, FormEvent } from 'react';
import Logo from '../../assets/gestmedLogo.png'
import Image from 'next/image';
import Link from 'next/link';

export default function Login() {

    return (
        <div className='w-screen bg-[#025959] h-screen flex align justify-center items-center relative'>
            <div className="bg-[#fff] w-72 mx-5 flex justify-center items-center flex-col rounded-lg border-2 shadow-lg sm:flex-row w-[500px]" >
                <div className='mt-4 sm:mb-2' >
                    <Image className='w-40 sm:max-w-80' src={Logo} alt='Logo do Sistema' />
                </div>

                <div className='flex items-center justify-center' >
                    <form className='p-6' >
                        <h2 className='mb-4 text-xl font-extrabold'>Login</h2>
                        <div className='mb-2'>
                            <label className='my-1 text-left font-semibold ' htmlFor='username'>Usuário:</label>
                            <br />

                            <input className='border-2 w-56 px-3 py-0.5 rounded-md font-medium' type='text' id='username' name='username' required />
                            <br />
                            <label className='my-1 text-left font-semibold  ' htmlFor='password'>Senha:</label>

                            <br />
                            <input className='border-2 w-56 px-3 py-0.5 rounded-md font-medium ' type='password' id='password' name='password' required />
                        </div>

                        <Link href="/home">
                            <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Entrar</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};