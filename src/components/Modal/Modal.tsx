import Dialog from '@reach/dialog';
import '@reach/dialog/styles.css';
import { IconX } from '@tabler/icons';
import React, { createContext, useContext, useState } from 'react';
import { Button } from '..';

interface ModalContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const useModalContext = (): ModalContextProps => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("There's no Modal Context provided");
  return context;
};

const ModalContext = createContext<ModalContextProps | null>(null);
export const ModalWrapper: React.FC = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

interface ContentProps {
  title: string;
}
const Content: React.FC<ContentProps> = ({ title, children }) => {
  const { isOpen, setIsOpen } = useModalContext();
  return (
    <Dialog
      className="w-screen max-w-screen-sm"
      style={{ width: 'auto' }}
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
      aria-label="Modal Content"
    >
      <div className="flex justify-between">
        <h1>{title}</h1>
        <Button onClick={() => setIsOpen(false)} className="p-1">
          <IconX />
        </Button>
      </div>
      <hr className="my-4" />
      {children}
    </Dialog>
  );
};

const OpenButton: React.FC = ({ children }) => {
  const { setIsOpen } = useModalContext();
  return <div onClick={() => setIsOpen(true)}>{children}</div>;
};

const DismissButton: React.FC = ({ children }) => {
  const { setIsOpen } = useModalContext();
  return <Button onClick={() => setIsOpen(false)}>{children}</Button>;
};

export const Modal = {
  ModalWrapper,
  DismissButton,
  OpenButton,
  Content,
};
