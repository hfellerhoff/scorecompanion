import React from 'react';

export interface CenterContentProps {
  children: JSX.Element | JSX.Element[];
  horizontal?: boolean;
  vertical?: boolean;
  centerText?: boolean;
}

const CenterContent = (props: CenterContentProps) => {
  const { children, horizontal, vertical, centerText } = props;

  const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: horizontal ? 'center' : 'inherit',
    justifyContent: vertical ? 'center' : 'inherit',
    textAlign: centerText ? 'center' : 'left',
    width: '100%',
  };

  return <div style={style}>{children}</div>;
};

export default CenterContent;
