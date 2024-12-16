'use client'

import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@nextui-org/react";
import { GearSix } from "@phosphor-icons/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

const MaintenanceModal = () => {
    const [isOpen, setIsOpen] = useState(false);


    const handleClose = () => {
        Cookies.set("maintenance_modal_closed", "true", { expires: 1 });
        setIsOpen(false);
    };


    useEffect(() => {
        const isClosed = Cookies.get("maintenance_modal_closed");
        if (!isClosed) {
            setIsOpen(true);
        }
    }, []);

    return (
        <Modal isOpen={isOpen} backdrop="blur" onClose={handleClose} isDismissable={false} className="text-black">
            <ModalContent>
                <>
                    <ModalHeader className="flex flex-row items-center gap-1 ">
                        <GearSix size={24} />
                        Development Notice!
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            We are currently working hard to bring you an improved experience. This website is still under development, and some features may not be available yet. Thank you for your patience and support!
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleClose}>
                            Got it!
                        </Button>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
};

export default MaintenanceModal;
