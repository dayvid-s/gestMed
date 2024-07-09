import { fetchShifts } from "@/features/shiftSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal, SelectPicker } from "rsuite";
import { ListToAddUserInScale } from "./ListToAddUserInScale";
const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function AddUsersToScaleModal({ modalIsOpen, setIsOpen }: ImodalProps) {
  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch<AppDispatch>();

  const shifts = useAppSelector((state) => state.shift.shifts);

  useEffect(() => {
    dispatch(fetchShifts());
  }, []);



  const shiftOptions = shifts?.map(shift => ({
    id: shift.id,
    shiftName: shift.name,
    start_time: shift.start_time,
    end_time: shift.end_time,
    label: shift.name,
    value: shift,
  }));

  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    especiality: "",
    quantityOfDays: "null",
  });

  const handleInputChange = (name: string, value: string) => {
    setDoctorInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  return (
    <div className={manrope.className}  >
      <Modal className={manrope.className}
        backdrop={true} size="lg" open={modalIsOpen} onClose={handleClose}>


        <Modal.Header>
          <h4 className='text-4xl font-semibold'>Adicionar Médicos na Escala</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh" }}>


          <Form>
            <div className='flex flex-col sm:flex-row flex-wrap gap-y-3.5 justify-between items-center'>
              <Form.Group controlId="name">
                <Form.ControlLabel className='font-medium' >Nome do Médico</Form.ControlLabel>
                <Form.Control name="name" value={doctorInfo.name} />
              </Form.Group>


              <Form.Group>
                <Form.ControlLabel className='font-medium'  >Especialidade</Form.ControlLabel>

                <Form.Control name="speciality" value={doctorInfo.especiality} />
              </Form.Group>



              <Form.Group>

                <Form.ControlLabel className='font-medium'  >Turno</Form.ControlLabel>
                <SelectPicker
                  searchable={false}
                  // value={doctorInfo.quantityOfDays}
                  name="quantityOfDays"
                  // onChange={handleScaleType}
                  data={shiftOptions}
                />
              </Form.Group>
              <Form.Group>
                {/* <Checkbox
                                    checked={doctorInfo.isAutoFilled}
                                    onChange={handleIsAutoFilledChange}>
                                    Preencher Automaticamente
                                </Checkbox> */}
              </Form.Group>
            </div>
          </Form>

          <ListToAddUserInScale />


        </Modal.Body>
        <Modal.Footer>
          <button
            className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white'
            type="button"
          >
            Redefinir
          </button>
          <button
            className='ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white'
            type="button"
          >
            Adicionar Médicos
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
