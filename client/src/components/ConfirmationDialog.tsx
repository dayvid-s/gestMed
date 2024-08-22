import { Button, Modal } from 'rsuite';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  type: 'Create' | 'Delete' | 'Update';
}

export function ConfirmationDialog({
  isOpen,
  title,
  description,
  onConfirm,
  onCancel,
  type,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  return (
    <Modal backdrop={true} className="z-50" open={isOpen} onClose={onCancel}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button className='bg-gray-300' onClick={onCancel} appearance="subtle">
          Cancelar
        </Button>
        <Button
          className={type === 'Create' ? "bg-green500 hover:bg-green-400" : type === 'Delete' ? "bg-red-700 hover:bg-red-500" : "bg-green500 hover:bg-green-300"}
          onClick={onConfirm}
          appearance="primary"
        >
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};