import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import './modal.scss'

interface SignUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isDismissable={false} isKeyboardDismissDisabled={true} className="modal">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 modal__header">SIGN UP SUCCESSFUL!</ModalHeader>
                <ModalBody>
                    <p className="modal__title">THANKS FOR BEING PART OF OUR TEAM!</p>
                    <img src="https://gifdb.com/images/high/my-neighbor-gengar-a57iyjj62ruv00m4.webp" alt="Gengar standing in the rain" />
                    <p className="modal__content">
                        You can now go and Log In!
                    </p>
                </ModalBody>
                <ModalFooter>
                    <Link to={'/Login'}>
                        <Button color="primary" onPress={onClose}>
                            Close
                        </Button>
                    </Link>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default SignUpModal;
