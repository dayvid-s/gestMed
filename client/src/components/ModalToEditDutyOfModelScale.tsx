import { ModelScaleDuty } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { AppDispatch } from "@/store";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Modal } from "rsuite";
import { ListToAddUserInScale } from "./ListToAddUserInScale";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modelScaleDutyInfo: ModelScaleDuty
}

export function ModalToEditDutyOfModelScale({ modalIsOpen, setIsOpen }: ImodalProps) {

  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
    quantityOfDays: "null",
  });

  const handleClose = () => setIsOpen(false);
  const dispatch = useDispatch<AppDispatch>();


  const [users, setUsers] = useState<UserDataWithSelected[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  return (
    <div className={manrope.className}>
      <Modal
        className={manrope.className}
        backdrop={true}
        size="lg"
        open={modalIsOpen}
        onClose={handleClose}
      >
        <Modal.Header>
          <h4 className="text-4xl font-semibold">Editar Plantão Na Escala Modelo</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", overflowX: "hidden" }}>
          <Form>
            <div className="flex flex-col sm:flex-row flex-wrap items-baseline ml-2">
              <Form.Group controlId="name">
                <Form.ControlLabel className="font-medium ">
                  Nome do Médico
                </Form.ControlLabel>
                <Form.Control
                  name="name"
                  value={queryInfo.name}
                // onChange={(value) => handleInputChange("name", value)}
                />
              </Form.Group>
              <Form.Group className="ml-10" >
                <Form.ControlLabel className=" mlfont-medium">
                  Especialidade
                </Form.ControlLabel>
                <Form.Control
                  name="speciality"
                  value={queryInfo.especiality}
                // onChange={(value) => handleInputChange("especiality", value)}
                />
              </Form.Group>
              {/* <Checkbox
                                    checked={doctorInfo.isAutoFilled}
                                    onChange={handleIsAutoFilledChange}>
                                    Preencher Automaticamente
                                </Checkbox> */}
            </div>
          </Form>
          <ListToAddUserInScale
            users={users}
            setUsers={setUsers}
            loading={loading}
            error={error}
          />
        </Modal.Body>
        <Modal.Footer className="flex" >


          <button
            className="ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Redefinir
          </button>
          <button
            className=" flex flex-row ml-0 md:ml-auto mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
          // onClick={handleWithcreateScaleModelDuty}
          >
            <div className="w-6 bg-white rounded-xl mr-1">
              <p className="text-black font-semibold">0</p>
            </div>
            Adicionar Médicos
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
