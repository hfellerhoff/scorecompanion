import React, { useState } from 'react';
import { Form, Input } from 'antd';
import './SearchParameterInput.scss';
import { ContainerFilled, BulbFilled } from '@ant-design/icons';

interface Props {
  fetchWithValues: (values: FormVariables) => void;
  setIsTyping: (value: boolean) => void;
}

export interface FormVariables {
  title?: string;
  composer?: string;
}

const SearchParameterInput = (props: Props) => {
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout>();

  const onValuesChange = (_: FormVariables, values: FormVariables) => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    if (values.title !== '' || values.composer !== '') props.setIsTyping(true);
    setTypingTimeout(
      setTimeout(() => {
        props.setIsTyping(false);
        props.fetchWithValues(values);
      }, 500)
    );
  };

  return (
    <Form
      className='search-parameter-input__form'
      onValuesChange={onValuesChange}
    >
      <Form.Item
        name='title'
        className='search-parameter-input__input-container search-parameter-input__input-container--title'
      >
        <Input
          prefix={<ContainerFilled />}
          allowClear
          size='large'
          placeholder='Piece Title'
          className='search-parameter-input__input search-parameter-input__input--title'
        />
      </Form.Item>
      <Form.Item
        name='composer'
        className='search-parameter-input__input-container search-parameter-input__input-container--composer'
      >
        <Input
          prefix={<BulbFilled />}
          allowClear
          size='large'
          placeholder='Composer'
          className='search-parameter-input__input search-parameter-input__input--composer'
        />
      </Form.Item>
    </Form>
  );
};

export default SearchParameterInput;
