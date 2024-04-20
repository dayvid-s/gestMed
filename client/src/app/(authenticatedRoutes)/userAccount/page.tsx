import React from 'react';

export default function Users() {

    return (
        <div className='m-auto mb-20 max-w-screen-2xl'  >
            <h4 className='mb-5 text-3xl font-semibold' >Editar Conta</h4>
            <div className='flex flex-row flex-wrap gap-12'>
                <div className=''>
                    <p>Nome</p>
                    <input className='max-w-44 mm:max-w-none h-9 border-2 px-3 rounded-md' type="text" required />
                </div>
                <div className=''>
                    <p>Email</p>
                    <input className='max-w-44 mm:max-w-none h-9 border-2 px-3 rounded-md' type="email" required />
                </div>
                <div className=''>
                    <p>Senha</p>
                    <input className='max-w-44 mm:max-w-none h-9 border-2 px-3 rounded-md' type="password" required />
                </div>
                <div className=''>
                    <p>Confirmar senha</p>
                    <input className='max-w-44 mm:max-w-none h-9 border-2 px-3 rounded-md' type="password" required />
                </div>
                <div className='mt-3 ' >
                    <button className='border-2 rounded-lg w-32 h-10 bg-[#1B1E59] hover:bg-[#0056b3] text-white mt-2.5' type="submit">Salvar</button>
                </div>
            </div>
        </div>
    );
};