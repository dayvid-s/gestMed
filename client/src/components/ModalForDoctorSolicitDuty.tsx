import { AppDispatch } from "@/store";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<{
    modalToAddUserInDuty: boolean;
    ModalForDoctorSolicitDuty: boolean
  }>>;
  shift_id: number | null;
  scale_date: number | null;
  month: number
  year: number
}

export function ModalForDoctorSolicitDuty({ modalIsOpen, setIsOpen, scale_date, shift_id, month, year }: ImodalProps) {

  const handleClose = () => {
    setIsOpen((prev) => ({ ...prev, ModalForDoctorSolicitDuty: false }));
  };
  const dispatch = useDispatch<AppDispatch>();



  return (
    <div className={manrope.className}>
      <Modal
        className={manrope.className}
        backdrop={true}

        size="md"
        open={modalIsOpen}
        onClose={handleClose}
      >
        <Modal.Header style={{ borderBottom: "2px solid #eaeaea", paddingBottom: "10px" }} >
          <h4 className="text-4xl font-semibold">Participar de plantão</h4>
        </Modal.Header>
        <Modal.Body className="flex mt-5 flex-col" >
          <p className="font-medium">
            Deseja participar do plantão
            <span className="font-bold">
              {shift_id === 1 ? " diurno" : " noturno"}
            </span>
            , no dia{" "}
            <span className="font-bold">
              ({String(scale_date).padStart(2, '0')}/{String(month).padStart(2, '0')}/{year})
            </span>?
            Caso sim, sua solicitação será encaminhada ao coordenador para aprovação.
          </p>
        </Modal.Body>
        <Modal.Footer className="flex flex-row items-end justify-end">
          <button
            className="flex items-center justify-center  ml-0 md:ml-auto mr-10 min-w-28 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={handleClose}
          >
            Cancelar
          </button>

          <button
            className="flex items-center justify-center  ml-4 mr-10 min-w-28 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
          >
            Solicitar
          </button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}
