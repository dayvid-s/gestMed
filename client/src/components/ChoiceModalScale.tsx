import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { CreateScaleModal } from "./CreateScaleModal";

import { ScaleBackendModel } from "@/@types/scaleTypes";
import { showAlert } from "@/features/alertSlice";
import { clearSelectedmodelScale, setSelectedmodelScale } from "@/features/ModelScaleOptionSlice";
import { deleteModelScale, fetchAllModelScales } from "@/features/ModelScaleSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useDispatch } from "react-redux";


interface choiceScaleProps {
  actualModelScaleInfo: ScaleBackendModel | null;
  setActualModelScaleInfo: React.Dispatch<React.SetStateAction<ScaleBackendModel | null>>;
}

export function ChoiceModalScale({ actualModelScaleInfo, setActualModelScaleInfo }: choiceScaleProps) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const modelScales = useAppSelector((state) => state.modelScale.ModelScales);
  const loading = useAppSelector((state) => state.modelScale.loading);
  const error = useAppSelector((state) => state.modelScale.error);
  useEffect(() => {
    dispatch(fetchAllModelScales());
  }, [dispatch]);

  async function excludeModelScale() {
    try {
      if (!actualModelScaleInfo?.id) {
        console.error('ID da escala modelo não disponível');
        return dispatch(showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "ID da escala modelo não disponível"
        }));
      }

      const action = await dispatch(deleteModelScale(actualModelScaleInfo.id));

      if (deleteModelScale.fulfilled.match(action)) {
        dispatch(showAlert({
          placement: "bottomEnd",
          type: "success",
          title: "Escala modelo excluída com sucesso"
        }));
      } else if (deleteModelScale.rejected.match(action)) {
        dispatch(showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "Erro ao excluir escala modelo"
        }));
      }
    } catch (error) {
      console.error(error);
      dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "Falha ao excluir escala modelo"
      }));
    }
  }

  // useEffect(() => {
  //     if (modelScales.length > 0) {
  //         const formattedData = modelScales.map(scale => ({
  //             label: scale.name,
  //             value: scale.name
  //         }));
  //         dispatch(setSelectedmodelScale(formattedData[0])); 
  //     }
  // }, [modelScales, dispatch]);

  const handlemodelScaleChange = (value: any) => {
    if (value) {
      const selectedOption = modelScales.find(scale => scale.name === value);
      if (selectedOption) {
        dispatch(setSelectedmodelScale({
          label: selectedOption.name,
          value: selectedOption.name
        }));
      }
    } else {
      dispatch(clearSelectedmodelScale());
    }
  };

  return (
    <div>
      <div className="flex-row">
        <SelectPicker
          onChange={handlemodelScaleChange}
          className="mr-10"
          data={modelScales.map(scale => ({
            label: scale.name,
            value: scale.name
          }))} searchable={true}
          style={{ width: 224 }}
          placeholder="Escolha uma escala"
        />
        <button onClick={() => { setModalIsOpen(true); }} className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>
          Criar Escala
        </button>

        {
          actualModelScaleInfo ?
            <>
              <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>
                Limpar Modelo
              </button>

              <button onClick={excludeModelScale} className='border-2 rounded-lg w-44 h-10 bg-[#8a133f] hover:bg-[#cd497b] text-white m-3' type='submit'>
                Excluir Escala
              </button>
            </>
            : null
        }
        {/* <button
                    onClick={() => { setModalIsOpen(true) }}
                    className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Salvar Alterações</button> */}

        <CreateScaleModal setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
      </div>
    </div>
  );
}
