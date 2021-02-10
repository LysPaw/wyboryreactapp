import { Flex, Box, BoxProps } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useGetConstituencyQuery } from '../../../generated/graphql';
import { cutStrings } from '../../../utils/cutStrings';
import ReportPageStandardJSX from '../ReportPageStandardJSX';
import { useRouter } from 'next/router';

const FinalReportCheckPage = ({ username }: { username: string }) => {
  const router = useRouter();
  const [{ data, fetching }] = useGetConstituencyQuery();

  const [finalReports, setFinalReports] = useState<
    ({ id: number; adress: string; report: string } | null | undefined)[]
  >([]);

  useEffect(() => {
    if (data?.getConstituency) {
      setFinalReports(
        data.getConstituency.map((c) => {
          return { id: c.id, adress: c.adress, report: c.finalReport || '' };
        })
      );
    }
  }, [fetching]);

  return (
    <ReportPageStandardJSX
      object={data?.getConstituency || []}
      data={data || {}}
      protocols
      fetching={fetching}
      text={'Protocols'}>
      <>
        <Flex direction="column">
          <Flex justifyContent="space-evenly" alignItems="center">
            <Box {...flexChildrenEvenlySplit}>Creation date</Box>
            <Box {...flexChildrenEvenlySplit}>Constituency ID</Box>
            <Box {...flexChildrenEvenlySplit} {...hideSM}>
              Operator
            </Box>
            <Box {...flexChildrenEvenlySplit} {...hideMD}>
              Adress
            </Box>
          </Flex>
        </Flex>

        {finalReports.map((finalReport) => {
          if (finalReport?.report) {
            const { creationTime } = JSON.parse(finalReport.report);
            return (
              <div key={finalReport.id}>
                <Flex
                  direction="column"
                  position="relative"
                  {...dataEnterColumn}
                  onClick={() => router.push(`/panel/protocols?id=${finalReport.id}`)}>
                  <Flex justifyContent="space-evenly" alignItems="center" mt={'10px'}>
                    <Box {...flexChildrenEvenlySplit}>{creationTime || '-'}</Box>
                    <Box {...flexChildrenEvenlySplit}>{finalReport.id}</Box>
                    <Box {...flexChildrenEvenlySplit} {...hideSM}>
                      {username}
                    </Box>

                    <Box {...flexChildrenEvenlySplit} {...hideMD}>
                      {cutStrings(finalReport.adress, 18)}
                    </Box>
                  </Flex>
                </Flex>
              </div>
            );
          }
          return null;
        })}
      </>
    </ReportPageStandardJSX>
  );
};

export default FinalReportCheckPage;

const dataEnterColumn: BoxProps = {
  border: '1px solid #000',
  borderRadius: '10px',
  paddingY: '25px',
  mt: '10px',
  mx: '5px',
  background: '#f5f3f3',
  cursor: 'pointer',

  _hover: {
    transition: 'background .2s',
    background: '#e9e8e8',
  },
};

const flexChildrenEvenlySplit: BoxProps = {
  flexGrow: 2,
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
