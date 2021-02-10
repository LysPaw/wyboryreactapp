import React from 'react';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../../utils/createUrqlClient';
import { ProtectedLayout } from '../../components/Layout';
import ContactForm from '../../components/contact/ContactForm';

const AdminHelp = () => {
  return (
    <ProtectedLayout variant="small">
      <ContactForm title="Contact with your administrator" email="adminsupp@xyz.zy" phone="456123789" />
    </ProtectedLayout>
  );
};

export default withUrqlClient(createUrqlClient)(AdminHelp);
