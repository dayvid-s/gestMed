'use client'
import React from 'react';

import Link from 'next/link';
import { FaFile } from "react-icons/fa";
import { FaFileSignature } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
// import { Welcome } from '../../../components/Welcome';
import { WrapperWithSchedulesOfAllDoctors } from '../../../components/WrapperWithSchedulesOfAllDoctors';


export default function Page() {

  return (
    <div >
      {/* <Welcome /> */}

      {/* componente filho */}

      <section className='mt-4 '>
        <WrapperWithSchedulesOfAllDoctors />

      </section>
    </div>
  );
}

