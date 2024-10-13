"use client";

import { fetchConfiguration } from "@/features/configurationSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Steps } from "rsuite";

export default function DutySolicitationForDoctor() {
  const dispatch = useDispatch<AppDispatch>();
  const configuration = useAppSelector((state) => state.configuration.configurations);

  useEffect(() => {
    dispatch(fetchConfiguration());
  }, [dispatch]);


  return (
    <div className="m-auto mb-20 max-w-screen-2xl">
      <h4 className='mb-5 text-3xl font-semibold mt-2' >Solicitações de Plantão</h4>

      <section className=" w-full rounded-lg border-2 border-gray-200 min-h-56" >
        <div className="flex flex-col p-5">
          <div className="flex flex-col gap-y-5 md:flex-row md:gap-0 justify-between" >
            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Status da Solicitação</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Em Avaliação de Aprovação</h5>
            </div>

            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Data da Solicitação</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">12/07/2024</h5>
            </div>


            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Código da Solicitação</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">#232213</h5>
            </div>





          </div>
          <Steps className="mt-6  " current={1}>
            <Steps.Item className="text-red-600 !important" />
            <Steps.Item />
            <Steps.Item />
          </Steps>

        </div>

      </section>




      <section className="mt-6 " >
        <h4 className='mb-2 text-2xl font-semibold mt-4 ' >Solicitações recentes</h4>

        <div className="flex flex-col gap-y-4 sm:flex-row gap-4">


          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>



          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>





          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>


        </div>

      </section>



      <section className="mt-6 " >
        <h4 className='mb-2 text-2xl font-semibold mt-4 ' >Todas as solicitações</h4>

        <div className="flex flex-col gap-y-4 sm:flex-row gap-4">


          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>



          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>





          <div title="Selecionar Solicitação" className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer">
            <div className="flex flex-col" >
              <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

              <h4 className='mb-2 text-2xl font-semibold mt-2' >Status</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Solicitação de plantão aprovada</h5>
            </div>
          </div>


        </div>

      </section>







    </div>
  );
}
