import { ModelScaleDuty } from "@/@types/ModelScaleDutyTypes";

interface ModelScaleDutyProps {
  dayOfScaleDuty: number | null;
  IdOfShiftOfScaleDuty: number | null;
  allModelScaleDuties: ModelScaleDuty[]
}

export function ModelScaleDutyItem({ dayOfScaleDuty, IdOfShiftOfScaleDuty, allModelScaleDuties }: ModelScaleDutyProps) {
  // obs: tem como saber o maximo de plantoes que cada dia tem. apenas salvando o valor do total de cada plantao aqui. 
  // assim como tem como adicionar campos em branco, aqui, baseado na sentença anterior.

  // console.log(dayOfScaleDuty)
  let modelScaleDutiesOfTheDay = allModelScaleDuties.filter((modelScaleDuty) => modelScaleDuty.scale_date === dayOfScaleDuty && IdOfShiftOfScaleDuty === modelScaleDuty.shift.id)

  return (
    <div className='flex flex-col ' >




      {/* aqui os 2 textos que indicam a semana  */}


      {/* aqui os cards com info do plantao */}
      {modelScaleDutiesOfTheDay.map(() => {
        return (
          <div className='border-r-2	p-2	border-[#e2e2e2]  '  >
            <div
              title="Mostrar informações desse plantão"
              className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' >

              <p className='font-bold '>Dr. Dayvid Santos </p>
              <p className='font-bold '>07:00 - 19:00 (SD/SN)</p>
              <p  >Cardiologista</p>
            </div>
          </div>


        )

      })

      }


    </div>
  )

}