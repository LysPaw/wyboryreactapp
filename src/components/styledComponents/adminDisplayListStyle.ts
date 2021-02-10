import { CSSProperties } from 'react';
import { BoxProps, ButtonProps, IconProps } from '@chakra-ui/react';

export const WrapperTop = {
  maxWidth: '820px',
  mx: 'auto',
  mb: '5px',
  display: 'flex',
};

export const TopBtn: ButtonProps = {
  mr: '5px',
  _focus: {
    outline: 'none',
  },
  _active: { background: '#cbd0d8' },
};

export const WrapperBox: BoxProps = {
  padding: '10px 32px 20px',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: '32px',
  whiteSpace: 'nowrap',
  maxWidth: '820px',
  mx: 'auto',
};

export const WrapperBoxTitle = {
  fontSize: '21px',
  paddingBottom: '16px',
};

export const ContentList: CSSProperties = {
  margin: '0px',
  padding: '0px',
  display: 'flex',
  flexDirection: 'column',
  listStyle: 'none',
};

export const ContentListItem: BoxProps = {
  display: 'flex',
  fontSize: '14px',
  position: 'relative',
  lineHeight: '32px',
  whiteSpace: 'nowrap',
  marginBottom: '1px',
  userSelect: 'none',
  borderBottom: '1px solid rgb(234, 234, 234)',
  height: '43px',

  _last: {
    borderBottom: 'none',
  },
};

export const ContentListItemCheckbox: BoxProps = {
  width: '49px',
  minWidth: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'auto',
  position: 'relative',
  cursor: 'pointer',
  borderRight: '1px solid rgb(234, 234, 234)',

  _hover: { background: '#ebebeb' },
};

export const ContentListItemCheckboxCircle = {
  lineHeight: '1',
  width: '18px',
  height: '18px',
  borderRadius: '50%',
  border: '1px solid rgba(0, 0, 0, 0.3)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const ContentListItemCheckboxIcon: IconProps = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  padding: '30%',
};

export const ContentListItemTitle = {
  flex: '1',
  paddingLeft: '0.2rem',
  display: 'flex',
  alignItems: 'center',
};

/*
style={Styled.ContentList}
*/
