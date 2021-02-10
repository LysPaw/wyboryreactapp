import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Box,
  IconProps,
  Flex,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { Icon } from '@chakra-ui/react';
import { BsFillEyeSlashFill, BsFillEyeFill, BsFillQuestionCircleFill } from 'react-icons/bs';

type IProps = React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<IProps> = ({ label, size: _, textarea, ...props }) => {
  const [field, { error }] = useField(props);

  let Component = <Input {...field} {...props} id={field.name} />;

  if (textarea) {
    Component = <Textarea {...field} {...props} id={field.name} />;
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      {Component}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

type PasswordDetailsChange = { name?: string; label?: string; placeholder?: string };
type PasswordProps = {
  additionalInfo?: boolean;
  passwordErrorEvent?: boolean;
  passwordDetails?: PasswordDetailsChange;
};

export const PasswordFieldTemplate: React.FC<PasswordProps> = ({
  additionalInfo,
  passwordErrorEvent,
  passwordDetails = {},
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Box mt={4} position="relative">
      {!additionalInfo ? null : (
        <Flex
          pos="absolute"
          right="2px"
          top="0"
          w="30px"
          h="30px"
          alignItems="center"
          justifyContent="center"
          zIndex="2"
          cursor="pointer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}>
          <Icon w="20px" h="20px" as={BsFillQuestionCircleFill} />
          {passwordErrorEvent || showTooltip ? (
            <Box pos="relative">
              <Container
                pos="absolute"
                left={{ base: '-260px', lg: '10px' }}
                top={{ base: '-90px', lg: '-20px' }}
                padding="4"
                bg="gray.100"
                maxW="200px"
                minW="fit-content"
                zIndex={3}
                border="1px solid rgba(108, 122, 137, .6)"
                borderRadius="4px">
                <ul style={{ fontSize: '12px', minWidth: '200px', paddingLeft: '6px' }}>
                  <li>min. 8 characters</li>
                  <li>min. 1 capital letter</li>
                  <li>min. 1 number</li>
                  <li>min. 1 symbol (@#*^$&)</li>
                </ul>
              </Container>
            </Box>
          ) : null}
        </Flex>
      )}
      <InputField
        name={passwordDetails.name ? passwordDetails.name : 'password'}
        placeholder={passwordDetails.placeholder ? passwordDetails.placeholder : 'password'}
        label={passwordDetails.label ? passwordDetails.label : 'Password'}
        type={showPassword ? undefined : 'password'}
      />
      <Icon
        as={showPassword ? BsFillEyeFill : BsFillEyeSlashFill}
        {...StyledLink}
        onClick={() => setShowPassword(!showPassword)}
      />
    </Box>
  );
};

const StyledLink: IconProps = {
  position: 'absolute',
  right: '1px',
  top: '33px',
  padding: '5px',
  width: '35px',
  height: '37px',
  borderRightRadius: '0.375rem',
  backgroundColor: 'rgb(255, 255, 255)',
  transition: 'background-color .2s',
  cursor: 'pointer',
  opacity: '70%',
  zIndex: '2',

  _hover: {
    backgroundColor: 'rgb(228, 228, 228)',
  },
};
