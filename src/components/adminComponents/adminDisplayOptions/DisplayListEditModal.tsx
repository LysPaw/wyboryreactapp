import React from 'react';
import {
  Box,
  Button,
  ButtonProps,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiTrash } from 'react-icons/hi';
import { IData } from './DisplayList';
import { DisplayFormListModal } from './DisplayFormListModal';
import { DeleteUserMutationVariables, DeleteConstituencyMutationVariables } from '../../../generated/graphql';

type IProps = {
  isOpenEditModal: boolean;
  onCloseEditModal: () => void;
  data?: IData;
  onChangeDataMutation: any;
  onDeleteDataMutation: any;
  onAssignOperatorMutation: any;
  onClearAssignedOperatorMutation: any;
};

export const DisplayListEditModal: React.FC<IProps> = ({
  isOpenEditModal,
  onCloseEditModal,
  data,
  onDeleteDataMutation,
  ...props
}) => {
  const disclosure = useDisclosure();
  const { onOpen, onClose } = disclosure;
  let { isOpen } = disclosure;

  if (!data) return null;

  let dataTitle = 'Data';
  let initValues: any = {};
  if (data.typename === 'User') {
    dataTitle = 'Active User';
    initValues = {
      constituenciesIds: data.constituenciesIds,
      emailAdress: data.emailAdress,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      secondName: data.secondName,
    };
  } else if (data.typename === 'PreActivatedUser') {
    dataTitle = 'Preactived User';
    initValues = {
      activationCode: data.activationCode,
      emailAdress: data.emailAdress,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      secondName: data.secondName,
    };
  } else if (data.typename === 'Constituency') {
    dataTitle = `Constituency ID: ${data.id}`;
    initValues = {
      adress: data.adress,
      electorate: data.electorate,
      operatorId: data.operator,
    };
  }

  return (
    <Modal isOpen={isOpenEditModal} onClose={onCloseEditModal} motionPreset="slideInRight" scrollBehavior={'inside'}>
      <ModalOverlay />

      <ModalContent {...ModalStyle}>
        <ModalHeader>
          <Flex justifyContent="space-between">
            {dataTitle}
            <Flex
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={'0.375rem'}
              w={'32px'}
              h={'32px'}
              mr={'2rem'}
              mt={'-.5rem'}
              cursor={'pointer'}
              _hover={{ background: 'rgba(0, 0, 0, 0.06)' }}
              onClick={onOpen}>
              <Icon as={HiTrash} color="red.500" />
            </Flex>
          </Flex>
          <Box fontSize={'16px'}>{data.username}</Box>
        </ModalHeader>

        <ModalCloseButton {...noFocusStyle} />
        <ModalBody minH="400px">
          <DisplayFormListModal
            initValues={initValues}
            onClose={onCloseEditModal}
            username={data?.username}
            id={data.id}
            {...props}
          />
        </ModalBody>
      </ModalContent>
      <DisplayDeleteModal isOpen={isOpen} onClose={onClose} data={[data]} onDeleteDataMutation={onDeleteDataMutation} />
    </Modal>
  );
};

const ModalStyle: ModalContentProps = {
  position: 'absolute',
  right: { base: '0', md: '10vw' },
  borderRightRadius: '0',
  minW: { base: '300px', md: '500px' },
  minH: '500px',
};

type IDisplayDeleModal = { isOpen: boolean; onClose: () => void; data?: IData[]; onDeleteDataMutation: any };

export const DisplayDeleteModal: React.FC<IDisplayDeleModal> = ({ isOpen, onClose, data, onDeleteDataMutation }) => {
  if (!data) return null;
  let args: DeleteUserMutationVariables[] & DeleteConstituencyMutationVariables[] = [];

  data.forEach((value) => {
    if (value?.typename === 'User') {
      args.push({ userType: true, id: value.id, username: value.username! });
    } else if (value?.typename === 'PreActivatedUser') {
      args.push({ userType: false, id: value.id, username: value.username! });
    } else if (value?.typename === 'Constituency') {
      args.push({ id: value.id });
    }
  });

  const onDeleteRequest = () => {
    onClose();
    args.forEach(async (arg) => {
      await onDeleteDataMutation(arg);
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={'260px'}>
        <ModalHeader fontSize="14px">Do u want to delete this user?</ModalHeader>

        <ModalFooter>
          <Flex justifyContent="space-around" w="100%">
            <Button colorScheme="red" {...noFocusStyle} onClick={onDeleteRequest}>
              Yes
            </Button>
            <Button colorScheme="green" mr={3} minW="55px" onClick={onClose} {...noFocusStyle}>
              No
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const noFocusStyle: ButtonProps = {
  _focus: { boxShadow: 'none' },
};
