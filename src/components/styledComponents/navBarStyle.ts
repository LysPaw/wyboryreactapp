import { ButtonProps } from '@chakra-ui/react';

export const StyledButton: ButtonProps = {
  fontWeight: '400',
  transition: 'all .2s',
  padding: '1rem 1.2rem',
  height: '100%',
  borderRadius: '0',
  position: 'relative',
  color: 'rgb(202, 202, 202)',

  _hover: { color: 'rgb(215, 215, 215)', backgroundColor: 'rgb(50, 50, 50)' },
  _focus: {
    outline: 'none',
  },
  _active: {
    color: 'rgb(215, 215, 215)',
    backgroundColor: 'rgb(30, 30, 30)',
  },
};

export const StyledLink = {
  margin: '0 0.5rem',
  transition: 'color .2s',
  padding: '.5rem 0',
  color: 'rgb(202, 202, 202)',

  _hover: {
    color: 'rgb(215, 215, 215)',
    textDecoration: 'underline',
  },
};
