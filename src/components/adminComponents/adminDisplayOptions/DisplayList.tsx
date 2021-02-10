import React, { useState, useEffect, useReducer } from 'react';
import { Box, Icon, Button, useDisclosure, Flex, Spinner } from '@chakra-ui/react';
import { HiCheck, HiArrowDown, HiPlus, HiPencil, HiTrash } from 'react-icons/hi';
import * as Styled from '../../styledComponents/adminDisplayListStyle';
import { adminListReducer, ActionTypes } from '../adminListReducer';
import { ProtectedLayout } from '../../Layout';
import NextLink from 'next/link';
import { cutStrings } from '../../../utils/cutStrings';
import { DisplayListEditModal } from './DisplayListEditModal';
import { DisplayDeleteModal } from './DisplayListEditModal';

export type IData = IUser &
  IUnregistedUser &
  IConstituency & {
    typename: 'User' | 'PreActivatedUser' | 'Constituency';
  };

type IProps = {
  title: string;
  titleOptions?: typeof titleOptionsInit;
  data: IData[];
  fetching: boolean;
  onChangeDataMutation: any;
  onDeleteDataMutation: any;
  onAssignOperatorMutation?: any;
  onClearAssignedOperatorMutation?: any;
};

export type ISelectedData =
  | {
      id: number;
      typename: 'Constituency' | 'User' | 'PreActivatedUser';
      selected?: boolean;
    }
  | undefined;

const titleOptionsInit = {
  main: 'Full name',
  secondary: 'Username', // display none from 768px to 0
  tertiary: 'Constituencies', // display none from 480px to 0
};

export const DisplayList: React.FC<IProps> = ({
  titleOptions = titleOptionsInit,
  title,
  data,
  fetching,
  onChangeDataMutation,
  onDeleteDataMutation,
  onAssignOperatorMutation,
  onClearAssignedOperatorMutation,
}) => {
  const [selectedData, setSelectedData] = useState<ISelectedData>(undefined);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedObj, setSelectedObj] = useReducer(adminListReducer, []);
  const [multipleDelete, setMultipleDelete] = useState(false);

  const { onClose } = useDisclosure();

  useEffect(() => {
    if ((data && selectedObj.length === 0) || data.length !== selectedObj.length)
      setSelectedObj({
        type: ActionTypes.initUpdateState,
        payload: data.map((value) => {
          return { id: value.id, typename: value.typename!, selected: false };
        }),
      });
  }, [data, fetching]);

  const onDeleteBtnClick = () => {
    setShowDeleteModal(!showDeleteModal);
    if (selectedObj.length > 0) {
      const check = selectedObj.filter((value) => value.selected);
      if (check.length > 0) {
        if (!multipleDelete) {
          setMultipleDelete(true);
        }
      }
    }
  };
  const closeEditModal = () => {
    onClose();
    setSelectedData(undefined);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal);
    setSelectedData(undefined);
    if (multipleDelete) {
      setMultipleDelete(false);
    }
  };

  if (fetching) {
    return (
      <Flex mt="15px" justifyContent="center">
        <Spinner size="lg" />
      </Flex>
    );
  }

  return (
    <ProtectedLayout variant="regular" privilages>
      <DisplayListEditModal
        isOpenEditModal={!!selectedData && !showDeleteModal}
        onCloseEditModal={closeEditModal}
        data={
          selectedData && data.find((data) => data.id === selectedData.id && data.typename === selectedData.typename)
        }
        onChangeDataMutation={onChangeDataMutation}
        onDeleteDataMutation={onDeleteDataMutation}
        onAssignOperatorMutation={data[0]?.typename === 'Constituency' ? onAssignOperatorMutation : null}
        onClearAssignedOperatorMutation={data[0]?.typename === 'Constituency' ? onClearAssignedOperatorMutation : null}
      />
      <DisplayDeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        data={
          multipleDelete
            ? (selectedObj
                .map((value) =>
                  value.selected ? data.find((data) => data.id === value.id && data.typename === value.typename) : {}
                )
                .filter((obj) => obj && Object.keys(obj).length !== 0) as IData[])
            : selectedData && [
                data.find((data) => data.id === selectedData.id && data.typename === selectedData.typename) as IData,
              ]
        }
        onDeleteDataMutation={onDeleteDataMutation}
      />
      <Box {...Styled.WrapperTop}>
        {selectedObj.every((value) => value.selected === false) ? (
          <NextLink
            href={
              title.includes('constituencies')
                ? '/admin/add-constituency?from=/admin/constituencies'
                : '/admin/add-user?from=/admin/users'
            }>
            <Button {...Styled.TopBtn}>
              <Icon as={HiPlus} color="blue.500" mr="2px" mt="1px" /> New
            </Button>
          </NextLink>
        ) : null}
        {selectedObj.filter((value) => value.selected).length === 1 ? (
          <Button {...Styled.TopBtn} onClick={() => setSelectedData(selectedObj.find((data) => data.selected))}>
            <Icon as={HiPencil} color="blue.500" mr="2px" mt="1px" /> Edit
          </Button>
        ) : null}
        {selectedObj.filter((value) => value.selected).length > 0 ? (
          <Button {...Styled.TopBtn} onClick={() => onDeleteBtnClick()}>
            <Icon as={HiTrash} color="red.500" mr="2px" mt="1px" /> Delete
          </Button>
        ) : null}
      </Box>
      <Box {...Styled.WrapperBox}>
        <Box {...Styled.WrapperBoxTitle}>{title}</Box>
        <ul style={Styled.ContentList}>
          <Box as="li" {...Styled.ContentListItem} height="33px">
            <Box
              {...Styled.ContentListItemCheckbox}
              onClick={() =>
                setSelectedObj({
                  type: selectedObj.every((value) => value.selected)
                    ? ActionTypes.deselectAllElements
                    : ActionTypes.selectAllElements,
                })
              }>
              <Box
                {...Styled.ContentListItemCheckboxCircle}
                style={{
                  background:
                    selectedObj.length > 0 && selectedObj.every((value) => value.selected)
                      ? 'rgb(0, 176, 240)'
                      : 'rgb(255, 255, 255)',
                }}>
                {selectedObj.length > 0 && selectedObj.every((value) => value.selected) ? (
                  <Icon
                    {...Styled.ContentListItemCheckboxIcon}
                    padding="20%"
                    opacity="1"
                    color="rgb(255, 255, 255)"
                    as={HiCheck}
                  />
                ) : (
                  <Icon
                    {...Styled.ContentListItemCheckboxIcon}
                    padding="20%"
                    opacity="0"
                    _hover={{ opacity: '0.3' }}
                    color="black"
                    as={HiCheck}
                  />
                )}
              </Box>
            </Box>
            <Flex flex="12">
              <Box {...Styled.ContentListItemTitle} flex="4" paddingLeft="15px">
                {titleOptions.main}
                <Icon marginLeft="2px" marginTop="1px" fontSize="12px" as={HiArrowDown} />
              </Box>
              <Box
                {...Styled.ContentListItemTitle}
                flex="4"
                display={{ base: 'none', md: titleOptions.secondary ? 'flex' : 'none' }}>
                {titleOptions.secondary}
                <Icon marginLeft="2px" marginTop="1px" fontSize="12px" as={HiArrowDown} />
              </Box>
              <Box
                {...Styled.ContentListItemTitle}
                flex="4"
                display={{ base: 'none', sm: titleOptions.tertiary ? 'flex' : 'none' }}>
                {titleOptions.tertiary}
                <Icon marginLeft="2px" marginTop="1px" fontSize="12px" as={HiArrowDown} />
              </Box>
            </Flex>
            <Box {...Styled.ContentListItemTitle} display="flex" justifyContent="center" />
          </Box>
          {data.map((value, index) => {
            const selectObj = selectedObj.find(
              (element) => element.id === value.id && element.typename === value.typename
            );
            return (
              <Box as="li" {...Styled.ContentListItem} key={index}>
                <Box
                  {...Styled.ContentListItemCheckbox}
                  onClick={() =>
                    setSelectedObj({
                      type: ActionTypes.selectElement,
                      payload: { id: value.id, typename: value.typename!, selected: !selectObj?.selected },
                    })
                  }>
                  <Box
                    {...Styled.ContentListItemCheckboxCircle}
                    style={{ background: selectObj?.selected ? 'rgb(0, 176, 240)' : 'rgb(255, 255, 255)' }}>
                    {selectObj?.selected ? (
                      <Icon
                        {...Styled.ContentListItemCheckboxIcon}
                        opacity="1"
                        color="rgb(255, 255, 255)"
                        as={HiCheck}
                      />
                    ) : (
                      <Icon
                        {...Styled.ContentListItemCheckboxIcon}
                        opacity="0"
                        _hover={{ opacity: '0.3' }}
                        color="black"
                        as={HiCheck}
                      />
                    )}
                  </Box>
                </Box>
                <Flex
                  flex="12"
                  cursor="pointer"
                  _hover={{
                    background: 'rgb(244, 244, 244)',
                  }}
                  onClick={() => setSelectedData({ id: value.id, typename: value.typename })}>
                  <Box {...Styled.ContentListItemTitle} paddingLeft="15px">
                    <Box>
                      {value.typename === 'Constituency'
                        ? value.id
                        : cutStrings(value.firstName + ' ' + value.lastName)}
                    </Box>
                  </Box>
                  {titleOptions.secondary ? (
                    <Box {...Styled.ContentListItemTitle} display={{ base: 'none', md: 'flex' }}>
                      <Box>{value.typename === 'Constituency' ? cutStrings(value.adress) || '-' : value.username}</Box>
                    </Box>
                  ) : null}
                  {titleOptions.tertiary ? (
                    <Box {...Styled.ContentListItemTitle} display={{ base: 'none', sm: 'flex' }}>
                      <Box>
                        {value.typename === 'Constituency'
                          ? value.operator?.id || '-'
                          : value.constituenciesIds
                          ? cutStrings(value.constituenciesIds)
                          : '-'}
                      </Box>
                    </Box>
                  ) : null}
                </Flex>

                <Box {...Styled.ContentListItemTitle} justifyContent="center" borderLeft="1px solid rgb(234, 234, 234)">
                  <Box
                    width="42px"
                    height="42px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    cursor="pointer"
                    _hover={{ background: '#cbd0d8', color: 'red.500', transition: 'all .1s' }}
                    onClick={() => (
                      setSelectedData({ id: value.id, typename: value.typename! }), setShowDeleteModal(!showDeleteModal)
                    )}>
                    <Icon as={HiTrash} fontSize="20px" />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </ul>
      </Box>
    </ProtectedLayout>
  );
};

type IGenericUser = {
  id?: number;
  username?: string;
  emailAdress?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  secondName?: string;
};

type IUser = IGenericUser & { constituenciesIds?: string };

type IUnregistedUser = IGenericUser & { activationCode?: string };

type IConstituency = { id: number; operator: IUser; adress: string; electorate: number };
