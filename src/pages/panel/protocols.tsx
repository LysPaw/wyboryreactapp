import React, { useState, useEffect, useReducer } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { ProtectedLayout } from '../../components/Layout';
import { Box, BoxProps, Flex, Tooltip, useMediaQuery } from '@chakra-ui/react';
import ProtocolsStepOne from '../../components/reportsComponents/finalReport/ProtocolsStepOne';
import { useGetConstituencyQuery } from '../../generated/graphql';
import ProtocolsStepTwo from '../../components/reportsComponents/finalReport/ProtocolsStepTwo';
import DisplayErrorWarning from './displayErrorWarning';
import { useRouter } from 'next/router';
import ProtocolCreateInitState, {
  protocolValueReducer,
} from '../../components/reportsComponents/finalReport/protocolValueReduser';
import ProtocolsStepThree from '../../components/reportsComponents/finalReport/ProtocolsStepThree';

const Protocols = () => {
  const router = useRouter();
  const [{ data }] = useGetConstituencyQuery();
  const isLargerThan480 = useMediaQuery('(min-width: 480px)');
  const [constituencyId, setConstituencyId] = useState<null | number>(null);
  const [step, setStep] = useState<number>(1);
  const [availableStep, setAvailableStep] = useState<number>(1);
  const [emptyFields, setEmptyFields] = useState<string[]>([]);
  const [protocol, setProtocol] = useReducer(protocolValueReducer, {});

  ProtocolCreateInitState(data, constituencyId, setProtocol, setEmptyFields);

  useEffect(() => {
    if (router.query.id) {
      setConstituencyId(parseInt(router.query.id as string));
      step < 2 && setStep(2);
      availableStep < 2 && setAvailableStep(2);
    }
  }, [data]);

  useEffect(() => {
    if (step === 2 && availableStep === 2 && emptyFields.length === 0) {
      setAvailableStep(3);
    } else if (step === 2 && availableStep === 3 && emptyFields.length > 0) {
      setAvailableStep(2);
    }
  }, [emptyFields]);

  if (data?.getConstituency && data.getConstituency.length === 0) {
    return (
      <Flex {...dataEnterColumn} justifyContent="center" textAlign="center">
        You are not assigned to any constituency.
      </Flex>
    );
  }

  return (
    <ProtectedLayout>
      <Flex {...topFlex} justifyContent="space-between" alignItems="flex-end" mb="10px">
        <Box>Election calculator</Box>
        <Box fontSize="16px" fontWeight="400">
          v.1.0.0
        </Box>
      </Flex>
      <Box width="100%" position="relative" mx="auto" py="20px" {...progressWrapper}>
        <Flex>
          <Flex flex="1" justifyContent="center" alignItems="center" zIndex="2" direction="column">
            <Box {...progressShape(step === 1)} position="absolute">
              <Tooltip label={isLargerThan480 ? '' : 'Choose available Constituency'} aria-label="A tooltip">
                <Flex {...progressInside()} onClick={() => step !== 1 && setStep(1)}>
                  1
                </Flex>
              </Tooltip>
              <Box {...progressDescription}>Choose available Constituency</Box>
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="center" alignItems="center" zIndex="2" direction="column">
            <Box {...progressShape(step === 2, availableStep >= 2)} position="absolute">
              <Tooltip label={isLargerThan480 ? '' : 'Fill numerical data'} aria-label="A tooltip">
                <Flex
                  {...progressInside(availableStep >= 2)}
                  onClick={() => availableStep >= 2 && step !== 2 && setStep(2)}>
                  2
                </Flex>
              </Tooltip>
              <Box {...progressDescription}>Fill numerical data</Box>
            </Box>
          </Flex>
          <Flex flex="1" justifyContent="center" alignItems="center" zIndex="2" direction="column">
            <Box {...progressShape(step === 3, availableStep >= 3)} position="absolute">
              <Tooltip label={isLargerThan480 ? '' : 'Check and Save'} aria-label="A tooltip">
                <Flex
                  {...progressInside(availableStep >= 3)}
                  onClick={() => availableStep >= 3 && step !== 3 && setStep(3)}>
                  3
                </Flex>
              </Tooltip>
              <Box {...progressDescription}>Save / Remove</Box>
            </Box>
          </Flex>
        </Flex>
      </Box>
      {data?.getConstituency && data.getConstituency.length > 0 && step === 1 ? (
        <ProtocolsStepOne
          data={data}
          setConstituencyId={setConstituencyId}
          constituencyId={constituencyId}
          availableStep={availableStep}
          setAvailableStep={setAvailableStep}
          setStep={setStep}
        />
      ) : null}
      {data?.getConstituency && data.getConstituency.length > 0 && constituencyId !== null && step === 2 ? (
        <ProtocolsStepTwo
          data={data}
          constituencyId={constituencyId}
          availableStep={availableStep}
          setAvailableStep={setAvailableStep}
          emptyFields={emptyFields}
          setEmptyFields={setEmptyFields}
          protocol={protocol}
          setProtocol={setProtocol}
        />
      ) : null}
      {data?.getConstituency && data.getConstituency.length > 0 && constituencyId !== null && step === 3 ? (
        <ProtocolsStepThree
          constituencyId={constituencyId}
          finalReport={
            data?.getConstituency ? data.getConstituency.find((c) => c.id === constituencyId)?.finalReport : null
          }
          protocol={protocol}
        />
      ) : null}
      <DisplayErrorWarning display={step === 2} bottomCss="10px">
        <Box>Empty fields - {emptyFields.length}</Box>
      </DisplayErrorWarning>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Protocols);

const topFlex: BoxProps = {
  justifyContent: 'space-between',
  background: '#f7f7f7',
  boxShadow: '1px 1px 2px 1px rgba(0, 0, 0, .3) ',
  padding: '10px 25px',
  fontSize: '20px',
  fontWeight: '500',
};

const progressWrapper: BoxProps = {
  _after: {
    backgroundColor: '#000',
    content: '""',
    height: '1px',
    position: 'absolute',
    verticalAlign: 'middle',
    top: '50%',
    width: '100%',
  },
};

const progressShape = (currentlySelected: boolean = false, selectable: boolean = true) => {
  let returnObj: BoxProps = {
    borderRadius: '50%',
    w: '35px',
    h: '35px',
    boxShadow: 'inset -1px 3px 5px 1px rgba(255, 255, 255, .2)',
  };

  if (currentlySelected) {
    returnObj = { ...returnObj, background: '#35a700', color: '#fff', border: '1px solid #757575' };
  } else {
    if (selectable) {
      returnObj = {
        ...returnObj,
        color: '#000',
        background: '#f1f1f1',
        border: '1px solid #6d6d6d',
      };
    } else {
      returnObj = {
        ...returnObj,
        color: '#757575',
        background: '#dfdfdf',
        border: '1px solid #a7a7a7',
        boxShadow: 'inset -1px 3px 7px 1px rgba(0, 0, 0, .1)',
      };
    }
  }
  return returnObj;
};

const progressInside: (selectable?: boolean) => BoxProps = (selectable = true) => {
  return {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    cursor: selectable ? 'pointer' : 'no-drop',
  };
};

const progressDescription: BoxProps = {
  position: 'absolute',
  left: '50%',
  minW: { base: '80px', md: '120px', lg: '230px' },
  transform: 'translateX(-50%)',
  textAlign: 'center',
  color: '#000',
  display: { base: 'none', sm: 'inherit' },
};

const dataEnterColumn: BoxProps = {
  borderTop: '1px solid #000',
  borderBottom: '1px solid #000',
  paddingY: '25px',
  mt: '10px',
  background: '#f5f3f3',
};
