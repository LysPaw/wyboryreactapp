import React, { useEffect, useReducer } from 'react';
import {
  useGetConstituencyQuery,
  GetConstituencyQuery,
  useUpdateVotersMutation,
  useUpdateCardVotersMutation,
} from '../../../generated/graphql';
import { Box, BoxProps, Flex, Input, InputProps } from '@chakra-ui/react';
import { controledValueReducer, ActionTypes, IAttendanceObj } from './controledValueReducer';
import useDebounce from '../../../utils/useDebounce';
import ReportPageStandardJSX from '../ReportPageStandardJSX';
import { cutStrings } from '../../../utils/cutStrings';

type IProps = { username: string; hour: 14 | 17 };

export const AttendanceCheckPage: React.FC<IProps> = ({ username, hour }) => {
  const [{ data, fetching }] = useGetConstituencyQuery();
  const [, updateVoters] = useUpdateVotersMutation();
  const [, updateCardVoters] = useUpdateCardVotersMutation();

  const [voters, setVoters] = useReducer(controledValueReducer, []);
  const [votersWithCard, setVotersWithCard] = useReducer(controledValueReducer, []);

  useEffect(() => {
    if ((data && voters.length === 0) || data?.getConstituency?.length !== voters.length)
      setVoters({
        type: ActionTypes.initUpdateState,
        payload:
          data?.getConstituency?.map((v) => {
            return { id: v.id, value: hour === 14 ? v.votersAt14 || 0 : v.votersAt17 || 0 };
          }) || [],
      });
    if ((data && votersWithCard.length === 0) || data?.getConstituency?.length !== votersWithCard.length)
      setVotersWithCard({
        type: ActionTypes.initUpdateState,
        payload:
          data?.getConstituency?.map((v) => {
            return { id: v.id, value: hour === 14 ? v.cardVotersAt14 || 0 : v.cardVotersAt17 || 0 };
          }) || [],
      });

    // making sure that cardVotersAt14/17 on frontend and in database is equal, when values on 'voters' are lower than values on 'votersWithCard'
    // we are preventing sending requests, if during that time values on 'votersWithCard' are changed, they will be different on frontend and database
    // Later if values on 'voters' are entered correctly then those changed values on 'votersWithCard' will not be updated.
    // This statement checks if this situation is present and overwrite values on 'votersWithCard' on frontend
    if (
      data?.getConstituency &&
      votersWithCard.length > 0 &&
      votersWithCard.every(
        (v, index) =>
          v.value !==
          (hour === 14 ? data.getConstituency![index].cardVotersAt14 : data.getConstituency![index].cardVotersAt17)
      ) &&
      votersWithCard[0].value <=
        (hour === 14 ? data.getConstituency[0].votersAt14 || 0 : data.getConstituency[0].votersAt17 || 0)
    ) {
      setVotersWithCard({
        type: ActionTypes.initUpdateState,
        payload:
          data?.getConstituency?.map((v) => {
            return { id: v.id, value: hour === 14 ? v.cardVotersAt14 || 0 : v.cardVotersAt17 || 0 };
          }) || [],
      });
    }
  }, [data, fetching]);

  const debouncedVoters = useDebounce(voters, 2000);
  const debouncedCardVoters = useDebounce(votersWithCard, 2000);

  useChangeDebounceValue(data, voters, debouncedVoters, updateVoters, hour);
  useChangeDebounceValue(data, votersWithCard, debouncedCardVoters, updateCardVoters, hour, 'cardVoters');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: number, votersType: 1 | 2 = 1) => {
    if (/^\d+$/.test(event.target.value) || event.target.value === '') {
      if (votersType === 1)
        setVoters({
          type: ActionTypes.handleChange,
          payload: { id, value: parseInt(event.target.value) || 0 },
        });
      else if (votersType === 2)
        setVotersWithCard({
          type: ActionTypes.handleChange,
          payload: { id, value: parseInt(event.target.value) || 0 },
        });
    }
  };

  return (
    <ReportPageStandardJSX
      object={data?.getConstituency || []}
      data={data || {}}
      fetching={fetching}
      text={` Poznań - attendance at ${hour === 14 ? '14:00' : '17:00'}`}>
      <>
        <Flex direction="column">
          <Flex justifyContent="space-evenly" alignItems="center">
            <Box {...flexChildrenEvenlySplit}>Constituency ID</Box>
            <Box {...flexChildrenEvenlySplit} {...hideSM}>
              Adress
            </Box>
            <Box {...flexChildrenEvenlySplit} {...hideSM}>
              Number of voters
            </Box>
            <Box {...flexChildrenEvenlySplit}>Number of voters with permission to vote</Box>
            <Box {...flexChildrenEvenlySplit}>Number of voters who received voting card</Box>
            <Box {...flexChildrenEvenlySplit} {...hideMD}>
              Attendance
            </Box>
            <Box {...flexChildrenEvenlySplit} {...hideMD}>
              Operator
            </Box>
          </Flex>
        </Flex>

        {data?.getConstituency?.map((constituency) => {
          const votersObj = voters.find((v) => v.id === constituency.id);
          const votersWithCardObj = votersWithCard.find((v) => v.id === constituency.id);

          const votersCorrectTime = hour === 14 ? constituency.votersAt14 : constituency.votersAt17;
          const cardVotersCorrectTime = hour === 14 ? constituency.cardVotersAt14 : constituency.cardVotersAt17;
          return (
            <div key={constituency.id}>
              {votersObj && constituency.electorate < votersObj.value && (
                <Flex
                  justifyContent="center"
                  textAlign="center"
                  color="red.500"
                  fontSize={{ base: '12px', sm: '14px', md: '16px' }}
                  mt="5px">
                  Number of voters with permission to vote can't be higher that number of voters.
                </Flex>
              )}
              {votersObj && votersWithCardObj && votersObj.value < votersWithCardObj.value && (
                <Flex
                  justifyContent="center"
                  textAlign="center"
                  color="red.500"
                  fontSize={{ base: '12px', sm: '14px', md: '16px' }}
                  mt="5px">
                  Number of voters who received voting card can't be higher that Number of voters with permission to
                  vote.
                </Flex>
              )}
              <Flex direction="column" position="relative" {...dataEnterColumn}>
                <Flex justifyContent="space-evenly" alignItems="center" mt={'10px'}>
                  <Box {...flexChildrenEvenlySplit}>{constituency.id}</Box>
                  <Box {...flexChildrenEvenlySplit} {...hideSM}>
                    {cutStrings(constituency.adress, 18)}
                  </Box>
                  <Box {...flexChildrenEvenlySplit} {...hideSM}>
                    {constituency.electorate}
                  </Box>
                  <Box {...flexChildrenEvenlySplit}>
                    <Input
                      step={1}
                      value={votersObj ? votersObj.value : ''}
                      onChange={(e) => handleChange(e, constituency.id)}
                      isInvalid={votersObj && constituency.electorate < votersObj.value}
                      errorBorderColor="crimson"
                      {...inputStyle}
                    />
                  </Box>
                  <Box {...flexChildrenEvenlySplit}>
                    <Input
                      step={1}
                      value={votersWithCardObj ? votersWithCardObj.value : ''}
                      onChange={(e) => handleChange(e, constituency.id, 2)}
                      isInvalid={votersObj && votersWithCardObj && votersObj.value < votersWithCardObj.value}
                      errorBorderColor="crimson"
                      {...inputStyle}
                    />
                  </Box>
                  <Box {...flexChildrenEvenlySplit} {...hideMD}>
                    {hour === 14
                      ? votersCorrectTime && cardVotersCorrectTime
                        ? ((cardVotersCorrectTime / votersCorrectTime) * 100).toFixed(2)
                        : '- '
                      : votersCorrectTime && cardVotersCorrectTime
                      ? ((cardVotersCorrectTime / votersCorrectTime) * 100).toFixed(2)
                      : '- '}
                    %
                  </Box>
                  <Box {...flexChildrenEvenlySplit} {...hideMD}>
                    {username}
                  </Box>
                </Flex>
              </Flex>
            </div>
          );
        })}
      </>
    </ReportPageStandardJSX>
  );
};

type IObjString = 'votersAt14' | 'votersAt17' | 'cardVotersAt14' | 'cardVotersAt17';

const useChangeDebounceValue = (
  data: GetConstituencyQuery | undefined,
  voters: IAttendanceObj[],
  debouncedVoters: IAttendanceObj[] | undefined,
  updateVoters: any,
  hour: 14 | 17,
  votersName: 'voters' | 'cardVoters' = 'voters'
) => {
  useEffect(() => {
    let constituencyWithChangedValue: IAttendanceObj[] = [];
    const objString: IObjString = (votersName + (hour === 14 ? 'At14' : 'At17')) as IObjString;

    if (data?.getConstituency && voters.length > 0 && debouncedVoters) {
      data.getConstituency.forEach((c, index) => {
        if (voters[index].value !== 0 && c[objString] !== voters[index].value && c.electorate >= voters[index].value)
          if (votersName === 'cardVoters') {
            if ((hour === 14 ? c.votersAt14 || 0 : c.votersAt17 || 0) >= voters[index].value) {
              constituencyWithChangedValue = [...constituencyWithChangedValue, voters[index]];
            }
          } else constituencyWithChangedValue = [...constituencyWithChangedValue, voters[index]];
      });
    }

    if (constituencyWithChangedValue.length > 0) {
      (async () => {
        for (const c of constituencyWithChangedValue) {
          await updateVoters({
            constituencyId: c.id,
            [votersName]: c.value,
            timeAt: hour,
          });
        }
      })();
    }
  }, [debouncedVoters]);
};

const dataEnterColumn: BoxProps = {
  borderTop: '1px solid #000',
  borderBottom: '1px solid #000',
  paddingY: '25px',
  mt: '10px',
  background: '#f5f3f3',
};

const inputStyle: InputProps = {
  width: { base: '100%', sm: '80%', md: '60%' },
  background: '#fff',
  boxShadow: 'inset 0px 0px 1px 1px rgba(0, 0, 0, .3) ',
  border: '1px solid #000',
  paddingX: '10px',

  _focus: {
    zIndex: '1',
    borderColor: '#6d6d6d',
    boxShadow: '0 0 0 1px #7a7a7a',
  },
};

const flexChildrenEvenlySplit: BoxProps = {
  flexGrow: 1,
  flexBasis: 0,
  textAlign: 'center',
  paddingX: '8px',
  overflowX: 'hidden',
};

const hideMD: BoxProps = {
  display: { base: 'none', md: 'initial' },
};

const hideSM: BoxProps = {
  display: { base: 'none', sm: 'initial' },
};
