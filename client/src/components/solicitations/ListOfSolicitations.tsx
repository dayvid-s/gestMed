import { DutySolicitation } from "@/@types/dutySolicitationtypes";

interface ListOfRecentSolicitationsProps {
  solicitations: DutySolicitation[];
  updateActualSelectedSolicitation: (solicitation: DutySolicitation) => void;
}

export function ListOfSolicitations({ solicitations, updateActualSelectedSolicitation }: ListOfRecentSolicitationsProps) {
  return (
    <section className="mt-6">
      <h4 className='mb-2 text-2xl font-semibold mt-4'>Solicitações recentes</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {solicitations.map((solicitation) => (
          <div
            key={solicitation.id}
            title="Selecionar Solicitação"
            className="rounded-lg p-5 border-2 border-gray-200 hover:cursor-pointer"
            onClick={() => updateActualSelectedSolicitation(solicitation)}

          >
            <div className="flex flex-col">
              <div className="flex flex-row justify-between" >
                <h4 className="mb-5 text-2xl font-semibold mt-2 max-w-10">
                  Solicitação de plantão #{solicitation.id}
                </h4>
                <div className="flex flex-col" >
                  <h4 className="mb-5 text-2xl font-semibold mt-2 max-w-20">
                    Data do plantão
                  </h4>
                  <p className="font-semibold opacity-70">{solicitation.scale_date}
                  </p>
                </div>
              </div>
              <h4 className="mb-2 text-2xl font-semibold mt-2">Status</h4>

              <h5
                className={`text-2xl font-semibold ${solicitation.status === 'approved'
                  ? 'text-[#398585]'
                  : solicitation.status === 'in progress'
                    ? 'text-cyan-500'
                    : 'text-red-700'
                  }`}
              >
                {solicitation.status === 'approved'
                  ? 'Solicitação de plantão aprovada'
                  : solicitation.status === 'in progress'
                    ? 'Solicitação de plantão em andamento'
                    : 'Solicitação de plantão rejeitada'}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}