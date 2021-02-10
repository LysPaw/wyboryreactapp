import React from 'react';
import { Box, BoxProps, Divider, Flex, FlexProps, ListItem, UnorderedList } from '@chakra-ui/react';
import { GetConstituencyQuery } from '../../../generated/graphql';
import { ActionTypes, IAction } from './protocolValueReduser';
import ListItemElement from './ListItemElement';
import {
  displayHelperArrIPart,
  displayHelperArrIIPart,
  displayHelperArrIIIPart,
  displayHelperArrIVPart,
} from './ProtocolsStepTwoArrHelpers';

type IProps = {
  constituencyId: number;
  availableStep: number;
  setAvailableStep: React.Dispatch<React.SetStateAction<number>>;
  data: GetConstituencyQuery | undefined;
  setEmptyFields: React.Dispatch<React.SetStateAction<string[]>>;
  emptyFields: string[];
  protocol: Record<string, string>;
  setProtocol: React.Dispatch<IAction>;
};

const ProtocolsStepTwo: React.FC<IProps> = ({ setEmptyFields, emptyFields, protocol, setProtocol }) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    param: string,
    inputType: 'number' | 'string' = 'string'
  ) => {
    if ((inputType === 'number' && /^\d+$/.test(event.target.value)) || event.target.value === '') {
      setProtocol({
        type: ActionTypes.handleChange,
        payload: {
          param,
          value: event.target.value,
        },
      });

      if (param !== 'c8' && param !== 'd1') {
        if (event.target.value === '' && !!!emptyFields.find((v) => v === param)) {
          setEmptyFields([...emptyFields, param]);
        }
        if (event.target.value !== '' && !!emptyFields.find((v) => v === param)) {
          setEmptyFields([...emptyFields.filter((v) => v !== param)]);
        }
      }
    } else if (inputType === 'string' && event.target.value) {
      setProtocol({
        type: ActionTypes.handleChange,
        payload: {
          param,
          value: event.target.value,
        },
      });

      if (param !== 'c8' && param !== 'd1') {
        if (event.target.value === '' && !!!emptyFields.find((v) => v === param)) {
          setEmptyFields([...emptyFields, param]);
        }
        if (event.target.value !== '' && !!emptyFields.find((v) => v === param)) {
          setEmptyFields([...emptyFields.filter((v) => v !== param)]);
        }
      }
    }
  };

  return (
    <Box {...mainWrapper}>
      <Flex
        justifyContent="center"
        textAlign="center"
        fontSize={{ base: '22px', md: '26px' }}
        fontWeight="500"
        p="20px 10px">
        Protocols of voting results for the president of San Escobar carried out in 05.02.2021
      </Flex>
      <Divider />
      <Flex {...itemMainFlex}>
        <Flex {...itemChildrenFlex}>
          <Box {...itemChildrenFlexChild}>Territorial code of the municipality</Box>
          <Box>012345</Box>
        </Flex>
        <Divider />
        <Flex {...itemChildrenFlex}>
          <Box {...itemChildrenFlexChild}>Municipality</Box>
          <Box>San Escobar</Box>
        </Flex>
        <Divider />
        <Flex {...itemChildrenFlex}>
          <Box {...itemChildrenFlexChild}>Constituency ID</Box>
          <Box>{protocol?.constituencyID || '-'}</Box>
        </Flex>
        <Divider />
        <Flex {...itemChildrenFlex}>
          <Box {...itemChildrenFlexChild}>Constituency adress</Box>
          <Box>{protocol?.adress || '-'}</Box>
        </Flex>
      </Flex>

      <Divider />
      <Box p="20px 5px">
        <Box {...mainSegmentTitle}>I. Settlement of voter-registration lists</Box>
        <Divider />
        <UnorderedList listStyleType="none" margin="0" pt="10px">
          {displayHelperArrIPart.map((str, index) => {
            return (
              <ListItem key={index} listStyleType="none">
                <ListItemElement
                  protocol={protocol}
                  handleChange={handleChange}
                  protocolElement={`a${index + 1}`}
                  stBoxContent={`${index + 1}.`}
                  ndBoxContent={str}
                  handleChangeInputType="number"
                  displayWarningStyle={!!emptyFields.find((v) => v === `a${index + 1}`)}
                />
                <Divider />
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
      <Box p="20px 5px">
        <Box {...mainSegmentTitle}>II. Establishing the result of voting</Box>
        <Divider />
        <UnorderedList listStyleType="none" margin="0">
          {displayHelperArrIIPart.map((el, index) => {
            return (
              <ListItem key={index} listStyleType="none">
                <ListItemElement
                  protocol={protocol}
                  handleChange={handleChange}
                  protocolElement={`a${el.protocolValue}`}
                  stBoxContent={`${el.protocolValue}.`}
                  ndBoxContent={el.str}
                  handleChangeInputType="number"
                  displayWarningStyle={!!emptyFields.find((v) => v === `a${el.protocolValue}`)}
                />
                <Divider />
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
      <Box p="20px 5px">
        <Box {...mainSegmentTitle}>III. Valid voting card for each cadicate</Box>
        <Divider />
        <UnorderedList listStyleType="none" margin="0">
          {displayHelperArrIIIPart.map((str, index) => {
            return (
              <ListItem key={index} listStyleType="none">
                <ListItemElement
                  protocol={protocol}
                  handleChange={handleChange}
                  protocolElement={`b${index + 1}`}
                  stBoxContent={`${index + 1}.`}
                  ndBoxContent={str}
                  handleChangeInputType="number"
                  cadidateScoreStyle
                  displayWarningStyle={!!emptyFields.find((v) => v === `b${index + 1}`)}
                />
                <Divider />
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
      <Box p="20px 5px">
        <Box {...mainSegmentTitle}>IV. Comments and annotation</Box>
        <Divider />
        <UnorderedList listStyleType="none" margin="0">
          {displayHelperArrIVPart.map((v, index) => {
            return (
              <ListItem key={index} listStyleType="none">
                <ListItemElement
                  protocol={protocol}
                  handleChange={handleChange}
                  protocolElement={`c${index + 1}`}
                  stBoxContent={`${index + 1}.`}
                  ndBoxContent={v.str}
                  handleChangeInputType={v.inputType as 'string' | 'number' | undefined}
                  textArea
                  displayWarningStyle={!!emptyFields.find((v) => v === `c${index + 1}`)}
                />
                <Divider />
              </ListItem>
            );
          })}
        </UnorderedList>
      </Box>
      <ListItemElement
        protocol={protocol}
        handleChange={handleChange}
        protocolElement="d1"
        stBoxContent=""
        ndBoxContent="Committee position regarding annotations above"
        handleChangeInputType="string"
        textArea
      />
    </Box>
  );
};

export default ProtocolsStepTwo;

const mainWrapper: BoxProps = {
  marginY: '80px',
};

const itemMainFlex: FlexProps = {
  direction: 'column',
  textAlign: 'center',
};

const itemChildrenFlex: FlexProps = {
  p: '10px',
  justifyContent: 'center',
  alignItems: 'center',
  w: { base: '100%', sm: '80%' },
};

const itemChildrenFlexChild: BoxProps = {
  fontWeight: '500',
  mr: '15px',
};

const mainSegmentTitle: BoxProps = {
  fontSize: { base: '18px', md: '20px' },
  fontWeight: '500',
  paddingY: '10px',
};

//import { HiShieldExclamation } from 'react-icons/hi';
//<Box w="100%" mt="10px" textAlign="center" color="#DC143C" fontSize={{ base: '11px', sm: '12px', md: '14px' }}>
//  <Icon as={HiShieldExclamation} mb="3px" mr="2px" fontSize={{ base: '12px', sm: '13px', md: '15px' }} />{displayErrorMessage}
//</Box>
