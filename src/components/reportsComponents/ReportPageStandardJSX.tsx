import { Flex, Box, Button, Icon, BoxProps, Spinner } from '@chakra-ui/react';
import React from 'react';
import { HiArrowLeft, HiOutlineClipboardCopy } from 'react-icons/hi';
import { useRouter } from 'next/router';

interface IProps<T, O> {
  object: T[];
  data: O;
  protocols?: boolean;
  fetching: boolean;
  text?: string;
}

const ReportPageStandardJSX = <T, O extends object>(props: IProps<T, O> & { children?: React.ReactNode }) => {
  const router = useRouter();

  if (!props.data || props.fetching) {
    return (
      <Flex justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  if (props.object && props.object.length === 0) {
    return (
      <Flex direction="column">
        <Box {...borderBox}>
          <Flex justifyContent="flex-end" w="80%" mx="auto">
            <Button colorScheme="blue" onClick={() => router.push('/panel')}>
              <Icon as={HiArrowLeft} mr="4px" mt="2px" />
              Go back
            </Button>
          </Flex>
        </Box>
        <Flex {...dataEnterColumn} justifyContent="center" textAlign="center">
          You are not assigned to any constituency.
        </Flex>
      </Flex>
    );
  } else
    return (
      <Flex direction="column">
        <Box {...borderBox}>
          <Flex
            justifyContent={props.protocols ? 'space-between' : 'flex-end'}
            w={props.protocols ? '90%' : '80%'}
            mx="auto">
            {props.protocols && (
              <Button colorScheme="green" mr="5px" onClick={() => router.push('/panel/protocols')}>
                <Icon as={HiOutlineClipboardCopy} mr="4px" mt="2px" />
                Manage protocols
              </Button>
            )}
            <Button colorScheme="blue" onClick={() => router.push('/panel')}>
              <Icon as={HiArrowLeft} mr="4px" mt="2px" />
              Go back
            </Button>
          </Flex>
        </Box>
        <Box {...borderBox}>
          <Box fontSize={{ base: '18px', sm: '27px' }} fontWeight="500" w="80%" mx="auto">
            {props.text || ''}
          </Box>
        </Box>
        {props.children}
      </Flex>
    );
};

export default ReportPageStandardJSX;

const dataEnterColumn: BoxProps = {
  borderTop: '1px solid #000',
  borderBottom: '1px solid #000',
  paddingY: '25px',
  mt: '10px',
  background: '#f5f3f3',
};

const borderBox: BoxProps = {
  borderBottom: '1px solid #eaeaea',
  pb: '15px',
  mb: '15px',
};
