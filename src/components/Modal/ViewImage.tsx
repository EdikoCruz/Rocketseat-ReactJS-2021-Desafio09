import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    // TODO MODAL WITH IMAGE AND EXTERNAL LINK
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="">
      <ModalOverlay />
      <ModalContent borderRadius="20px" width="fit-content">
        <ModalBody p="0" w="fit-content" h="fit-content">
          <Image
            borderTopRadius="10px"
            src={imgUrl}
            maxW={{
              base: '300px',
              md: '600px',
              lg: '900px',
            }}
            maxH={{
              base: '200px',
              md: '400px',
              lg: '600px',
            }}
          />
        </ModalBody>
        <ModalFooter bg="pGray.800" p={1} borderBottomRadius="10px">
          <Link href={imgUrl} fontSize="1rem" mr="auto" isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
