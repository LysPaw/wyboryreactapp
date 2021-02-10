import React from 'react';
import {
  Box,
  Flex,
  Button,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  BoxProps,
} from '@chakra-ui/react';
import { useGetListOfUserQuery } from '../../../generated/graphql';
import { cutStrings } from '../../../utils/cutStrings';

type IProps = {
  isOpen: boolean;
  onClose: () => void;
  id: number;
  setOperatorAssigned: React.Dispatch<React.SetStateAction<boolean>>;
  assignOperator: any;
};

export const DisplaySelectableOperators: React.FC<IProps> = ({ isOpen, onClose, id, assignOperator }) => {
  const [{ data }] = useGetListOfUserQuery();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        position="absolute"
        top="11vh"
        right={{ base: '0', md: '10vw' }}
        minW={{ base: '100px', md: '300px' }}
        minH="100px">
        <ModalHeader fontSize="14px" pb=".2rem">
          Choose operator which u want to assign to constituency ID: {id}
        </ModalHeader>
        <ModalBody minH="100px">
          <Box>
            {data?.getListOfUser?.users?.length !== 0 ? (
              <>
                <Flex fontWeight="500" pb="3px" mb="2px" pl="4px" borderBottom="1px solid rgb(234, 234, 234)">
                  <Box flex="1">Username</Box>
                  <Box flex="1" display={{ base: 'none', sm: 'initial' }}>
                    Full name
                  </Box>
                  <Box flex="1" fontSize="15px">
                    Assigned Constituency ID
                  </Box>
                </Flex>
                {data?.getListOfUser?.users?.map((value) => {
                  return (
                    <Flex
                      key={value.id}
                      {...selectableUser}
                      onClick={async () => {
                        await assignOperator({ userId: value.id, constituencyId: id }), onClose();
                      }}>
                      <Box flex="1">{value.username}</Box>
                      <Box flex="1" display={{ base: 'none', sm: 'initial' }}>
                        {cutStrings(value.lastName + ' ' + value.firstName, 15)}
                      </Box>
                      <Box flex="1">{value.constituenciesIds ? value.constituenciesIds : '-'}</Box>
                    </Flex>
                  );
                })}
              </>
            ) : (
              <Box fontWeight="500">No operators available.</Box>
            )}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Flex justifyContent="space-around" w="100%">
            <Button colorScheme="blue" minW="55px" _focus={{ outline: 'none' }} onClick={onClose}>
              Cancel
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const user: BoxProps = {
  whiteSpace: 'nowrap',
  userSelect: 'none',
  minHeight: '32px',
  borderBottom: '1px solid rgb(234, 234, 234)',
  alignItems: 'center',
  pl: '4px',
  borderRadius: '5px',
};

const selectableUser: BoxProps = {
  ...user,
  cursor: 'pointer',

  _last: {
    borderBottom: 'none',
  },

  _hover: { background: '#f3f3f3' },
};
/*

if (!data) return null;
  let args: DeleteUserMutationVariables[] & DeleteConstituencyMutationVariables[] = [];

  console.log('dataIn DisplayDeleteModal:', data);
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
      console.log('argumenty', arg);
      await onDeleteDataMutation(arg);
    });
    //console.log(response?.data?.deleteUser);
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

*/
