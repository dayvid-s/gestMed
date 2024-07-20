import { hideAlert } from "@/features/alertSlice";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/utils/useSelectorHook";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonToolbar, Notification, useToaster } from "rsuite";




export function Alert() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type, placement } = useAppSelector((state) => state.alert);
  const toaster = useToaster();

  const message = (
    <Notification type={type} header={`${type}!`} closable>
      <p>You have a {type} message, please check it.</p>
      <hr />
      <ButtonToolbar>
        <Button appearance="primary">Ok</Button>
        <Button appearance="default">Cancel</Button>
      </ButtonToolbar>
    </Notification>
  );

  useEffect(() => {
    console.log("chamou");
    handlePush();
  }, [isOpen]);


  const handlePush = () => {
    console.log("entrou na ");
    // if (message && type) {
    console.log("veio aq");
    toaster.push(message, { placement });


    // }
  };

  const handleClear = () => {
    dispatch(hideAlert());
  };





  return (
    <div>
      {message}

      <ButtonToolbar>

        <Button onClick={() => toaster.push(message, { placement })} appearance="primary">
          Push
        </Button>
        <Button onClick={handlePush} appearance="primary">Push</Button>
        <Button onClick={handleClear}>Clear</Button>
      </ButtonToolbar>
      {isOpen && (
        <div className={`notification ${type} ${placement}`}>
          <p>{message}</p>
          <button onClick={() => dispatch(hideAlert())}>Close</button>
        </div>
      )}
    </div>
  );
}
