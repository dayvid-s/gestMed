import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { CreateScaleModal } from "./CreateScaleModal";

import { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/utils/useSelectorHook";
import { fetchAllScaleModels } from "@/features/scaleModelSlice";

export function ChoiceScale() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState<{ label: string; value: string }[]>([]);
    const dispatch = useDispatch<AppDispatch>();

    const scaleModels = useAppSelector((state) => state.scaleModel.scaleModels);
    const loading = useAppSelector((state) => state.scaleModel.loading);
    const error = useAppSelector((state) => state.scaleModel.error);

    useEffect(() => {
        dispatch(fetchAllScaleModels());
    }, [dispatch]);

    useEffect(() => {
        if (scaleModels.length > 0) {
            const formattedData = scaleModels.map(scale => ({
                label: scale.name,
                value: scale.name
            }));
            setData(formattedData);
        }
    }, [scaleModels]);

    return (
        <div>
            <div className="flex-row">
                <SelectPicker
                    className="mr-10"
                    data={data}
                    searchable={true}
                    style={{ width: 224 }}
                    placeholder="Escolha uma escala"
                />

                <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>
                    Baixar Escala
                </button>

                <button className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>
                    Limpar Modelo
                </button>

                <button onClick={() => { setModalIsOpen(true) }} className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>
                    Criar Escala
                </button>
                {/* <button
                    onClick={() => { setModalIsOpen(true) }}
                    className='border-2 rounded-lg w-44 h-10 bg-[#025959] hover:bg-[#078b8b] text-white m-3' type='submit'>Salvar Alterações</button> */}

                <CreateScaleModal setIsOpen={setModalIsOpen} modalIsOpen={modalIsOpen} />
            </div>
        </div>
    );
}
