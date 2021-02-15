import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import TechHelpDisplay from '../../components/contact/TechHelpDisplay';

const TechHelp = () => {
  return <TechHelpDisplay privilages={true} />;
};

export default withUrqlClient(createUrqlClient)(TechHelp);
