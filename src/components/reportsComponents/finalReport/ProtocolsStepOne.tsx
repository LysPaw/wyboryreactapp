import { Box, BoxProps, Button, Divider, Icon, Flex, ListItem, UnorderedList, ListItemProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { GetConstituencyQuery } from '../../../generated/graphql';
import { cutStrings } from '../../../utils/cutStrings';
import { HiOutlinePencilAlt, HiX } from 'react-icons/hi';

type IProps = {
  constituencyId: null | number;
  setConstituencyId: React.Dispatch<React.SetStateAction<number | null>>;
  data: GetConstituencyQuery | undefined;
  availableStep: number;
  setAvailableStep: React.Dispatch<React.SetStateAction<number>>;
  setStep: React.Dispatch<React.SetStateAction<number>>;
};

const ProtocolsStepOne: React.FC<IProps> = ({
  data,
  setConstituencyId,
  constituencyId,
  availableStep,
  setAvailableStep,
  setStep,
}) => {
  const [constituency, setConstituency] = useState<{ id: number; adress: string }[]>([]);

  useEffect(() => {
    if (data?.getConstituency && data.getConstituency.length > 0) {
      setConstituency(
        data.getConstituency.map((c) => {
          return { id: c.id, adress: c.adress };
        })
      );
    }
  }, []);

  const onProtocolBtnClick = (id: number) => {
    if (id === constituencyId) {
      setConstituencyId(null);
      setAvailableStep(1);
    } else {
      setConstituencyId(id);
      availableStep === 1 && setAvailableStep(2);
      setStep(2);
    }
  };

  return (
    <Box {...mainWrapper}>
      <Flex
        display="flex"
        alignItems="center"
        padding="8px"
        fontWeight="500"
        backgroundColor="#eeecec"
        border="1px solid #dfdfdf"
        borderRadius="5px"
        mb="7px">
        Available constituencies
      </Flex>
      <UnorderedList listStyleType="none" margin="0">
        {constituency.length > 0 &&
          constituency.map((c) => {
            return (
              <ListItem key={c.id} {...listItem(constituencyId === c.id)}>
                <Flex {...listItemFlex}>
                  <Box {...listItemFlexChild('0 1 100px')}>ID</Box>
                  <Box {...listItemFlexChild('2')} display={{ base: 'none', md: 'initial' }}>
                    Adress
                  </Box>
                  <Box {...listItemFlexChild('1')} />
                </Flex>
                <Divider />
                <Flex {...listItemFlex}>
                  <Box {...listItemFlexChild('0 1 100px')}>{c.id}</Box>
                  <Box {...listItemFlexChild('2')} display={{ base: 'none', md: 'initial' }}>
                    {cutStrings(c.adress, 50)}
                  </Box>
                  <Box {...listItemFlexChild('1')}>
                    <Flex justifyContent="center" alignItems="center" direction={{ base: 'column', sm: 'row' }}>
                      <Button
                        colorScheme={constituencyId === c.id ? 'red' : 'blue'}
                        onClick={() => onProtocolBtnClick(c.id)}>
                        <Icon as={constituencyId === c.id ? HiX : HiOutlinePencilAlt} mt="2px" mr="3px" />{' '}
                        {constituencyId === c.id ? 'Exit current protocol' : 'Create/edit protocol'}
                      </Button>
                    </Flex>
                  </Box>
                </Flex>
              </ListItem>
            );
          })}
      </UnorderedList>
    </Box>
  );
};

export default ProtocolsStepOne;

const mainWrapper: BoxProps = {
  marginTop: '80px',
};

const listItem: (selected?: boolean) => ListItemProps = (selected = false) => {
  return {
    border: selected ? '1px solid #b3ccac' : '1px solid #afafaf',
    background: selected ? '#e6f1de' : '#fff',
    borderRadius: '5px',
    padding: '15px 10px',
    marginBottom: '25px',
  };
};

const listItemFlex: BoxProps = {
  fontWeight: '500',
  marginY: '5px',
  alignItems: 'center',
};

const listItemFlexChild = (flexNumber: string) => {
  return { paddingLeft: '8px', flex: flexNumber };
};
