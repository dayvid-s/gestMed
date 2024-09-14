import { MainScaleDuty } from "@/@types/MainScaleDutyTypes";
import { ScaleDutyType } from "@/@types/ModelScaleDutyTypes";
import { UserDataWithSelected } from "@/@types/userTypes";
import { changeShift, removeDoctorFromDuty } from "@/features/MainScaleDutySlice";
import { showAlert } from "@/features/alertSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
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
  closeModal: () => void;
  mainScaleDutyInfo: ScaleDutyType | null;
  setMainScaleDutyInfo: Dispatch<SetStateAction<MainScaleDuty | null>>;
  fetchDuties: () => Promise<void>;
}

export function ModalForDoctorVisualizeDuty({
  modalIsOpen,
  closeModal,
  mainScaleDutyInfo,
  setMainScaleDutyInfo,
  fetchDuties,
}: ImodalProps) {
  const user = useAppSelector((state) => state.auth.user);
  const [doctors, setDoctors] = useState<UserDataWithSelected[]>([]);
  const [queryInfo, setQueryInfo] = useState({
    name: "",
    especiality: "",
  });

  const [dialog, setDialog] = useState({
    isOpen: false,
    type: "Delete" as "Create" | "Delete" | "Update",
    title: "",
    description: "",
    onConfirm: () => { },
  });

  const dispatch = useDispatch<AppDispatch>();

  async function removeDoctor() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(
        showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "ID do plantão não disponível",
        })
      );
    }

    const action = await dispatch(removeDoctorFromDuty(mainScaleDutyInfo.id));
    const alertType: "success" | "error" = removeDoctorFromDuty.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(
      showAlert({
        placement: "bottomEnd",
        type: alertType,
        title:
          alertType === "success"
            ? "Médico removido com sucesso"
            : "Erro ao remover médico do plantão",
      })
    );

    await fetchDuties();
    closeModal();
    setDialog((prev) => ({ ...prev, isOpen: false }));
  }

  async function handleChangeShift() {
    if (!mainScaleDutyInfo?.id) {
      console.error("ID do plantão não disponível");
      return dispatch(
        showAlert({
          placement: "bottomEnd",
          type: "error",
          title: "ID do plantão não disponível",
        })
      );
    }

    const action = await dispatch(changeShift(mainScaleDutyInfo.id));
    const alertType: "success" | "error" = changeShift.fulfilled.match(action)
      ? "success"
      : "error";

    dispatch(
      showAlert({
        placement: "bottomEnd",
        type: alertType,
        title:
          alertType === "success"
            ? "Turno alterado com sucesso"
            : "Erro ao alterar turno",
      })
    );

    await fetchDuties();
    closeModal();
    setDialog((prev) => ({ ...prev, isOpen: false }));
  }

  const handleOpenDialog = (
    type: "Create" | "Delete" | "Update",
    title: string,
    description: string,
    onConfirm: () => void
  ) => {
    setDialog({
      isOpen: true,
      type,
      title,
      description,
      onConfirm,
    });
  };

  return (
    <div className={manrope.className}>
      <Modal
        className={manrope.className}
        backdrop={true}
        size="lg"
        open={modalIsOpen}
        onClose={closeModal}
      >
        <Modal.Header>
          <h4 className="text-4xl font-semibold">
            {user?.id === mainScaleDutyInfo?.user?.id
              ? "Visualizar seu Plantão"
              : "Vizualizar Plantão"}
          </h4>
        </Modal.Header>
        <Modal.Body style={{ height: "80vh", padding: "10px" }}>
          {mainScaleDutyInfo?.user ? (
            <PreviewOfDoctor
              shift={mainScaleDutyInfo?.shift}
              user={mainScaleDutyInfo?.user}
            />
          ) : (
            <>
              <SearchForDoctor
                queryInfo={queryInfo}
                setQueryInfo={setQueryInfo}
              />
              <AddOneDoctorToDuty
                doctors={doctors}
                setDoctors={setDoctors}
              />
            </>
          )}
        </Modal.Body>
        {user?.id === mainScaleDutyInfo?.user?.id && (
          <Modal.Footer className="flex justify-end">
            {mainScaleDutyInfo?.user && (
              <button
                className="border-2 mr-5 rounded-lg w-44 h-12 bg-[#8a133f] hover:bg-[#cd497b] text-white"
                type="button"
                onClick={() => {
                  closeModal();
                  handleOpenDialog(
                    "Delete",
                    "Abandonar plantão",
                    "Você tem certeza que deseja abandonar este plantão?",
                    removeDoctor
                  );
                }}
              >
                Abandonar Plantão
              </button>
            )}
            {user?.shift?.name === "SD/SN" && (
              <button
                className="mr-5 min-w-40 border-2 rounded-lg p-3 w-auto h-12 bg-green500 hover:bg-[#39cb76] text-white"
                type="button"
                onClick={() => {
                  closeModal();
                  handleOpenDialog(
                    "Update",
                    "Mudar Turno",
                    "Você tem certeza que deseja mudar o turno desse plantão?",
                    handleChangeShift
                  );
                }}
              >
                Mudar Turno do Plantão
              </button>
            )}
          </Modal.Footer>
        )}
      </Modal>

      <ConfirmationDialog
        type={dialog.type}
        isOpen={dialog.isOpen}
        title={dialog.title}
        description={dialog.description}
        onConfirm={dialog.onConfirm}
        onCancel={() => setDialog((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}