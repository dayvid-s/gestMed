import { Steps } from "rsuite";

export function InfoOfSolicitation() {

  return (
    <section className=" w-full rounded-lg border-2 border-gray-200 min-h-72" >
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

        <div className="mt-5">
          <h4 className="text-2xl font-semibold mb-5 ">
            Informações do plantão
          </h4>


          <div className="flex flex-col gap-y-5 md:flex-row md:gap-0 justify-between" >
            {/* <div className="flex flex-col gap-y-5 md:flex-row md:gap-0 justify-between" > */}
            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Turno do plantão</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">Diurno</h5>
            </div>

            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Data do plantão</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">12/07/2024</h5>
            </div>


            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Plantão ativo?</h4>
              <h5 className="text-2xl text-[#ee3333] font-semibold">Não, data ultrapassada.</h5>
            </div>








          </div>

          {/* </div> */}
        </div>
      </div>

    </section>



  )


}