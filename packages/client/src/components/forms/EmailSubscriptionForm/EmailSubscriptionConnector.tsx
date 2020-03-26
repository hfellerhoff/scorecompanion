import React from 'react';
import EmailSubscriptionView from './EmailSubscriptionView';
import { EmailSubscriptionController } from '@scorecompanion/controllers';

const EmailSubscription: React.FC = () => {
  return (
    <EmailSubscriptionController
      render={({ submit }) => <EmailSubscriptionView submit={submit} />}
    />
  );
};

export default EmailSubscription;
