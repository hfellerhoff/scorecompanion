import React from 'react';
import { FieldProps } from 'formik';
import { Form, Input } from 'antd';

interface Props {
  placeholder?: string;
  prefix?: React.ReactNode;
}

const InputField: React.SFC<FieldProps<any> & Props> = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const errorMessage = touched[field.name] && errors[field.name];

  return (
    <Form.Item
      name='email'
      help={errorMessage}
      validateStatus={errorMessage ? 'error' : 'success'}
      style={{ textAlign: 'left', width: 250 }}
      {...props}
    >
      <Input {...field} {...props} />
    </Form.Item>
  );
};

export default InputField;
