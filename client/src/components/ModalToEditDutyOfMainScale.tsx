import { ModelScaleDuty } from "@/@types/ModelScaleDutyTypes";
import { deleteMainScaleDuty } from "@/features/MainScaleDutySlice";
import { showAlert } from "@/features/alertSlice";
import { AppDispatch } from "@/store";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { PreviewOfDoctor } from "./PreviewOfDoctor";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mainScaleDutyInfo: ModelScaleDuty | null;
  fetchDuties: () => Promise<void>;
}

export function ModalToEditDutyOfMainScale({ modalIsOpen, setIsOpen, mainScaleDutyInfo, fetchDuties }: ImodalProps) {
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
    quantityOfDays: "null",
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"Create" | "Delete" | "Update">("Delete");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState(""); const [dialogOnConfirm, setDialogOnConfirm] = useState<() => void>(() => { });

  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => setIsOpen(false);

  async function excludeMainScaleDuty() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "ID do plantão não disponível",
      }));
    }

    const action = await dispatch(deleteMainScaleDuty(mainScaleDutyInfo?.id != undefined ? mainScaleDutyInfo.id : 0));
    const alertType: "success" | "error" = deleteMainScaleDuty.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(showAlert({
      placement: "bottomEnd",
      type: alertType,
      title: alertType === "success"
        ? "Plantão excluído com sucesso"
        : "Erro ao excluir plantão",
    }));
    fetchDuties();
    setIsOpen(false);
    setDialogOpen(false);
  }

  const handleOpenDialog = (type: "Create" | "Delete" | "Update", title: string, description: string, onConfirm: () => void) => {
    setDialogType(type);
    setDialogTitle(title);
    setDialogDescription(description);
    setDialogOnConfirm(() => onConfirm);
    setDialogOpen(true);
  };

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
          {mainScaleDutyInfo && (
            <PreviewOfDoctor shift={mainScaleDutyInfo.shift} user={mainScaleDutyInfo.user} />
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <button className='border-2 mr-5 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] text-white' type='button'>
            Remover Médico
          </button>
          <button
            onClick={() => {
              setIsOpen(false);
              handleOpenDialog("Delete", "Excluir plantão", "Você tem certeza que deseja excluir esse plantão?", excludeMainScaleDuty);
            }}
            className='border-2 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] mr-5 text-white'
            type='button'
          >
            Excluir Plantão
          </button>
          <button
            className="mr-5 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Mudar Turno
          </button>
          <button
            className="mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => setQueryInfo({ name: "", especiality: "", quantityOfDays: "null" })}
          >
            Mudar Médico
          </button>
        </Modal.Footer>
      </Modal>

      <ConfirmationDialog
        type={dialogType}
        isOpen={isDialogOpen}
        title={dialogTitle}
        description={dialogDescription}
        onConfirm={dialogOnConfirm}
        onCancel={() => setDialogOpen(false)}
      />
    </div>
  );
}