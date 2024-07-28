import { closeModal } from '@/features/ModalOfConfirmationSlice';
import { useAppSelector } from '@/utils/useSelectorHook';
import { useDispatch } from 'react-redux';
import { Button, Modal } from 'rsuite';

export function ModalOfConfirmation() {
  const dispatch = useDispatch();
  const { isOpen, title, message, onConfirm, type } = useAppSelector((state) => state.modalConfirmation);

  const handleConfirm = () => {
    onConfirm();
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
  };

  return (
    <Modal open={isOpen} onClose={handleCancel}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button className='bg-gray-300' onClick={handleCancel} appearance="subtle">
          Cancelar
        </Button>
        <Button
          className={type === 'Create' ? "bg-green500" : type === 'Delete' ? "bg-red-700" : "bg-green500"}
          onClick={handleConfirm}
          appearance="primary"
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}