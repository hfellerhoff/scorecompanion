import React, { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import './SearchParameterInput.scss';
import {
  ContainerFilled,
  BulbFilled,
  ExpandOutlined,
  CompressOutlined,
} from '@ant-design/icons';
import Text from 'antd/lib/typography/Text';

interface Props {
  fetchWithValues: (values: FormVariables) => void;
  setIsTyping: (value: boolean) => void;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
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
    <div className='search-parameter-input__form'>
      <Form onValuesChange={onValuesChange}>
        <div className='search-parameter-input__form__first-line'>
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
        </div>
      </Form>
      <div className='search-parameter-input__form__second-line'>
        <Button
          type='link'
          icon={props.isExpanded ? <CompressOutlined /> : <ExpandOutlined />}
          className='search-parameter-input__form__view-toggle'
          onClick={() => props.toggleIsExpanded()}
        >
          {'Switch to ' + (props.isExpanded ? 'Compact View' : 'Expanded View')}
        </Button>
      </div>
    </div>
  );
};

export default SearchParameterInput;
