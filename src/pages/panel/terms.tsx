import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { Box, Divider, Flex, ListItem, UnorderedList } from '@chakra-ui/react';
import { ProtectedLayout } from '../../components/Layout';

const TermsOfUse = () => {
  const dummyText = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
 dolore magna aliqua. Mattis molestie a iaculis at erat pellentesque adipiscing commodo.`,
    `Tempor nec feugiat nisl pretium fusce id. Volutpat blandit aliquam etiam erat velit scelerisque. Quisque
 id diam vel quam elementum pulvinar etiam.`,
    `Varius sit amet mattis vulputate enim nulla aliquet porttitor. Velit egestas dui id ornare arcu odio ut
 sem nulla.`,
    'Diam sollicitudin tempor id eu nisl. Sagittis vitae et leo duis ut. Bibendum arcu vitae elementum curabitur vitae.',
  ];

  return (
    <ProtectedLayout variant="small">
      <Box>
        <Box fontSize="20px" fontWeight="500" pb="5px">
          Terms of use
        </Box>
        <Divider />
        <UnorderedList listStyleType="none" ml="5px">
          {dummyText.map((v, index) => displayHelper(v, index))};
        </UnorderedList>
      </Box>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(TermsOfUse);

const displayHelper = (text: string, index: number) => {
  return (
    <ListItem mt="10px">
      <Flex>
        <Box mr="8px">{index + 1}.</Box>
        <Box>{text}</Box>
      </Flex>
    </ListItem>
  );
};
