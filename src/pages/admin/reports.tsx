import React, { useState, useEffect } from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { useGetListOfConstituenciesQuery } from '../../generated/graphql';
import { ProtectedLayout } from '../../components/Layout';
import { Flex, Box, Button, Icon, BoxProps, UnorderedList, Textarea, Input } from '@chakra-ui/react';
import { HiArrowLeft, HiShieldCheck, HiShieldExclamation, HiChevronDown, HiChevronUp } from 'react-icons/hi';
import { useRouter } from 'next/router';
import { cutStrings } from '../../utils/cutStrings';
import returnStringFromKeyAdminReports, {
  checkForImportantReportKeys,
  isTextArea,
  sectionDividers,
  emptyFieldError,
} from '../../components/reportsComponents/finalReport/returnStringFromKeyAdminReports';

type ISummaryData = {
  reports: number;
  electorate: number;
  attendance14: number;
  attendance17: number;
  attendanceEnd: number;
};

const Reports = () => {
  const router = useRouter();
  const [{ data, fetching }] = useGetListOfConstituenciesQuery();
  const [reports, setReports] = useState<
    ({
      parsedReport: Record<string, string>;
      operator: string;
      adress: string;
      sortedReportKeys: string[];
      id: number;
    } | null)[]
  >([]);
  const [displayDetailedReports, setDisplayDetailedReports] = useState<{ id: number; display: boolean }[]>([]);
  const [reportError, setReportError] = useState<string[]>([]);
  const [summaryData, setSummaryData] = useState<ISummaryData>({
    reports: 0,
    electorate: 0,
    attendance14: 0,
    attendance17: 0,
    attendanceEnd: 0,
  });

  useEffect(() => {
    if (data?.getListOfConstituencies && data?.getListOfConstituencies.length > 0) {
      let _summaryData: ISummaryData & { maxAttendance14: number; maxAttendance17: number } = {
        ...summaryData,
        maxAttendance14: 0,
        maxAttendance17: 0,
      };

      const reportArr = data.getListOfConstituencies
        .map((c) => {
          if (c.finalReport) {
            const parsedReport = JSON.parse(c.finalReport) as Record<string, string>;

            _summaryData = {
              reports: _summaryData.reports + 1,
              electorate: _summaryData.electorate + c.electorate,
              attendance14: _summaryData.attendance14 + (c.cardVotersAt14 ? c.cardVotersAt14 : 0),
              attendance17: _summaryData.attendance17 + (c.cardVotersAt17 ? c.cardVotersAt17 : 0),
              attendanceEnd: _summaryData.attendanceEnd + (parsedReport?.a2 ? parseInt(parsedReport.a2) : 0),
              maxAttendance14: _summaryData.maxAttendance14 + (c.votersAt14 ? c.votersAt14 : 0),
              maxAttendance17: _summaryData.maxAttendance17 + (c.votersAt17 ? c.votersAt17 : 0),
            };

            return {
              id: c.id,
              parsedReport,
              operator: c.operator?.username || '-',
              adress: c.adress || '-',
              sortedReportKeys: Object.keys(parsedReport)
                .map((key) => {
                  if (checkForImportantReportKeys(key)) return key;
                  else return undefined;
                })
                .filter((v) => v)
                .sort() as string[],
            };
          } else return null;
        })
        .filter((v) => v);

      if (reportArr) {
        setReports(reportArr);

        setDisplayDetailedReports(
          reportArr.map((v) => {
            return { id: v?.id || -1, display: false };
          })
        );

        const errorReportConstituencyIDArray = reportArr
          .map((v) => {
            if (v?.parsedReport) {
              for (const [key, value] of Object.entries(v.parsedReport)) {
                if (emptyFieldError(key, value as string)) {
                  return v.id.toString();
                }
              }
            }

            return '';
          })
          .filter((v) => v);

        if (errorReportConstituencyIDArray.length > 0) {
          setReportError(errorReportConstituencyIDArray);
        }
      }

      if (_summaryData.reports > 0) {
        setSummaryData({
          reports: _summaryData.reports,
          electorate: _summaryData.electorate,
          attendance14: (_summaryData.attendance14 / _summaryData.maxAttendance14) * 100,
          attendance17: (_summaryData.attendance17 / _summaryData.maxAttendance17) * 100,
          attendanceEnd: (_summaryData.attendanceEnd / _summaryData.electorate) * 100,
        });
      }
    }
  }, [data]);

  return (
    <ProtectedLayout privilages>
      <Flex direction="column">
        <Box {...borderBox}>
          <Flex justifyContent="flex-end" w="80%" mx="auto">
            <Button colorScheme="blue" onClick={() => router.push('/panel')}>
              <Icon as={HiArrowLeft} mr="4px" mt="2px" />
              Go back
            </Button>
          </Flex>
        </Box>
        <Flex
          justifyContent="center"
          textAlign="center"
          fontSize={{ base: '22px', md: '26px' }}
          fontWeight="500"
          p="20px 10px">
          Final results of voting for the president of San Escobar carried out in 05.02.2021
        </Flex>
        {!fetching && data?.getListOfConstituencies && data.getListOfConstituencies.length > 0 && reports.length > 0 ? (
          <Flex {...dataEnterColumn} justifyContent="center" textAlign="center" direction="column">
            <Flex justifyContent="center" textAlign="center" fontSize="20px" fontWeight="500" p="10px 5px">
              Overall summary
            </Flex>
            <Flex direction={{ base: 'row', md: 'column' }}>
              <Flex
                direction={{ base: 'column', md: 'row' }}
                flex={{ base: '2', md: '1' }}
                alignItems="center"
                justifyContent="center">
                <Box flex="1">Number of reports</Box>
                <Box flex="1">Electorate</Box>
                <Box flex="1">Attendance at 14:00</Box>
                <Box flex="1">Attendance at 17:00</Box>
                <Box flex="1">Attendance at the end</Box>
              </Flex>
              <Flex
                marginY={{ base: '0', md: '10px' }}
                paddingY={{ base: '0', md: '10px' }}
                borderY={{ base: 'none', md: '1px solid #000' }}
                background={{ base: 'none', md: '#f0f0f0' }}
                direction={{ base: 'column', md: 'row' }}
                flex="1">
                <Box flex="1">{summaryData.reports}</Box>
                <Box flex="1">{summaryData.electorate}</Box>
                <Box flex="1">{summaryData.attendance14.toFixed(2)}%</Box>
                <Box flex="1">{summaryData.attendance17.toFixed(2)}%</Box>
                <Box flex="1">{summaryData.attendanceEnd.toFixed(2)}%</Box>
              </Flex>
            </Flex>
            {reportError.length === 0 ? (
              <Box color="#477e22" mt="8px">
                <Icon as={HiShieldCheck} mb="2px" mr="3px" />
                All reports are complete.
              </Box>
            ) : (
              <Box color="#DD6B20" mt="8px">
                <Icon as={HiShieldExclamation} mb="2px" mr="3px" />
                Some reports are incomplete.
              </Box>
            )}
          </Flex>
        ) : (
          <Flex {...dataEnterColumn} background="#f5f3f3" justifyContent="center" textAlign="center">
            Absence of correctly submitted reports by any constituency.
          </Flex>
        )}
      </Flex>
      <Box>
        <Flex justifyContent="center" textAlign="center" fontSize="20px" fontWeight="500" p="10px 5px">
          Submitted reports
        </Flex>
        <Box>
          <UnorderedList listStyleType="none" margin="0">
            <>
              <Flex direction="column">
                <Flex alignItems="center">
                  <Box {...flexChildrenEvenlySplit}>Creation date</Box>
                  <Flex {...flexChildrenEvenlySplit} justifyContent="center">
                    <Box mr="5px" display={{ base: 'none', md: 'initial' }}>
                      Constituency
                    </Box>
                    ID
                  </Flex>
                  <Box {...flexChildrenEvenlySplit} {...hideSM}>
                    Operator
                  </Box>
                  <Box {...flexChildrenEvenlySplit} {...hideMD}>
                    Adress
                  </Box>
                  <Box {...flexChildrenEvenlySplit} flex="1" />
                </Flex>
              </Flex>

              {reports.map((finalReport) => {
                const showDetailedReport = displayDetailedReports.find((v) => v.id === finalReport?.id);

                if (finalReport && finalReport.sortedReportKeys.length > 0) {
                  const variant = !!!reportError.find((v) => v === finalReport.id.toString());
                  return (
                    <Box
                      key={finalReport.id}
                      borderBottom="1px solid #000"
                      background={variant ? '#deffd1' : '#f7ffc7'}
                      mx="5px">
                      <Flex
                        direction="column"
                        {...reportColumn(variant)}
                        onClick={() =>
                          showDetailedReport &&
                          setDisplayDetailedReports(
                            displayDetailedReports.map((v) =>
                              v.id === showDetailedReport.id ? { id: v.id, display: !showDetailedReport.display } : v
                            )
                          )
                        }>
                        <Flex alignItems="center">
                          <Box {...flexChildrenEvenlySplit}>{finalReport.parsedReport.creationTime || '-'}</Box>
                          <Box {...flexChildrenEvenlySplit}>{finalReport.id}</Box>
                          <Box {...flexChildrenEvenlySplit} {...hideSM}>
                            {finalReport.operator}
                          </Box>
                          <Box {...flexChildrenEvenlySplit} {...hideMD}>
                            {cutStrings(finalReport.adress as string, 18)}
                          </Box>
                          <Box {...flexChildrenEvenlySplit} flex="1">
                            <Icon fontSize="20px" as={showDetailedReport?.display ? HiChevronUp : HiChevronDown} />
                          </Box>
                        </Flex>
                      </Flex>
                      {showDetailedReport?.display && (
                        <Flex borderTop="1px solid #969696" direction="column" paddingY="10px">
                          {finalReport.sortedReportKeys.map((key, index) => {
                            const keyValue = returnStringFromKeyAdminReports(key);
                            const newSectionTitle = sectionDividers(key);
                            const textArea = isTextArea(key);

                            if (keyValue) {
                              return (
                                <Box key={index}>
                                  {newSectionTitle ? (
                                    <Flex justifyContent="center" marginY="10px" fontWeight="500">
                                      {newSectionTitle}
                                    </Flex>
                                  ) : null}
                                  <Flex
                                    ml={{ base: '3%', sm: '5%', md: '7%' }}
                                    mr={{ base: '1%', md: '3%' }}
                                    marginY="5px"
                                    fontSize={{ base: '13px', sm: '14px', md: '16px' }}
                                    alignItems="center">
                                    <Box mr={{ base: '5px', sm: '10px', md: '15px' }}>{key.slice(1)}.</Box>
                                    <Flex
                                      alignItems="center"
                                      direction={{ base: 'column', md: 'row' }}
                                      width={textArea ? '100%' : 'initial'}>
                                      <Box>
                                        <Box
                                          fontWeight="400"
                                          fontSize={{ base: '11px', sm: '12px', md: '14px' }}
                                          mr={{ base: '5px', sm: '10px', md: '15px' }}>
                                          {keyValue}
                                        </Box>
                                      </Box>
                                      {textArea ? (
                                        <Textarea
                                          background="#fcfcfc"
                                          borderColor={
                                            emptyFieldError(key, finalReport.parsedReport[key]) ? '#DC143C' : 'inherit'
                                          }
                                          value={finalReport.parsedReport[key]}
                                          isReadOnly={true}
                                        />
                                      ) : (
                                        <Input
                                          alignSelf="flex-start"
                                          background="#fcfcfc"
                                          borderColor={
                                            emptyFieldError(key, finalReport.parsedReport[key]) ? '#DC143C' : 'inherit'
                                          }
                                          minW="60px"
                                          maxW="100px"
                                          step={1}
                                          value={finalReport.parsedReport[key]}
                                          isReadOnly={true}
                                        />
                                      )}
                                    </Flex>
                                  </Flex>
                                </Box>
                              );
                            } else return null;
                          })}
                        </Flex>
                      )}
                    </Box>
                  );
                }
                return null;
              })}
            </>
          </UnorderedList>
        </Box>
      </Box>
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(Reports);

const reportColumn: (variant?: boolean) => BoxProps = (variant = true) => {
  return {
    borderTop: '1px solid #000',
    background: variant ? '#a8f18a' : '#ffef5d',
    paddingY: '10px',
    mt: '15px',
    cursor: 'pointer',
    flex: '2',

    _hover: {
      transition: 'background .2s',
      background: variant ? '#97d87d' : '#e9db19',
    },
  };
};

const flexChildrenEvenlySplit: BoxProps = {
  flexGrow: 2,
  flexBasis: 0,
  textAlign: 'center',
  paddingX: '8px',
  overflowX: 'hidden',
  userSelect: 'none',
};

const hideMD: BoxProps = {
  display: { base: 'none', md: 'initial' },
};

const hideSM: BoxProps = {
  display: { base: 'none', sm: 'initial' },
};

const dataEnterColumn: BoxProps = {
  borderTop: '1px solid #000',
  borderBottom: '1px solid #969696',
  paddingY: '25px',
  mt: '10px',
};

const borderBox: BoxProps = {
  borderBottom: '1px solid #eaeaea',
  pb: '15px',
  mb: '15px',
};
