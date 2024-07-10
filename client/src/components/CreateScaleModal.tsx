import { QuantityOfDaysTypes, ScaleData } from "@/@types/scaleTypes";

import { createModelScale, fetchAllModelScales } from "@/features/ModelScaleSlice";
import { AppDispatch } from "@/store";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Modal } from "rsuite";
import { CreateScaleForm } from "./CreateScaleForm";


export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function CreateScaleModal({ modalIsOpen, setIsOpen }: ImodalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => setIsOpen(false);
  const [scaleData, setScaleData] = useState<ScaleData>({
    name: "",
    quantityOfDays: null,
    isAutoFilled: false
  });

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
      await dispatch(createModelScale({
        name: scaleData.name,
        total_of_schedule_days: scaleData.quantityOfDays,
        is_auto_filled: scaleData.isAutoFilled
      }));

      handleClose();
      dispatch(fetchAllModelScales());
    } catch (error) {
      console.error("Falha ao criar escala", error);
    }
  }


  return (
    <>
      <Modal className='z-10' backdrop={true} size="md" open={modalIsOpen} onClose={handleClose}>
        <Modal.Header>
          <h4 className='text-4xl'>Criar Escala</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "20vh" }}>
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
