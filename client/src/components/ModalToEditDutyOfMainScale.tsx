import { ModelScaleDuty } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { AppDispatch } from "@/store";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
import { PreviewOfDoctor } from "./PreviewOfDoctor";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mainScaleDutyInfo: ModelScaleDuty
}

export function ModalToEditDutyOfMainScale({ modalIsOpen, setIsOpen, mainScaleDutyInfo }: ImodalProps) {

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
          <h4 className="text-4xl font-semibold">Editar Plantão</h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", overflowX: "hidden" }}>



          {/* <Form>
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
          {/* </div>
          </Form> */}



          {/* <ListToAddUserInScale
            users={users}
            setUsers={setUsers}
            loading={loading}
            error={error}
          /> */}


          <PreviewOfDoctor shift={mainScaleDutyInfo.shift} user={mainScaleDutyInfo?.user} />
        </Modal.Body>
        <Modal.Footer className="flex justify-end " >

          <button className='border-2 mr-5 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] text-white ' type='submit'>
            Remover Médico
          </button>

          <button className='border-2 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] mr-5 text-white ' type='submit'>
            Excluir Plantão
          </button>

          <button
            className="  mr-5 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Mudar Turno
          </button>

          <button
            className="  mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Mudar Médico
          </button>


        </Modal.Footer>
      </Modal>
    </div>
  );
}
