import { Button, Modal } from 'rsuite';
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { axiosClient } from '../services/axiosClient';
import { CreateScaleForm } from './CreateScaleForm';
import { ScaleData, QuantityOfDaysTypes } from '@/@types/scaleTypes';

export interface ImodalProps {
    modalIsOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateScaleModal({ modalIsOpen, setIsOpen }: ImodalProps) {
    const handleClose = () => setIsOpen(false);
    const [scaleData, setScaleData] = useState<ScaleData>({
        name: '',
        isAutoFilled: false,
        quantityOfDays: 15
    });
    
    useEffect(() => {
        console.log(scaleData);
    }, [scaleData]);

    const handleIsAutoFilledChange = () => {
        setScaleData(prevData => ({
            ...prevData,
            isAutoFilled: !scaleData.isAutoFilled,
        }));
    };

    const handleWithChangeOfScaleType = (value: QuantityOfDaysTypes | null) => {
        if (value !== null) {
            setScaleData(prevData => ({
                ...prevData,
                quantityOfDays: value,
            }));
        }
    };

    async function handleSubmit() {
        try {
            const response = await axiosClient.post('/user', scaleData);

            if (response.status < 300) {
                console.log('Usuário criado com sucesso');
            } else {
                console.error('Falha ao criar usuário', response);
            }
        } catch (error) {
            console.error('Falha ao criar usuário', error);
        }

        handleClose();
    }

    return (
        <>
            <Modal className='z-10' backdrop={true} size="lg" open={modalIsOpen} onClose={handleClose}>
                <Modal.Header>
                    <h4 className='text-4xl'>Criar Escala</h4>
                </Modal.Header>
                <Modal.Body style={{ height: "80vh" }}>
                    <CreateScaleForm
                        handleIsAutoFilledChange={handleIsAutoFilledChange}
                        handleScaleType={handleWithChangeOfScaleType}
                        handleInputChange={setScaleData}
                        scaleData={scaleData}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="ghost">
                        Cancelar
                    </Button>
                    <Button className='bg-sky-600' onClick={handleSubmit} appearance="primary">
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
