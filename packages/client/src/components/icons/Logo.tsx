import React from 'react';
import { volcano } from '@ant-design/colors';

interface Props {
  size: number;
  title?: boolean;
  className?: string;
}

const Logo = (props: Props) => {
  const { size, title, className } = props;

  const imageStyles = {
    width: size,
    height: title ? size / 3 : size,
  };

  const image = title
    ? require('../../images/logo-title-nobackground.svg')
    : require('../../images/logo-nobackground.svg');

  return <img style={imageStyles} className={className} src={image} />;
};

export default Logo;
