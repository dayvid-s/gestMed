import { ScaleDutyType } from "@/@types/ModelScaleDutyTypes";
import { useEffect, useRef, useState } from "react";
import { ModalToEditDutyOfModelScale } from "./ModalToEditDutyOfModelScale";

interface dayOfScaleDutyProps {
  dutyDay: number;
  allDutiesAtDay: number;
}
interface ModelScaleDutyProps {
  dayOfScaleDuty: dayOfScaleDutyProps;
  IdOfShiftOfScaleDuty: number | null;
  allModelScaleDuties: ScaleDutyType[];
  allDaysOfScaleDuty: dayOfScaleDutyProps[];

}

export function ModelScaleDutyItem({ dayOfScaleDuty, IdOfShiftOfScaleDuty, allModelScaleDuties, allDaysOfScaleDuty }: ModelScaleDutyProps) {
  // obs: tem como saber o maximo de plantoes que cada dia tem. apenas salvando o valor do total de cada plantao aqui. 
  // assim como tem como adicionar campos em branco, aqui, baseado na sentença anterior.

  const modelScaleDutiesOfTheDay = allModelScaleDuties.filter((modelScaleDuty) => modelScaleDuty.scale_date === dayOfScaleDuty.dutyDay && IdOfShiftOfScaleDuty === modelScaleDuty.shift.id);
  const renderCount = useRef(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    if (renderCount.current < 1) {
      allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay =
        allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay +
        modelScaleDutiesOfTheDay.length;
    }

    renderCount.current++;
  }, []);


  return (
    <div className='flex flex-col ' >




      {/* aqui os 2 textos que indicam a semana  */}


      {/* aqui os cards com info do plantao */}
      {modelScaleDutiesOfTheDay.map((duty) => {
        return (
          <div key={duty.id} className='border-r-2	p-2	border-[#e2e2e2]  '  >
            <div
              title="Mostrar informações desse plantão"
              className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' onClick={() => setModalIsOpen(true)} >
              <p className='font-bold '>{duty.user?.name}</p>
              <ModalToEditDutyOfModelScale
                modelScaleDutyInfo={duty}
                setIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
              />
              <p className='font-bold '>{duty.shift?.start_time.substring(0, 5)} - {duty.shift?.end_time.substring(0, 5)} ({duty.shift.name})</p>
              <p  >{duty.user?.specialization}  </p>
            </div>
          </div>


        );

      })

      }

    </div>
  );

}