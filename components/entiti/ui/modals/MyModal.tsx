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
import { Sizes } from 'schema/UiSchemas'

  interface Props{
    title: string
    buttonText?: string
    size?: Sizes
    children: ReactNode   
    colorSchema?: string
    mr?: number
    disabledButton?: boolean
  }
                                                 //size valor por defecto "md"
  const MyModal =({ title, children, buttonText, size="md", colorSchema="blue", mr=0, disabledButton}: Props)=>{
    const { isOpen, onOpen, onClose,  } = useDisclosure()
    return(
        <>
        <Button 
          size={size} 
          colorScheme={colorSchema} 
          onClick={onOpen} 
          mr={mr} 
          isDisabled={disabledButton}
        >
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