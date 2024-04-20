'use client'
import React from 'react';

import Link from 'next/link';
import { FaFile } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
// import { Welcome } from '../../../components/Welcome';


export default function Page() {

  return (
    <div >
      {/* <Welcome /> */}
      componente filho

      <div className='z-50 '>
        <div className='z-50 flex gap-2 overflow-auto '>
          <Link href="/form">
            <div className='flex justify-center items-center flex-col rounded-lg border-2 bg-[#1B1E59] hover:bg-[#0056b3] text-white w-64	 h-48'>
              <FaFileSignature className='relative w-20 h-20 left-4' />
              <p className='relative top-8'>Preencher Relatório</p>
            </div>
          </Link>
          <Link href="/report">
            <div className='flex justify-center items-center flex-col rounded-lg border-2 bg-[#1B1E59] hover:bg-[#0056b3] text-white w-64	 h-48'>
              <FaFile className='w-20 h-20' />
              <p className='relative top-8'>Buscar Relatórios</p>
            </div>
          </Link>
          <Link href="/users">
            <div className='flex justify-center items-center flex-col rounded-lg border-2 bg-[#1B1E59] hover:bg-[#0056b3] text-white w-64	 h-48'>
              <FaUsers className='w-20 h-20' />
              <p className='relative top-6'>Gerenciar Usuários</p>
            </div>
          </Link>
          <Link href="/userAccount">
            <div className='flex justify-center items-center flex-col rounded-lg border-2 bg-[#1B1E59] hover:bg-[#0056b3] text-white w-64	 h-48'>
              <FaUserPen className='w-20 h-20' />
              <p className='relative top-8'>Suas informações</p>
            </div>
          </Link>
        </div>
      </div>

      {/* componente filho */}

      <section className='mt-10'>

        <strong className='text-3xl ' >Unidades de mensuração</strong>

      </section>
    </div>
  );
}

