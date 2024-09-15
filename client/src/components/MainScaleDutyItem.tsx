import { MainScaleDuty } from "@/@types/MainScaleDutyTypes";
import { closeSideBar } from "@/features/sideBarSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { ModalForDoctorVisualizeDuty } from "./ModalForDoctorVisualizeDuty";
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
  fetchDuties: () => Promise<void>;
}

export function MainScaleDutyItem({
  dayOfScaleDuty,
  IdOfShiftOfScaleDuty,
  allMainScaleDuties,
  allDaysOfScaleDuty,
  fetchDuties
}: MainScaleDutyProps) {

  const [modals, setModal] = useState({
    ModalToEditDutyOfMainScale: false,
    ModalForDoctorVisualizeDuty: false,
  });
  const user = useAppSelector((state) => state.auth.user);

  const toggleModal = (modalName: keyof typeof modals, isOpen: boolean) => {
    setModal((prev) => ({ ...prev, [modalName]: isOpen }));
  };
  const dispatch = useDispatch<AppDispatch>();
  const mainScaleDutiesOfTheDay = allMainScaleDuties.filter((mainScaleDuty) => mainScaleDuty.scale_date === dayOfScaleDuty.dutyDay && IdOfShiftOfScaleDuty === mainScaleDuty?.shift?.id);
  const renderCount = useRef(0);
  const [actualDutyInfo, setActualDutyInfo] = useState<MainScaleDuty | null>(null);


  useEffect(() => {
    if (renderCount.current < 1) {
      allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay =
        allDaysOfScaleDuty[dayOfScaleDuty.dutyDay - 1].allDutiesAtDay +
        mainScaleDutiesOfTheDay.length;
    }

    renderCount.current++;
  }, []);


  function changeDutyInfo(id: number) {
    const dutyFiltered = allMainScaleDuties.find((duty) => duty.id === id) || null;
    setActualDutyInfo(dutyFiltered);
  }

  return (
    <div className='flex flex-col ' >




      {/* aqui os 2 textos que indicam a semana  */}


      {/* aqui os cards com info do plantao */}
      {mainScaleDutiesOfTheDay.map((duty) => {
        return (
          <div key={duty.id} className='border-r-2	p-2	border-[#e2e2e2]  '  >
            <div
              title="Mostrar informações desse plantão"
              className={`p-2 ${duty.user ? 'bg-[#C4E7E7] border-[#025959] ' : 'bg-[#ffd8d8] border-[#f86060] '} border-l-8 cursor-pointer  rounded-r-lg min-h-20`}
              onClick={() => {
                changeDutyInfo(duty.id)
                dispatch(closeSideBar())
                {
                  user?.role === `Médico` ?
                    toggleModal("ModalForDoctorVisualizeDuty", true) :
                    toggleModal("ModalToEditDutyOfMainScale", true)
                }
              }

              } >
              <p className='font-bold '>{duty.user?.name}</p>
              <p className='font-bold '>{duty.shift?.start_time.substring(0, 5)} - {duty.shift?.end_time.substring(0, 5)} ({duty.shift.name})</p>
              {!duty?.user && <p>{"Plantão sem médico"}</p>}
              <p  >{duty.user?.specialization}</p>
            </div>
          </div>


        );

      })

      }
      <ModalToEditDutyOfMainScale
        mainScaleDutyInfo={actualDutyInfo}
        setMainScaleDutyInfo={setActualDutyInfo}
        closeModal={() => toggleModal("ModalToEditDutyOfMainScale", false)}
        modalIsOpen={modals.ModalToEditDutyOfMainScale}
        fetchDuties={fetchDuties}
      />

      <ModalForDoctorVisualizeDuty
        mainScaleDutyInfo={actualDutyInfo}
        setMainScaleDutyInfo={setActualDutyInfo}
        closeModal={() => toggleModal("ModalForDoctorVisualizeDuty", false)}
        modalIsOpen={modals.ModalForDoctorVisualizeDuty}
        fetchDuties={fetchDuties} />

    </div>
  );

}