import React from 'react';
import { Box, Flex, Icon } from '@chakra-ui/react';
import { HiQuestionMarkCircle, HiPlusCircle } from 'react-icons/hi';

type IProps = { display?: boolean; topCss?: string; variant?: 'blue' | 'green'; onClickFnc: () => void };

const MainPageTooltip: React.FC<IProps> = ({
  display = false,
  variant = 'blue',
  topCss = '60px',
  children,
  onClickFnc,
}) => {
  if (!display) return null;

  const background = variant === 'blue' ? '#41a9da' : '#319795';
  return (
    <Box position="fixed" top={topCss} left="0" zIndex="3">
      <Box minW="240px" margin="0.5rem">
        <Flex
          overflow="hidden"
          paddingLeft="0.75rem"
          paddingRight="2rem"
          paddingTop="0.75rem"
          paddingBottom="0.75rem"
          background={background}
          color="#FFFFFF"
          borderRadius="0.375rem"
          boxShadow="0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)"
          textAlign="left"
          position="relative">
          <Flex
            width="26px"
            height="26px"
            position="absolute"
            top="1px"
            right="1px"
            justifyContent="center"
            alignItems="center"
            cursor="pointer"
            borderRadius="50%"
            _hover={{ background: '#fff', color: 'red.400', transition: 'all .2s' }}
            onClick={onClickFnc}>
            <Icon as={HiPlusCircle} transform="rotate(45deg)" fontSize="26px" />
          </Flex>

          <Icon as={HiQuestionMarkCircle} marginRight="0.75rem" width="1.25rem" height="1.5rem" />
          <Box flex="1">{children}</Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default MainPageTooltip;
