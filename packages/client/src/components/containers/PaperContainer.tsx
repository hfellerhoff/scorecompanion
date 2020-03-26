import React from 'react';
import CenterContent, { CenterContentProps } from '../layout/CenterContent';
import './PaperContainer.scss';

interface Props extends CenterContentProps {
  fadeIn?: boolean;
}

const PaperContainer = (props: Props) => {
  const { fadeIn } = props;

  const className = fadeIn ? 'slide-in paper-container' : 'paper-container';

  return (
    <div className={className}>
      <CenterContent {...props}>{props.children}</CenterContent>
    </div>
  );
};

export default PaperContainer;
