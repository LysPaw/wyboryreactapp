import React, { useState } from 'react';
import { Box, BoxProps, Button, Icon, Flex, FlexProps, Tooltip } from '@chakra-ui/react';
import { useDeleteProtocolMutation, useSaveProtocolMutation } from '../../../generated/graphql';
import { HiShieldExclamation } from 'react-icons/hi';

type IProps = {
  constituencyId: number;
  finalReport: string | null | undefined;
  protocol: Record<string, string>;
};

const ProtocolsStepThree: React.FC<IProps> = ({ constituencyId, finalReport, protocol }) => {
  console.log('finalReport', finalReport);
  const [, saveProtocol] = useSaveProtocolMutation();
  const [, deleteProtocol] = useDeleteProtocolMutation();
  const [successForSaveProtocol, setSuccessForSaveProtocol] = useState(false);
  const [errorForSaveProtocol, setErrorForSaveProtocol] = useState('');
  const [successForDeleteProtocol, setSuccessForDeleteProtocol] = useState(false);
  const [errorForDeleteProtocol, setErrorForDeleteProtocol] = useState('');

  return (
    <Box {...mainWrapper}>
      <Box>
        <Flex {...itemMainFlex} mb="10px">
          Save data from the protocol
          <Box padding="10px 5px">
            <Button
              colorScheme="green"
              ml="15px"
              isDisabled={!!errorForSaveProtocol || successForSaveProtocol}
              onClick={async () => {
                if (protocol) {
                  const protocolStringify = JSON.stringify({ ...protocol, creationTime: returnTimeStamp() });
                  const response = await saveProtocol({ constituencyId, finalReport: protocolStringify });
                  if (response?.data?.saveProtocol?.constituency) {
                    setSuccessForSaveProtocol(true);
                  }
                  if (response?.data?.saveProtocol?.error) {
                    setErrorForSaveProtocol(response?.data?.saveProtocol?.error);
                  }
                }
              }}>
              Save protocol
            </Button>
          </Box>
        </Flex>
        {errorForSaveProtocol && (
          <Box {...errorDisplay} color="#DC143C" onClick={() => setErrorForSaveProtocol('')}>
            <Icon as={HiShieldExclamation} mb="3px" mr="2px" />
            {errorForSaveProtocol}
          </Box>
        )}
        {successForSaveProtocol && (
          <Box
            {...errorDisplay}
            color="#368a06"
            onClick={() => {
              setSuccessForSaveProtocol(false);
            }}>
            <Icon as={HiShieldExclamation} mb="3px" mr="2px" />
            Protocol successfully saved.
          </Box>
        )}
        <Flex {...itemMainFlex} mt="10px">
          Delete data from the protocol
          <Tooltip label={finalReport ? '' : 'There is no saved protocol on the server'} aria-label="A tooltip">
            <Box padding="10px 5px">
              <Button
                colorScheme="blue"
                ml="10px"
                isDisabled={!!!finalReport || !!errorForDeleteProtocol}
                onClick={async () => {
                  if (protocol) {
                    const response = await deleteProtocol({ constituencyId });
                    if (response?.data?.deleteProtocol?.constituency) {
                      setSuccessForDeleteProtocol(true);
                    }
                    if (response?.data?.deleteProtocol?.error) {
                      setErrorForDeleteProtocol(response?.data?.deleteProtocol?.error);
                    }
                  }
                }}>
                Delete protocol
              </Button>
            </Box>
          </Tooltip>
        </Flex>
        {errorForDeleteProtocol && (
          <Box {...errorDisplay} color="#DC143C" onClick={() => setErrorForDeleteProtocol('')}>
            <Icon as={HiShieldExclamation} mb="3px" mr="2px" />
            {errorForDeleteProtocol}
          </Box>
        )}
        {successForDeleteProtocol && (
          <Box
            {...errorDisplay}
            color="#368a06"
            onClick={() => {
              setSuccessForDeleteProtocol(false);
            }}>
            <Icon as={HiShieldExclamation} mb="3px" mr="2px" />
            Protocol successfully deleted.
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ProtocolsStepThree;

const mainWrapper: BoxProps = {
  marginY: '100px',
};

const itemMainFlex: FlexProps = {
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  direction: { base: 'column', md: 'row' },
};

const errorDisplay: BoxProps = {
  textAlign: 'center',
  pb: '10px',
  cursor: 'pointer',
};

const returnTimeStamp = () => {
  const niceLookingTime = (value: number) => (value < 10 ? '0' + value : value.toString());
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();
  const datetime =
    niceLookingTime(day) +
    '.' +
    niceLookingTime(month) +
    '.' +
    year +
    ' ' +
    niceLookingTime(hours) +
    ':' +
    niceLookingTime(minutes) +
    ':' +
    niceLookingTime(seconds);

  return datetime;
};
