import React, { useState } from 'react';
import { CreateScaleModal } from './CreateScaleModal';
import { AddUsersToScaleModal } from './ModalToAddUsersToScale';

export function ScalesModel() {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    var data = new Date();
    var ano = data.getFullYear();
    var mes = data.getMonth() + 1;
    var totalDiasMes = new Date(ano, mes, 0).getDate();

    var dias = Array.from({ length: totalDiasMes }, (_, i) => i + 1);
    var diasDaSemana = ['Dom', 'Seg', 'Ter', 'Quar', 'Qui', 'Sex', 'Sáb'];
    return (
        <div className='bg-[#F8F8F8] items-center flex b rounded-lg flex-col	  '  >

            <h1 className='text-3xl font-extrabold ' >
                &lt;Escala Modelo&gt;
            </h1>

            <div className='flex flex-wrap items-start justify-center mt-5'>
                {dias.map((dia) =>

                    // aqui a coluna 
                    <div className='flex flex-col ' key={dia}>




                        {/* aqui os 2 textos que indicam a semana  */}
                        <div className='flex justify-between px-3 w-60 bg-green500 ' >
                            <text className='text-white ' >{diasDaSemana[new Date(ano, mes - 1, dia).getDay()]}</text>
                            <text className='text-white ' >{dia.toString().padStart(2, '0')}/{mes.toString().padStart(2, '0')}</text>
                        </div>


                        {/* aqui os cards com info do plantao */}

                        <div className='border-r-2	p-1	border-[#e2e2e2] items-center justify-center   '  >
                            <div
                                onClick={() => setModalIsOpen(true)} title="Adicionar médico nesse plantão"
                                className=' p-1 bg-[#ffffff] border-2 flex 
                              hover:bg-slate-200
                                cursor-pointer	border-[#b7b7b7]	   rounded		min-h-16 items-center justify-center		 ' >

                                <p className='text-4xl text-slate-300' >+</p>
                            </div>
                        </div>

                    </div>
                )}
            </div>

            <AddUsersToScaleModal
                setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
        </div>
    );
}
