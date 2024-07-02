import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { CreateScaleModal } from "./CreateScaleModal";

import { useDispatch } from "react-redux";
import { useAppSelector } from "@/utils/useSelectorHook";
import { fetchAllScaleModels } from "@/features/scaleModelSlice";

import {  clearSelectedScaleModel, setSelectedScaleModel } from "@/features/ScaleModelOptionSlice";
import { AppDispatch } from "@/store";
export function ChoiceScale() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
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
            dispatch(setSelectedScaleModel(formattedData[0])); 
        }
    }, [scaleModels, dispatch]);
    
    const handleScaleModelChange = (value: any) => {
        if (value) {
            const selectedOption = scaleModels.find(scale => scale.name === value);
            if (selectedOption) {
                dispatch(setSelectedScaleModel({
                    label: selectedOption.name,
                    value: selectedOption.name
                }));
            }
        } else {
            dispatch(clearSelectedScaleModel());
        }
    };

    return (
        <div>
            <div className="flex-row">
                <SelectPicker
                    onChange={handleScaleModelChange}
                    className="mr-10"
                    data={scaleModels.map(scale => ({
                        label: scale.name,
                        value: scale.name
                    }))}                    searchable={true}
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
