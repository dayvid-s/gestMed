import { DutySolicitation } from "@/@types/dutySolicitationtypes";

interface ListOfOldSolicitationsProps {
  solicitations: DutySolicitation[];
  updateActualSelectedSolicitation: (solicitation: DutySolicitation) => void;
}


export function ListOfOldSolicitations({ solicitations, updateActualSelectedSolicitation }: ListOfOldSolicitationsProps) {

  return (
    <section className="mt-6 " >
      <h4 className='mb-2 text-2xl font-semibold mt-4 ' >Solicitações anteriores</h4>

      <div className="flex flex-col gap-y-4 sm:flex-row gap-4">
        {solicitations.map((solicitation) => (

          <>
            <div key={solicitation.id}
              title="Selecionar Solicitação"
              className="rounded-lg p-5 border-2 border-gray-200 min-h-56 max-w-96 hover:cursor-pointer"

              onClick={() => updateActualSelectedSolicitation(solicitation)}

            >
              <div className="flex flex-col" >
                <h4 className='mb-5 text-2xl font-semibold mt-2' >Solicitação de plantão #23456</h4>

                <h4 className='mb-2 text-2xl font-semibold mt-2' >Dia do plantão</h4>
                <h5 className="text-2xl text-[#398585] font-semibold">{solicitation.scale_date}</h5>
              </div>
            </div>



          </>

        ))}

      </div>

    </section>





  )


}