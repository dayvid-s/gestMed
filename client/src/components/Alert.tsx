import { hideAlert } from "@/features/alertSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect } from "react";
import { BiError } from "react-icons/bi";
import { FiInfo } from "react-icons/fi";
import { SlCheck } from "react-icons/sl";
import { useDispatch } from "react-redux";
import { Notification, useToaster } from "rsuite";

export function Alert() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type, title, placement } = useAppSelector((state) => state.alert);
  const toaster = useToaster();

  useEffect(() => {
    if (isOpen) {
      handlePush();

      setTimeout(() => {
        dispatch(hideAlert());
      }, 5000);
    }
  }, [isOpen]);

  const handleClear = () => {
    dispatch(hideAlert());
    toaster.clear();
  };

  const message = (
    <Notification
      style={{
        borderRadius: "6px",
        height: "auto",
        width: "auto",
        borderLeft: `6px solid ${type === "success" ? "#2b8c8c" : type === "info" ? "rgb(75 85 99)" : type === "error" ? "rgb(185 28 28)" : "black"}`,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center"
      }}
      closable
    >
      <div className="flex flex-row items-center gap-x-3">
        {type === "success" ? (
          <SlCheck style={{ width: "30px", height: "30px" }} className="text-cyan-700" />
        ) : type === "error" ? (
          <BiError style={{ width: "30px", height: "30px" }} className="text-red-700" />
        ) : type === "info" ? (
          <FiInfo style={{ width: "30px", height: "30px" }} className="text-gray-600" />
        ) : null}
        <p className="font-medium">{title}</p>
      </div>
    </Notification>
  );

  const handlePush = () => {
    toaster.push(message, { placement });
  };

  return null;
}