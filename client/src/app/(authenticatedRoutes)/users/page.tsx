'use client'
import React, { useState } from 'react';
import UsersTable from '../../../components/UsersTable';

export default function Users() {

  return (
    <div className='m-auto mb-20 max-w-screen-2xl'  >
      <h4 className='mb-5 text-3xl font-semibold ' >Listagem de médicos</h4>
      <UsersTable />

    </div>
  );
};