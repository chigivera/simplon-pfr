"use client"
import  { createContext, ReactNode, useState } from 'react';
import { Modal } from 'antd';

interface ModalContextValue {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

export const ModalContext = createContext<ModalContextValue | undefined>(undefined);

const ModalProvider = ({ children }:{children:ReactNode}) => {
  const [visible, setVisible] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal
        visible={visible}
        onCancel={hideModal}
        footer={null}
        destroyOnClose
      >
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export default ModalProvider;