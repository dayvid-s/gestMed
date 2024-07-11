import { ScaleBackendModel } from "@/@types/scaleTypes";
import { closeSideBar } from "@/features/sideBarSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AddUsersToScaleModal } from "./ModalToAddUsersToScale";

export function ScalesModel() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [actualModelScaleInfo, setActualModelScaleInfo] = useState<ScaleBackendModel | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const AllScales = useAppSelector((state) => state.modelScale.ModelScales);
  const selectedmodelScale = useAppSelector((state) => state.modelScaleOptions.selectedmodelScale);

  console.log(actualModelScaleInfo, selectedmodelScale);
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

  const totalDiasEscala = actualModelScaleInfo?.total_of_scale_days;

  const data = new Date();
  const ano = data.getFullYear();
  const mes = data.getMonth() + 1;

  const dias = Array.from({ length: totalDiasEscala || 0 }, (_, i) => i + 1);
  const diasDaSemana = ["Dom", "Seg", "Ter", "Quar", "Qui", "Sex", "Sáb"];

  return (
    <div className='bg-[#F8F8F8] items-center flex py-5 rounded-3xl flex-col pb-10'>
      <h1 className='text-3xl font-extrabold'>
        &lt;{selectedmodelScale.label}&gt;
      </h1>

      <div className='flex flex-wrap items-start justify-center mt-5'>
        {dias.map((dia) => (
          <div className='flex flex-col' key={dia}>
            <div className='flex justify-between px-3 w-60 bg-green500'>
              <h4 className='text-white'>
                {diasDaSemana[new Date(ano, mes - 1, dia).getDay()]}
              </h4>
              <h4 className='text-white'>
                {dia.toString().padStart(2, "0")}/{mes.toString().padStart(2, "0")}
              </h4>
            </div>

            <h1 className="text-2xl font-semibold self-center text-green500 mt-3" >Plantão Diurno</h1>


            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>


              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>


              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>

            </div>



            <h1 className="text-2xl font-semibold self-center text-green500 mt-3" >Plantão Noturno</h1>




            <div className='border-r-2 p-1 border-[#e2e2e2] items-center justify-center gap-y-3'>
              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>


              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>


              <div
                onClick={() => { setModalIsOpen(true); dispatch(closeSideBar()); }}
                title="Adicionar médico nesse plantão"
                className='p-1 bg-[#ffffff] border-2 flex hover:bg-slate-200 cursor-pointer border-[#b7b7b7] rounded min-h-16 items-center justify-center'>
                <p className='text-4xl text-slate-300'>+</p>
              </div>

            </div>



          </div>
        ))}
      </div>

      <AddUsersToScaleModal setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
    </div>
  );
}