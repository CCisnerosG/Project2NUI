import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './modal.scss'

const ModalNUI = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 modal__header">CHECKOUT COMPLETED</ModalHeader>
                <ModalBody>
                    <p className="modal__title">THANKS FOR YOUR PURCHASE</p>
                    <img src="https://cdn.dribbble.com/users/470545/screenshots/2842684/media/c416e1258f8df954fee4610ab5d1e53a.gif" alt="Pikachu happy" />
                    <p className="modal__content">
                        Your order should be arriving in the next 24-48 working hours
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Link to={'/'}>
                        <Button color="primary" onPress={onClose}>
                            Close
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ModalNUI;
