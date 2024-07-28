import { ModelScaleDuty } from "@/@types/ModelScaleDutyTypes";
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
  dayOfScaleDuty: number | null;
  shiftOfScaleDuty: number | null;
}

interface scalesModelProps {
  actualModelScaleInfo: ScaleBackendModel | null;
  setActualModelScaleInfo: React.Dispatch<React.SetStateAction<ScaleBackendModel | null>>;
}
export function ModelScales({ actualModelScaleInfo, setActualModelScaleInfo }: scalesModelProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [modelScaleDuties, setModelScaleDuties] = useState<ModelScaleDuty[]>([]);
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
        const fetchedModelScaleDuties: ModelScaleDuty[] = action.payload;
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

  function handleWithModalOpen(dayOfScaleDuty: number, shiftOfScaleDuty: number) {
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

  const totalScaleDays = actualModelScaleInfo?.total_of_scale_days;
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  const days = Array.from({ length: totalScaleDays || 0 }, (_, i) => ({
    dutyDay: i + 1,
    allDutiesAtDay: 0,
  })); const diasDaSemana = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"];



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
        {days.map((day) => (
          <div className='flex flex-col mb-5' key={day.dutyDay}>
            <div className='flex justify-between px-3 w-64 bg-green500'>
              <h4 className='text-white'>
                {diasDaSemana[new Date(year, month - 1, day.dutyDay).getDay()]}
              </h4>
              <h4 className='text-white'>
                {day.dutyDay.toString().padStart(2, "0")}/{month.toString().padStart(2, "0")}
              </h4>
            </div>
            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500  ">Plantão Diurno</h1>
            </div>
            <ModelScaleDutyItem allModelScaleDuties={modelScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={days} IdOfShiftOfScaleDuty={1} />

            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => handleWithModalOpen(day.dutyDay, 1)}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>
            </div>

            <div className=" flex justify-center border-[#e2e2e2] border-r-2" >
              <h1 className="self-center mt-3 text-2xl font-semibold text-green500  ">Plantão Noturno</h1>
            </div>
            <ModelScaleDutyItem allModelScaleDuties={modelScaleDuties} dayOfScaleDuty={day} allDaysOfScaleDuty={days} IdOfShiftOfScaleDuty={2} />
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
