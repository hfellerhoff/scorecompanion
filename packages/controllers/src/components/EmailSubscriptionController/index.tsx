import * as React from 'react';

interface Props {
  render: (data: {
    submit: (values: any) => Promise<null>;
  }) => JSX.Element | null;
}

export const EmailSubscriptionController: React.FC<Props> = ({ render }) => {
  const submit = async (values: any) => {
    console.log(values);
    return null;
  };

  return render({ submit });
};
