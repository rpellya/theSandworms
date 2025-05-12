import React, { memo } from 'react';
import { Button } from 'components/Button';
import ReactDOM from 'react-dom';
import cls from './Modal.module.scss';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = memo(
    ({ isOpen, onClose, title, children }) => {
        if (!isOpen) return null;

        return ReactDOM.createPortal(
            <div className={cls.modalBackdrop} onClick={onClose}>
                <div
                    className={cls.modalContent}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={cls.modalHeader}>
                        <h2>{title}</h2>
                        <Button className={cls.closeButton} onClick={onClose}>
                            X
                        </Button>
                    </div>
                    <div className={cls.modalBody}>{children}</div>
                </div>
            </div>,
            document.body,
        );
    },
);
