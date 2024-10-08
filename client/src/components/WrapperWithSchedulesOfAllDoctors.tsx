import { MainScaleDuty } from "@/@types/MainScaleDutyTypes";
import { showAlert } from "@/features/alertSlice";
import { fetchMainScaleDuties } from "@/features/MainScaleDutySlice";
import { fetchMainScale } from "@/features/MainScaleSlice";
import { closeSideBar } from "@/features/sideBarSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { MainScaleDutyItem } from "./MainScaleDutyItem";
import { ModalForDoctorSolicitDuty } from "./ModalForDoctorSolicitDuty";
import { ModalToAddUsersToMainScale } from "./ModalToAddUsersToMainScale";

interface actualMainScaleDutyInfoProps {
  dayOfScaleDuty: number | null;
  shiftOfScaleDuty: number | null;
}

export function WrapperWithSchedulesOfAllDoctors() {
  const [modalInfo, setModalInfo] = useState({
    modalToAddUserInDuty: false,
    ModalForDoctorSolicitDuty: false
  });
  const [actualMainScaleDutyInfo, setActualMainScaleDutyInfo] = useState<actualMainScaleDutyInfoProps>({ dayOfScaleDuty: null, shiftOfScaleDuty: null });

  const dispatch = useDispatch<AppDispatch>();
  const { mainScale, loading, error } = useAppSelector((state) => state.mainScale);
  const [mainScaleDuties, setMainScaleDuties] = useState<MainScaleDuty[]>([]);
  const user = useAppSelector((state) => state.auth.user);
  const open = useAppSelector((state) => state.sideBar.open);


  useEffect(() => {
    dispatch(fetchMainScale()).then((result) => {
      if (fetchMainScale.rejected.match(result)) {
        dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Falha ao buscar plantões" }))
      }
    });
  }, []);

  useEffect(() => {
    if (modalInfo.modalToAddUserInDuty == false && modalInfo.ModalForDoctorSolicitDuty == false) {
      fetchMainScaleDutiesData()
    }
  }, [modalInfo]);



  const fetchMainScaleDutiesData = async () => {
    try {
      const action = await dispatch(fetchMainScaleDuties());
      if (fetchMainScaleDuties.fulfilled.match(action)) {
        const fetchedMainScaleDuties = action.payload as MainScaleDuty[];
        setMainScaleDuties(fetchedMainScaleDuties);
      } else if (fetchMainScaleDuties.rejected.match(action)) {
        dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Falha ao buscar plantões" }));
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleWithModalOpen = (dayOfScaleDuty: number, shiftOfScaleDuty: number) => {
    dispatch(closeSideBar());
    setActualMainScaleDutyInfo({ dayOfScaleDuty, shiftOfScaleDuty });
    dispatch(closeSideBar())
    if (user?.role === "Médico") {
      setModalInfo((prev) => ({ ...prev, ModalForDoctorSolicitDuty: true }));
      return
    }
    setModalInfo((prev) => ({ ...prev, modalToAddUserInDuty: true }));
  };

  const totalScaleDays = mainScale[0]?.total_of_scale_days ?? 0;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const daysArray = Array.from({ length: totalScaleDays }, (_, i) => ({
    dutyDay: i + 1,
    allDutiesAtDay: 0,
  }));

  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  if (loading) {
    return <p>Carregando escalas...</p>;
  }

  if (error) {
    return <p>Erro ao carregar escalas: {error}</p>;
  }

  return (
    <div className='bg-[#F8F8F8] items-center flex rounded-lg flex-col'>
      <h1 className='text-3xl font-extrabold'>
        &lt;{months[month - 1]}&gt;
      </h1>
      <div className='flex flex-wrap items-start justify-center mt-5'>
        {daysArray.map((day) => (
          <div className='flex flex-col mb-5' key={day.dutyDay}>
            <div className='flex justify-between px-3 w-64 bg-green500'>
              <h4 className='text-white'>
                {daysOfWeek[new Date(year, month - 1, day.dutyDay).getDay()]}
              </h4>
              <h4 className='text-white'>
                {day.dutyDay.toString().padStart(2, "0")}/{month.toString().padStart(2, "0")}
              </h4>
            </div>

            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500  ">Plantão Diurno</h1>
            </div>
            <MainScaleDutyItem allMainScaleDuties={mainScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={daysArray} IdOfShiftOfScaleDuty={1} fetchDuties={fetchMainScaleDutiesData} />

            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => handleWithModalOpen(day.dutyDay, 1)}
                title={user?.role === "Médico" ? "Solicitar para participar de plantão" : "Adicionar médico nesse plantão"}
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>
            </div>

            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500  ">Plantão Noturno</h1>
            </div>
            <MainScaleDutyItem allMainScaleDuties={mainScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={daysArray} IdOfShiftOfScaleDuty={2} fetchDuties={fetchMainScaleDutiesData} />
            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => handleWithModalOpen(day.dutyDay, 2)}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>
            </div>
          </div>
        ))}
      </div>


      <ModalForDoctorSolicitDuty
        scale_date={actualMainScaleDutyInfo.dayOfScaleDuty}
        shift_id={actualMainScaleDutyInfo.shiftOfScaleDuty}
        setIsOpen={setModalInfo}
        modalIsOpen={modalInfo.ModalForDoctorSolicitDuty}
        month={month}
        year={year}
      />
      <ModalToAddUsersToMainScale
        scale_date={actualMainScaleDutyInfo.dayOfScaleDuty}
        shift_id={actualMainScaleDutyInfo.shiftOfScaleDuty}
        setIsOpen={setModalInfo}
        modalIsOpen={modalInfo.modalToAddUserInDuty}
      />
    </div>
  );
}