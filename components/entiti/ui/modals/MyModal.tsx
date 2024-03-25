import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
import { ReactNode } from 'react'

  interface Props{
    title: string
    buttonText?: string
    size?: "xs" | "md"
    children: ReactNode
  }
                                                 //size valor por defecto "md"
  const MyModal =({ title, children, buttonText, size="md"}: Props)=>{
    const { isOpen, onOpen, onClose,  } = useDisclosure()
    return(
        <>
        <Button size={size} colorScheme='green' onClick={onOpen}>
            {buttonText || title}
        </Button>
          
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default MyModal