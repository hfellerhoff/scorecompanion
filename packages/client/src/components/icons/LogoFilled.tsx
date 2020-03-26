import React from 'react';
import { volcano } from '@ant-design/colors';

interface Props {
  size: number;
  padding?: number;
  square?: boolean;
  title?: boolean;
  className?: string;
}

const LogoFilled = (props: Props) => {
  const { size, padding, square, title, className } = props;

  const paddingValue = size / 4;
  const containerStyles = {
    width: size,
    height: size,
    padding: padding || paddingValue,
    background: volcano[2],
    borderRadius: square ? 0 : size / 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const imageStyles = {
    width: size - (padding || paddingValue) * 2,
    height: size - (padding || paddingValue) * 2,
  };

  const image = title
    ? require('../../images/logo-title-nobackground.svg')
    : require('../../images/logo-nobackground.svg');

  return (
    <div style={containerStyles} className={className}>
      <img style={imageStyles} src={image} />
    </div>
  );
};

export default LogoFilled;
