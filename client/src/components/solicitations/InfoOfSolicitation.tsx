import { DutySolicitation } from "@/@types/dutySolicitationtypes";
import { Steps } from "rsuite";
interface InfoOfSolicitationsProps {
  solicitation: DutySolicitation | null;
}
export function InfoOfSolicitation({ solicitation }: InfoOfSolicitationsProps) {
  const isPastDate = (dateString: string | null | undefined): boolean => {
    if (!dateString) return false;

    const scaleDate = new Date(dateString);

    // Obtenha a data atual (sem considerar horas)
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera horas, minutos, segundos e milissegundos

    return scaleDate < today; // Retorna true se a data for menor (ultrapassada)
  };



  return (
    <section className=" w-full rounded-lg border-2 border-gray-200 min-h-72" >
      <div className="flex flex-col p-5">
        <div className="flex flex-col gap-y-5 md:flex-row md:gap-0 justify-between" >
          <div className="flex flex-col" >
            <h4 className="text-2xl font-semibold ">Status da Solicitação</h4>
            <h5
              className={`text-2xl font-semibold ${solicitation?.status === 'approved'
                ? 'text-[#398585]'
                : solicitation?.status === 'in progress'
                  ? 'text-cyan-500'
                  : 'text-red-700'
                }`}
            >
              {solicitation?.status === 'approved'
                ? 'Solicitação de plantão aprovada'
                : solicitation?.status === 'in progress'
                  ? 'Solicitação de plantão em andamento'
                  : 'Solicitação de plantão rejeitada'}
            </h5>
          </div>

          <div className="flex flex-col" >
            <h4 className="text-2xl font-semibold ">Data da Solicitação</h4>
            <h5 className="text-2xl text-[#398585] font-semibold">{solicitation?.created_at}</h5>
          </div>


          <div className="flex flex-col" >
            <h4 className="text-2xl font-semibold ">Código da Solicitação</h4>
            <h5 className="text-2xl text-[#398585] font-semibold">#{solicitation?.id}</h5>
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
              <h5 className="text-2xl text-[#398585] font-semibold">{solicitation?.shift?.name === "SD" ? "Plantão Diurno" : "Plantão Noturno "}</h5>
            </div>

            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Data do plantão</h4>
              <h5 className="text-2xl text-[#398585] font-semibold">{solicitation?.scale_date}</h5>
            </div>


            <div className="flex flex-col" >
              <h4 className="text-2xl font-semibold ">Plantão ativo?</h4>
              <h5 className={`text-2xl font-semibold ${isPastDate(solicitation?.scale_date) ? 'text-red-700' : 'text-[#398585]'}`}>
                {isPastDate(solicitation?.scale_date)
                  ? 'Não, data ultrapassada'
                  : 'Sim, data futura'}
              </h5>
            </div>








          </div>

          {/* </div> */}
        </div>
      </div>

    </section>



  )


}