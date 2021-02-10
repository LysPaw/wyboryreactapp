import React, { useState, useEffect } from 'react';
import { Box, ModalFooter, Button, FormControl, FormLabel, Flex, Link } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { Icon } from '@chakra-ui/react';
import NextLink from 'next/link';
import { HiDocumentDuplicate } from 'react-icons/hi';
import { FormListInput } from './FormListInput';
import { ChangeUserInfoDataMutationVariables } from '../../../generated/graphql';
import { cutStrings } from '../../../utils/cutStrings';
import { DisplaySelectableOperators } from './DisplaySelectableOperators';

type IProps = {
  initValues: any;
  onClose: () => void;
  onChangeDataMutation: any;
  username?: string;
  id: number;
  onAssignOperatorMutation: any;
  onClearAssignedOperatorMutation: any;
};

export const DisplayFormListModal: React.FC<IProps> = ({
  initValues,
  onClose,
  onChangeDataMutation,
  username,
  id,
  onAssignOperatorMutation,
  onClearAssignedOperatorMutation,
}) => {
  const [displaySaveChangeInfo, setDisplaySaveChangeInfo] = useState(false);
  const [operatorAssigned, setOperatorAssigned] = useState(!!initValues?.operatorId);
  const [displaySelectedOperators, setDisplaySelectedOperators] = useState(false);

  useEffect(() => {
    if (operatorAssigned !== !!initValues?.operatorId) setOperatorAssigned(!!initValues?.operatorId);
  }, [initValues]);

  const displayInputs = (key: string, values: any, handleChange: any) => {
    if (Object.keys(initValues).includes(key)) {
      let uppercaseKey: string;
      let addSpace: string;
      if (key === 'constituenciesIds') {
        addSpace = 'Constituencies';
      } else if (key === 'operatorId') {
        addSpace = 'Operator';
      } else {
        uppercaseKey = key.charAt(0).toUpperCase() + key.slice(1);
        addSpace = uppercaseKey.replace(/([A-Z])/g, ' $1').trim();
      }
      const standardInput = (
        <FormListInput
          value={values[key]}
          handleChange={handleChange}
          unchangableException={key === 'activationCode' || key === 'constituenciesIds' ? true : false}
          id={key}
          placeholder={addSpace}
          displaySaveChangeInfo={displaySaveChangeInfo}
          setDisplaySaveChangeInfo={setDisplaySaveChangeInfo}
          inputType={key === 'electorate' ? 'number' : 'text'}
        />
      );

      const assignOperatorField = operatorAssigned ? (
        <Box>
          <Flex direction="column">
            <Flex>
              User: <Box ml="5px">{initValues?.operatorId?.username}</Box>
            </Flex>
            <Flex wrap="wrap">
              Full name:
              <Box ml="5px">
                {cutStrings(`${initValues?.operatorId?.lastName || ''} ${initValues?.operatorId?.firstName || ''}`)}
              </Box>
            </Flex>
            <Flex>
              <Button
                colorScheme="red"
                mt="4px"
                onClick={async () =>
                  onClearAssignedOperatorMutation
                    ? (await onClearAssignedOperatorMutation({ constituencyId: id }), setOperatorAssigned(false))
                    : null
                }>
                Clear Operator
              </Button>
            </Flex>
          </Flex>
        </Box>
      ) : (
        <Flex>
          <Button colorScheme="blue" onClick={() => setDisplaySelectedOperators(true)}>
            Assign Operator
          </Button>
        </Flex>
      );
      return (
        <Box mb="8px">
          <FormControl display="flex" alignItems={key === 'operatorId' ? 'flex-start' : 'center'}>
            <FormLabel my="0.1rem" flex="0 1 auto" htmlFor={key}>
              {addSpace}
            </FormLabel>
            {key === 'operatorId' ? assignOperatorField : standardInput}
          </FormControl>
          {key === 'constituenciesIds' ? (
            <Box fontSize="12px" ml="5px">
              <NextLink href="/admin/constituencies">
                <Link display="flex" alignItems="center" width="fit-content">
                  <Icon as={HiDocumentDuplicate} mr="2px" />
                  Manage Constituencies
                </Link>
              </NextLink>
            </Box>
          ) : null}
        </Box>
      );
    } else return null;
  };
  return (
    <Formik
      initialValues={initValues}
      onSubmit={async (values) => {
        let args: ChangeUserInfoDataMutationVariables | {} = {};
        if (initValues.hasOwnProperty('constituenciesIds')) {
          args = { userType: true, id, username, ...(({ constituenciesIds, ...obj }) => obj)(values) };
        } else if (initValues.hasOwnProperty('activationCode')) {
          args = { userType: false, id, username, ...(({ activationCode, ...obj }) => obj)(values) };
        } else if (initValues.hasOwnProperty('adress')) {
          args = { constituencyId: id, newAdress: values.adress, electorate: parseInt(values.electorate) };
        }

        if (args) {
          const response = await onChangeDataMutation(args);

          if (!response?.data?.error) {
            setDisplaySaveChangeInfo(false);
          }
        }
      }}>
      {({ isSubmitting, values, handleChange }) => (
        <Form style={{ display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
          <Box flex="1">
            {displayInputs('firstName', values, handleChange)}
            {displayInputs('secondName', values, handleChange)}
            {displayInputs('lastName', values, handleChange)}
            {displayInputs('constituenciesIds', values, handleChange)}
            {displayInputs('activationCode', values, handleChange)}
            {displayInputs('adress', values, handleChange)}
            {displayInputs('electorate', values, handleChange)}
            {displayInputs('operatorId', values, handleChange)}
          </Box>
          {displaySaveChangeInfo && (
            <Box textAlign="right" fontSize="14px" color="green.500">
              Save changes to make them premanent.
            </Box>
          )}
          <ModalFooter>
            <Button
              isDisabled={!displaySaveChangeInfo}
              isLoading={isSubmitting}
              type="submit"
              colorScheme="green"
              mr="10px"
              _focus={{ boxShadow: 'none' }}>
              Save Changes
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose} _focus={{ boxShadow: 'none' }}>
              Close
            </Button>
          </ModalFooter>
          {Object.keys(initValues).includes('operatorId') && (
            <DisplaySelectableOperators
              isOpen={displaySelectedOperators}
              onClose={() => setDisplaySelectedOperators(false)}
              id={id}
              setOperatorAssigned={setOperatorAssigned}
              assignOperator={onAssignOperatorMutation}
            />
          )}
        </Form>
      )}
    </Formik>
  );
};
