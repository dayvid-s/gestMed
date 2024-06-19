import Link from "next/link";
import { useState } from "react";
import { SelectPicker, Stack } from "rsuite";
import { CreateScaleModal } from "./CreateScaleModal";

export function ChoiceScale() {
    const [modalIsOpen, setModalIsOpen] = useState(false)


    const data = ['Escala padrão',].map(
        item => ({ label: item, value: item })
    );
    return (

        <div>

            <div className="flex-row " >
                <SelectPicker
                    className="mr-10"
                    data={data}
                    searchable={false}
                    style={{ width: 224 }}
                    placeholder="Escolha uma escala"
                />


                <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Baixar Escala</button>


                <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Limpar Modelo</button>



                <button
                    onClick={() => { setModalIsOpen(true) }}

                    className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Criar Escala</button>
                

                {/* <button
                    onClick={() => { setModalIsOpen(true) }}

                    className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Salvar Alterações</button> */}


                <CreateScaleModal
                    setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />

            </div>


        </div>
    )
}