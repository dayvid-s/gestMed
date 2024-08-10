import { MainScaleDuty } from "@/@types/MainScaleDutyTypes";
import { useEffect, useRef, useState } from "react";
import { ModalToEditDutyOfMainScale } from "./ModalToEditDutyOfMainScale";

interface dayOfScaleDutyProps {
  dutyDay: number;
  allDutiesAtDay: number;
}
interface MainScaleDutyProps {
  dayOfScaleDuty: dayOfScaleDutyProps;
  IdOfShiftOfScaleDuty: number | null;
  allMainScaleDuties: MainScaleDuty[];
  allDaysOfScaleDuty: dayOfScaleDutyProps[];

}

export function MainScaleDutyItem({ dayOfScaleDuty, IdOfShiftOfScaleDuty, allMainScaleDuties, allDaysOfScaleDuty }: MainScaleDutyProps) {

  const mainScaleDutiesOfTheDay = allMainScaleDuties.filter((mainScaleDuty) => mainScaleDuty.scale_date === dayOfScaleDuty.dutyDay && IdOfShiftOfScaleDuty === mainScaleDuty.shift.id);
  const renderCount = useRef(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);


  useEffect(() => {
    if (renderCount.current < 1) {
      allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay =
        allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay +
        mainScaleDutiesOfTheDay.length;
    }

    renderCount.current++;
  }, []);


  return (
    <div className='flex flex-col ' >




      {/* aqui os 2 textos que indicam a semana  */}


      {/* aqui os cards com info do plantao */}
      {mainScaleDutiesOfTheDay.map((duty) => {
        return (
          <div key={duty.id} className='border-r-2	p-2	border-[#e2e2e2]  '  >
            <div
              title="Mostrar informações desse plantão"
              className=' p-2 bg-[#C4E7E7] border-l-8 cursor-pointer	border-[#025959]	   rounded-r-lg		min-h-20		 ' onClick={() => setModalIsOpen(true)} >
              <p className='font-bold '>{duty.user.name}</p>
              <ModalToEditDutyOfMainScale
                modelScaleDutyInfo={duty}
                setIsOpen={setModalIsOpen}
                modalIsOpen={modalIsOpen}
              />
              <p className='font-bold '>{duty.shift?.start_time.substring(0, 5)} - {duty.shift?.end_time.substring(0, 5)} ({duty.shift.name})</p>
              <p  >{duty.user.specialization}  Cardiologista</p>
            </div>
          </div>


        );

      })

      }

    </div>
  );

}