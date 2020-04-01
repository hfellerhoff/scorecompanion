import React from 'react';
import Text from 'antd/lib/typography/Text';
import './LandingPageFeature.scss';

interface Props {
  icon: JSX.Element;
  title: string;
  description: string;
}

const LandingPageFeature = (props: Props) => {
  const { icon, title, description } = props;

  return (
    <div className='landing-page-feature'>
      <div className='landing-page-feature__icon'>{icon}</div>

      <div className='landing-page-feature__text-container'>
        <Text style={{ fontSize: 20, fontWeight: 500, marginTop: -5 }}>
          {title}
        </Text>
        <Text className='landing-page-feature__description'>{description}</Text>
      </div>
    </div>
  );
};

export default LandingPageFeature;
