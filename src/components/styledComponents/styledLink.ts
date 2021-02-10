import { LinkProps } from '@chakra-ui/react';

export const StyledLink: LinkProps = {
  width: '70%',
  backgroundColor: '#41a5c4',
  color: 'white',
  padding: '7px 0',
  borderRadius: '5px',
  textAlign: 'center',
  border: '1px solid #287f99',

  _hover: {
    backgroundColor: '#287f99',
    textDecoration: 'none',
  },
};
