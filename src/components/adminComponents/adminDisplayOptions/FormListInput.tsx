import React, { useState, useEffect } from 'react';
import { Box, Input, Flex } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { HiPencil, HiX } from 'react-icons/hi';

type IProps = {
  value: any;
  handleChange: any;
  unchangableException: boolean;
  id: string;
  placeholder: string;
  displaySaveChangeInfo: boolean;
  setDisplaySaveChangeInfo: React.Dispatch<React.SetStateAction<boolean>>;
  inputType?: string;
};

export const FormListInput: React.FC<IProps> = ({
  value,
  handleChange,
  unchangableException,
  id,
  placeholder,
  displaySaveChangeInfo,
  setDisplaySaveChangeInfo,
  inputType = 'text',
}) => {
  const [changeValue, setChangeValue] = useState(false);
  const [displayWarning, setDisplayWarning] = useState('');

  useEffect(() => {
    if (value > 100000) {
      if (displayWarning !== "There isn't a constituency with higher electorate than 100000.") {
        setDisplayWarning("There isn't a constituency with higher electorate than 100000.");
      }
    } else if (value <= 0) {
      if (displayWarning !== "There isn't a constituency with lower electorate than 0.")
        setDisplayWarning("There isn't a constituency with lower electorate than 0.");
    } else {
      if (displayWarning) {
        setDisplayWarning('');
      }
    }
  }, [value]);

  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setChangeValue(false);
      setDisplayWarning('');
    }
    if (inputType === 'number' && event.key === '.') {
      event.preventDefault();
    }
  };
  //evt.key === '.' && evt.preventDefault()
  if (!changeValue) {
    return (
      <>
        <Box>{value || '-'}</Box>
        {!unchangableException ? (
          <Flex
            ml="3px"
            p="5px"
            cursor="pointer"
            _hover={{ background: 'rgba(0, 0, 0, 0.06)' }}
            onClick={() => setChangeValue(true)}>
            <Icon as={HiPencil} />
          </Flex>
        ) : null}
      </>
    );
  }

  return (
    <>
      <Input
        flex="1"
        value={value}
        onChange={handleChange}
        id={id}
        placeholder={placeholder}
        type={inputType}
        mb={displayWarning ? '10px' : '0'}
        onSelect={() => (displaySaveChangeInfo ? null : setDisplaySaveChangeInfo(true))}
        onKeyPress={(e) => handleInputKeyUp(e)}
        position="relative"
      />
      <Flex
        ml="3px"
        p="10px"
        cursor="pointer"
        _hover={{ background: 'rgba(0, 0, 0, 0.06)' }}
        onClick={() => {
          setChangeValue(false), setDisplayWarning('');
        }}>
        <Icon as={HiX} />
      </Flex>
      {displayWarning ? (
        <Box position="absolute" left="0" bottom="-10px" fontSize="12px" color="yellow.500">
          {displayWarning}
        </Box>
      ) : null}
    </>
  );
};
//
