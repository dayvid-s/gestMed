'use client'
import { ChoiceScale } from '@/components/Choicescale'
import  { useState } from 'react';

import React, { Dispatch, SetStateAction } from 'react';
import { Form } from 'rsuite';
import { SelectPicker } from 'rsuite';
type UserData = {
  name: string;
  email: string;
  crm: string;
  uf: string;
  city: string;
  phone: string;
  cpf: string;
  rg: string;
  address: string;
  bank: string;
  agency: string;
  account: string;
  password: string;
  department: string | null;
};
  // role: string | null;

type UserFormProps = {
  handleInputChange: Dispatch<SetStateAction<UserData>>;
  userData: UserData;
  handleDepartmentChange: (value: string | null) => void;
  handleRoleChange: (value: string | null) => void;
};

export function UserForm({ handleInputChange, userData,
  handleDepartmentChange,
  handleRoleChange

}: UserFormProps) {

  const handleInput = (value: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    handleInputChange(prevState => ({ ...prevState, [name]: value }));
  };
}

export default function Scale() {
  
  

  return (
    <div className='m-auto mb-20 max-w-screen-2xl'  >
      <h4 className='mb-5 text-3xl font-semibold ' >Modelos de Escala</h4>

  <ChoiceScale/>
    </div>
  );
};