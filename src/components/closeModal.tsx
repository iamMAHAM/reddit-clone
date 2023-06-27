import { FC } from 'react';
import { Button } from './ui/Button';
import { X } from 'lucide-react';

interface closeModalProps {}

const closeModal: FC<closeModalProps> = ({}) => {
  return (
    <Button
      aria-label="close modal"
      variant="subtle"
      className="h-6 w-6 rounded-r-md"
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default closeModal;
