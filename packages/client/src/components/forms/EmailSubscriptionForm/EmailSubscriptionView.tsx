import React, { FormEvent } from 'react';
import { Form, Button } from 'antd';
import { withFormik, FormikErrors, FormikProps, Field } from 'formik';
import { emailValidationSchema } from '@scorecompanion/common';
import InputField from '../../input/InputField';

export interface EmailFormValues {
  email: string;
}

export type EmailSubscriptionSubmit = (
  values: EmailFormValues
) => Promise<FormikErrors<EmailFormValues> | null>;

export interface EmailSubscriptionProps {
  submit: EmailSubscriptionSubmit;
}

const C: React.FC<FormikProps<EmailFormValues> &
  EmailSubscriptionProps> = props => {
  const { handleSubmit } = props;

  return (
    <div
      style={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <h1>Ready to Start?</h1>
      <p>
        Score Companion is currently under development, but you can join our
        email list to recieve updates and get the chance to participate in
        future alpha and beta testing!
      </p>
      <Form
        layout='inline'
        onFinish={formValues =>
          handleSubmit(formValues as FormEvent<HTMLFormElement>)
        }
        style={{ marginTop: 10 }}
      >
        <Field
          name='email'
          placeholder='Email address'
          component={InputField}
        />
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Join
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const EmailSubscriptionView = withFormik<
  EmailSubscriptionProps,
  EmailFormValues
>({
  validationSchema: emailValidationSchema,
  mapPropsToValues: () => ({ email: '' }),
  handleSubmit: async (values, { props, setErrors, setSubmitting }) => {
    const errors = await props.submit(values);
    if (errors) {
      setErrors(errors);
    }
  },
})(C);

export default EmailSubscriptionView;
