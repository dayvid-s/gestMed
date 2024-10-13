import { ScaleDutyType } from "@/@types/ModelScaleDutyTypes";
import { ScaleBackendModel } from "@/@types/scaleTypes";
import { showAlert } from "@/features/alertSlice";
import { copyDutiesFromModel } from "@/features/MainScaleSlice";
import { fetchModelScaleDuties } from "@/features/ModelScaleDutySlice";
import { closeSideBar } from "@/features/sideBarSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GenericButton } from "./GenericButton";
import { ModalToAddUsersToModelScale } from "./ModalToAddUsersToModelScale";
import { ModelScaleDutyItem } from "./ModelScaleDutyItem";
interface actualModelScaleDutyInfoProps {
  dayOfScaleDuty: string | null;
  shiftOfScaleDuty: number | null;
}

export interface DayInfo {
  dutyDay: string;
  allDutiesAtDay: number;
  formattedDate: string;
  entireDate: string;
}

interface scalesModelProps {
  actualModelScaleInfo: ScaleBackendModel | null;
  setActualModelScaleInfo: React.Dispatch<React.SetStateAction<ScaleBackendModel | null>>;
}
export function ModelScales({ actualModelScaleInfo, setActualModelScaleInfo }: scalesModelProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [modelScaleDuties, setModelScaleDuties] = useState<ScaleDutyType[]>([]);
  const [actualModelScaleDutyInfo, setActualModelScaleDutyInfo] = useState<actualModelScaleDutyInfoProps>({ dayOfScaleDuty: null, shiftOfScaleDuty: null });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [optionAddAsMainScale, setOptionAddAsMainScale] = useState(true);


  function transformModelScaleInMainScale() {
    if (actualModelScaleInfo?.id) {
      dispatch(copyDutiesFromModel({ model_scale_id: actualModelScaleInfo.id }))
        .then((result) => {
          if (copyDutiesFromModel.fulfilled.match(result)) {
            dispatch(showAlert({ placement: "bottomEnd", type: "success", title: "Escala modelo transformada em escala principal com sucesso" }))
            setOptionAddAsMainScale(false)
          } else if (copyDutiesFromModel.rejected.match(result)) {
            dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Falha ao transformar escala modelo em escala principal" }))
          }
        });
    } else {
      console.error('ID da escala modelo não disponível');
    }

  }

  const dispatch = useDispatch<AppDispatch>();
  const AllScales = useAppSelector((state) => state.modelScale.ModelScales);
  const selectedmodelScale = useAppSelector((state) => state.modelScaleOptions.selectedmodelScale);

  useEffect(() => {
  }, [modelScaleDuties, actualModelScaleDutyInfo]);

  useEffect(() => {
    fetchModelScaleDutiesData();
  }, [modalIsOpen, actualModelScaleInfo]);

  const fetchModelScaleDutiesData = async () => {
    setLoading(true);
    setError(null);
    setOptionAddAsMainScale(true)

    try {
      const action = await dispatch(fetchModelScaleDuties());

      if (fetchModelScaleDuties.fulfilled.match(action)) {
        const fetchedModelScaleDuties: ScaleDutyType[] = action.payload;
        const filteredDuties = fetchedModelScaleDuties.filter(
          duty => duty?.scale?.name === actualModelScaleInfo?.name
        );
        setModelScaleDuties(filteredDuties);
      } else {
        dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Erro ao buscar plantões da escala modelo" }));
        setError("Erro ao buscar plantões da escala modelo");
      }
    } catch (err) {
      dispatch(showAlert({ placement: "bottomEnd", type: "error", title: "Erro ao buscar plantões da escala modelo" }));
      setError("Erro ao buscar plantões da escala modelo");
    } finally {
      setLoading(false);
    }
  };

  function handleWithModalOpen(dayOfScaleDuty: string, shiftOfScaleDuty: number) {
    dispatch(closeSideBar());
    setActualModelScaleDutyInfo({ dayOfScaleDuty, shiftOfScaleDuty });
    setModalIsOpen(true);
  }

  useEffect(() => {
    if (selectedmodelScale) {
      const foundScale = AllScales.find(scale => scale.name === selectedmodelScale.value);
      // @ts-ignore
      setActualModelScaleInfo(foundScale || null);
    } else {
      setActualModelScaleInfo(null);
    }
  }, [selectedmodelScale, AllScales]);

  if (!selectedmodelScale) {
    return (
      <div className='bg-[#F8F8F8] items-center flex py-5 rounded-3xl flex-col pb-10'>
        <h1 className='text-3xl font-extrabold'>Modelo de escala não selecionado</h1>
      </div>
    );
  }
  const totalScaleDays = actualModelScaleInfo?.total_of_scale_days ?? 0; // Atualiza para o padrão de `mainScale[0]?.total_of_scale_days ?? 0`
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const formatDate = (day: number, month: number): string => {
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}`;
  };

  const weekDaysAbbr = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const daysArray: DayInfo[] = Array.from({ length: totalScaleDays }, (_, i) => {
    const day = i + 1;
    const dayDate = new Date(year, month - 1, day);
    const dayOfWeek = weekDaysAbbr[dayDate.getDay()];
    const formattedDate = formatDate(day, month);
    const entireDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`; // Formato como 'YYYY-MM-DD'

    return {
      dutyDay: dayOfWeek,
      allDutiesAtDay: 0,
      formattedDate,
      entireDate,
    };
  });




  return (
    <div className='bg-[#F8F8F8] items-center flex py-5 rounded-3xl flex-col pb-10 '>
      <div className="flex flex-row justify-center w-full" >
        <h1 className='self-center text-3xl font-extrabold justify-self-center'>
          &lt;{selectedmodelScale.label}&gt;
        </h1>
      </div>

      {
        optionAddAsMainScale ?
          <div className="ml-auto mr-2 ">
            <GenericButton onClick={transformModelScaleInMainScale} title="Adicionar Como Principal" />
          </div>
          : null
      }
      <div className='flex flex-wrap items-start justify-center mt-5'>
        {daysArray.map((day) => (
          <div className='flex flex-col mb-5' key={day.dutyDay}>
            <div className='flex justify-between w-64 px-3 bg-green500'>
              <h4 className='text-white'>{day.dutyDay}</h4>
              <h4 className='text-white'>{day.formattedDate}</h4>
            </div>
            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500 ">Plantão Diurno</h1>
            </div>
            <ModelScaleDutyItem allModelScaleDuties={modelScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={daysArray} IdOfShiftOfScaleDuty={1} />

            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => handleWithModalOpen(day.entireDate, 1)}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>
            </div>

            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500 ">Plantão Noturno</h1>
            </div>
            <ModelScaleDutyItem allModelScaleDuties={modelScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={daysArray} IdOfShiftOfScaleDuty={2} />
            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => handleWithModalOpen(day.entireDate, 2)}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>

            </div>
          </div>
        ))}
      </div>

      <ModalToAddUsersToModelScale
        scale_id={actualModelScaleInfo?.id}
        scale_date={actualModelScaleDutyInfo?.dayOfScaleDuty}
        shift_id={actualModelScaleDutyInfo?.shiftOfScaleDuty}
        setIsOpen={setModalIsOpen}
        modalIsOpen={modalIsOpen}
      />
    </div>
  );
}
