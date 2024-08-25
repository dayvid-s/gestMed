import { MainScaleDuty } from "@/@types/MainScaleDutyTypes";
import { ScaleDutyType } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { changeShift, deleteMainScaleDuty, removeDoctorFromDuty, updateMainScaleDuty } from "@/features/MainScaleDutySlice";
import { showAlert } from "@/features/alertSlice";
import { AppDispatch } from "@/store";
import { Manrope } from "next/font/google";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "rsuite";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { AddOneDoctorToDuty } from "./ListToAddOneDoctorToDuty";
import { PreviewOfDoctor } from "./PreviewOfDoctor";
import { SearchForDoctor } from "./SearchForDoctor";

const manrope = Manrope({ subsets: ["latin"] });

export interface ImodalProps {
  modalIsOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mainScaleDutyInfo: ScaleDutyType | null;
  setMainScaleDutyInfo: Dispatch<SetStateAction<MainScaleDuty | null>>;
  fetchDuties: () => Promise<void>;
}

export function ModalToEditDutyOfMainScale({ modalIsOpen, setIsOpen, mainScaleDutyInfo, setMainScaleDutyInfo, fetchDuties }: ImodalProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [doctors, setDoctors] = useState<UserDataWithSelected[]>([]);
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
  });
  const [dialogType, setDialogType] = useState<"Create" | "Delete" | "Update">("Delete");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [dialogOnConfirm, setDialogOnConfirm] = useState<() => void>(() => { });

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

    const action = await dispatch(deleteMainScaleDuty(mainScaleDutyInfo.id));
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

  async function removeDoctor() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "ID do plantão não disponível",
      }));
    }

    const action = await dispatch(removeDoctorFromDuty(mainScaleDutyInfo.id));
    const alertType: "success" | "error" = removeDoctorFromDuty.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(showAlert({
      placement: "bottomEnd",
      type: alertType,
      title: alertType === "success"
        ? "Médico removido com sucesso"
        : "Erro ao remover médico do plantão",
    }));

    await fetchDuties();
    setIsOpen(false);
    setDialogOpen(false);
  }

  async function handleChangeShift() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "ID do plantão não disponível",
      }));
    }

    const action = await dispatch(changeShift(mainScaleDutyInfo.id));
    const alertType: "success" | "error" = changeShift.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(showAlert({
      placement: "bottomEnd",
      type: alertType,
      title: alertType === "success"
        ? "Turno alterado com sucesso"
        : "Erro ao alterar turno",
    }));

    await fetchDuties();
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


  async function updateDoctorOfDuty() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "ID do plantão não disponível",
      }));
    }

    const selectedDoctor = doctors.find(doctor => doctor.selected);

    if (!selectedDoctor) {
      console.error("Nenhum médico selecionado");
      return dispatch(showAlert({
        placement: "bottomEnd",
        type: "error",
        title: "Nenhum médico selecionado",
      }));
    }

    const mainScaleDutyInfoUpdated: ScaleDutyType = {
      ...mainScaleDutyInfo,
      user: selectedDoctor,
      updated_at: new Date(),
    };

    const action = await dispatch(updateMainScaleDuty(mainScaleDutyInfoUpdated));

    const alertType: "success" | "error" = updateMainScaleDuty.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(showAlert({
      placement: "bottomEnd",
      type: alertType,
      title: alertType === "success"
        ? "Médico alterado com sucesso"
        : "Erro ao alterar médico do plantão",
    }));

    if (alertType === "success") {
      setMainScaleDutyInfo(mainScaleDutyInfoUpdated);
    }

    await fetchDuties();
    setDialogOpen(false);
  }

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
        <Modal.Body style={{ height: "80vh", padding: "10px" }}>
          {mainScaleDutyInfo?.user ? (
            <PreviewOfDoctor shift={mainScaleDutyInfo?.shift} user={mainScaleDutyInfo?.user} />
          ) : (
            <>
              <SearchForDoctor queryInfo={queryInfo} setQueryInfo={setQueryInfo} />
              <AddOneDoctorToDuty doctors={doctors} setDoctors={setDoctors} />
            </>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end">

          {mainScaleDutyInfo?.user &&
            <button
              className='border-2 mr-5 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] text-white'
              type='button'
              onClick={() => {
                setIsOpen(false)
                handleOpenDialog(
                  "Delete",
                  "Remover Médico",
                  "Você tem certeza que deseja remover o médico deste plantão?",
                  removeDoctor
                )
              }}
            >
              Remover Médico
            </button>}
          <button
            onClick={() => {
              setIsOpen(false)
              handleOpenDialog(
                "Delete",
                "Excluir plantão",
                "Você tem certeza que deseja excluir esse plantão?",
                excludeMainScaleDuty
              )
            }}
            className='border-2 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] mr-5 text-white'
            type='button'
          >
            Excluir Plantão
          </button>
          <button
            className="mr-5 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
            type="button"
            onClick={() => {
              setIsOpen(false)
              handleOpenDialog(
                "Update",
                "Mudar Turno",
                "Você tem certeza que deseja mudar o turno desse plantão?",
                handleChangeShift
              )
            }}
          >
            Mudar Turno
          </button>
          {!mainScaleDutyInfo?.user &&
            <button
              className="mr-10 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
              type="button"
              onClick={updateDoctorOfDuty}
            >
              {mainScaleDutyInfo?.user ?
                "Mudar Médico" : "Adicionar Médico"
              }
            </button>}
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