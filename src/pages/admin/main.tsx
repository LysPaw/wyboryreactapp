import React, { useReducer } from 'react';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { HiOutlineUserGroup, HiChevronDown, HiOfficeBuilding, HiClipboardList } from 'react-icons/hi';
import { ProtectedLayout } from '../../components/Layout';
import NextLink from 'next/link';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { adminMainReducer, ActionTypes } from '../../components/adminComponents/adminMainReducer';
import { StyledBox, StyledWrapperBox } from '../../components/styledComponents/adminMainStyle';
import { StyledLink } from '../../components/styledComponents/styledLink';

const mainBtnOptions = [
  {
    groupTitle: 'Manage operators',
    icon: HiOutlineUserGroup,
    groupBtn: [
      { title: 'Get list of operators', link: '/admin/users' },
      { title: 'Add new operator', link: '/admin/add-user' },
    ],
  },
  {
    groupTitle: 'Manage constituencies',
    icon: HiOfficeBuilding,
    groupBtn: [
      { title: 'Get list of constituencies', link: '/admin/constituencies' },
      { title: 'Add new constituency', link: '/admin/add-constituency' },
    ],
  },
  {
    groupTitle: 'Manage reports',
    icon: HiClipboardList,
    groupBtn: [{ title: 'Check reports', link: '/admin/reports' }],
  },
];

const Main = () => {
  //const router = useRouter();
  const [btnState, setBtnState] = useReducer(
    adminMainReducer,
    mainBtnOptions.map(() => false)
  );

  return (
    <ProtectedLayout variant="small" privilages>
      {mainBtnOptions.map((value, index) => {
        return (
          <Box {...StyledWrapperBox} key={index}>
            <Box {...StyledBox} onClick={() => setBtnState({ type: ActionTypes.getOperators, payload: index })}>
              <Flex p="6px 10px" alignItems="center">
                <Icon as={value.icon} />
                <Box mx="6px" userSelect="none">
                  {value.groupTitle}
                </Box>
                <Flex flex="1" justifyContent="flex-end">
                  <Icon as={HiChevronDown} />
                </Flex>
              </Flex>
            </Box>
            {btnState[index] &&
              value.groupBtn.map((btn, index) => {
                return (
                  <Flex key={index} alignItems="center" justifyContent="center" minH="60px">
                    <NextLink href={btn.link}>
                      <Link {...StyledLink} userSelect="none">
                        {btn.title}
                      </Link>
                    </NextLink>
                  </Flex>
                );
              })}
          </Box>
        );
      })}
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Main);
