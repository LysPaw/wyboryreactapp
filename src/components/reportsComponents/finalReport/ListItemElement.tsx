import React, { useState } from 'react';
import { Box, BoxProps, Flex, FlexProps, Input, InputProps, Textarea, TextareaProps } from '@chakra-ui/react';

type IProps = {
  protocol: Record<string, string>;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    param: string,
    inputType?: 'number' | 'string'
  ) => void;
  protocolElement: string;
  stBoxContent: string;
  ndBoxContent: string;
  handleChangeInputType?: 'number' | 'string';
  cadidateScoreStyle?: boolean;
  textArea?: boolean;
  displayWarningStyle?: boolean;
};

const ListItemElement: React.FC<IProps> = ({
  protocol,
  handleChange,
  protocolElement,
  stBoxContent,
  ndBoxContent,
  handleChangeInputType = 'string',
  cadidateScoreStyle = false,
  textArea = false,
  displayWarningStyle = false,
}) => {
  const [elementSelected, setElementSelected] = useState(false);
  return (
    <Flex {...itemChildrenFlex(cadidateScoreStyle, textArea)}>
      <Box {...listItemMainFlex1stBox}>{stBoxContent}</Box>
      <Flex {...listItemMainFlex} alignItems={textArea ? 'flex-start' : 'center'}>
        <Box
          {...listItemMainFlex2ndBox}
          textAlign={cadidateScoreStyle ? 'end' : 'center'}
          mr={cadidateScoreStyle ? '15px' : '0'}>
          {ndBoxContent.split('\n').map((i, index) => {
            return (
              <Box
                key={index}
                fontWeight={index !== 0 ? '400' : 'inherit'}
                fontSize={index !== 0 ? { base: '11px', sm: '12px', md: '14px' } : 'inherit'}>
                {i}
              </Box>
            );
          })}
        </Box>
        {textArea ? (
          <Textarea
            w="40%"
            ml="10px"
            value={protocol?.[protocolElement] || ''}
            onChange={(e) => handleChange(e, protocolElement, handleChangeInputType)}
            onBlur={() => setElementSelected(true)}
            {...textAreaStyle(elementSelected && displayWarningStyle)}
          />
        ) : (
          <Input
            step={1}
            value={protocol?.[protocolElement] || ''}
            onChange={(e) => handleChange(e, protocolElement, handleChangeInputType)}
            onBlur={() => setElementSelected(true)}
            {...inputStyle(elementSelected && displayWarningStyle)}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default ListItemElement;

const itemChildrenFlex: (cadidateStyle: boolean, textAreaStyle: boolean) => FlexProps = (
  cadidateStyle = false,
  textAreaStyle = false
) => {
  return {
    p: '10px',
    alignItems: textAreaStyle ? 'flex-start' : 'center',
    fontWeight: '500',
    w: cadidateStyle
      ? { base: '100%', sm: '80%', md: '60%' }
      : textAreaStyle
      ? '100%'
      : { base: '100%', sm: '90%', md: '80%' },
  };
};

const listItemMainFlex: FlexProps = {
  mr: '15px',
  flex: '1',
  fontSize: { base: '13px', sm: '14px', md: '16px' },
};

const listItemMainFlex1stBox: BoxProps = {
  width: '25px',
  mr: { base: '5px', sm: '10px', md: '15px' },
};

const listItemMainFlex2ndBox: BoxProps = {
  width: 'fit-content',
  flex: '1',
};

const textAreaStyle: (warningStyle?: boolean) => TextareaProps = (warningStyle = false) => {
  return {
    w: '40%',
    ml: '10px',
    borderColor: warningStyle ? '#DC143C' : 'inherit',
    boxShadow: warningStyle ? '0 0 0 1px #DC143C' : 'inset 0px 0px 1px 1px rgba(0, 0, 0, .3) ',
  };
};

const inputStyle: (warningStyle?: boolean) => InputProps = (warningStyle = false) => {
  return {
    width: { base: '30%', sm: '20%', md: '10%' },
    minW: '65px',
    background: '#fff',
    border: '1px solid #000',
    paddingX: '10px',
    ml: '5px',
    borderColor: warningStyle ? '#DC143C' : 'inherit',
    boxShadow: warningStyle ? '0 0 0 1px #DC143C' : 'inset 0px 0px 1px 1px rgba(0, 0, 0, .3) ',

    _focus: {
      zIndex: '1',
      borderColor: '#6d6d6d',
      boxShadow: '0 0 0 1px #7a7a7a',
    },
  };
};

//   border-color: #DD6B20;
//     box-shadow: 0 0 0 1px #dd6b20;
