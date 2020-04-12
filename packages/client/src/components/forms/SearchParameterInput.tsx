import React, { useState } from 'react';
import { Form, Input, Button, Switch } from 'antd';
import './SearchParameterInput.scss';
import {
  ContainerFilled,
  BulbFilled,
  ExpandOutlined,
  CompressOutlined
} from '@ant-design/icons';

interface Props {
  fetchWithValues: (values: FormVariables) => void;
  setIsTyping: (value: boolean) => void;
  isExpanded: boolean;
  toggleIsExpanded: () => void;
  variables: FormVariables;
}

export interface FormVariables {
  title?: string;
  composer?: string;
}

const SearchParameterInput = (props: Props) => {
  const {
    variables: { title, composer }
  } = props;
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
    <div className='search-parameter-input'>
      <Form
        onValuesChange={onValuesChange}
        className='search-parameter-input__form'
      >
        <div className='search-parameter-input__form__first-line'>
          <Form.Item
            name='title'
            className='search-parameter-input__input-container search-parameter-input__input-container--title'
          >
            <Input
              prefix={<ContainerFilled />}
              defaultValue={title || ''}
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
              defaultValue={composer || ''}
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
