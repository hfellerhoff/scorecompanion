import React from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { volcano, red } from '@ant-design/colors';
import { Typography, Button } from 'antd';
const { Title, Text } = Typography;
import './Hero.scss';
import Logo from './icons/Logo';
import PaperContainer from './containers/PaperContainer';

interface Props {}

const Hero = (props: Props) => {
  return (
    <>
      <div
        className='hero__background'
        style={{
          background: `linear-gradient(${volcano[3]}, ${red[3]})`,
        }}
      >
        <PaperContainer horizontal centerText fadeIn>
          <Logo title size={200} className='hero__logo' />
          <div style={{ height: 30 }} />
          <Title className='hero__title-text'>
            Affordable scores,{' '}
            <Text style={{ color: '#fa541c' }}> all in one place.</Text>
          </Title>
          <Text>
            Search thousands of scores across all your favorite sites with Score
            Companion.
          </Text>
          <div style={{ height: 30 }} />
          <Button
            type='primary'
            disabled
            size='large'
            shape='round'
            // icon={<SearchOutlined />}
          >
            Coming Soon!
          </Button>
        </PaperContainer>
        <PaperContainer horizontal centerText fadeIn>
          <Title>Ready to get started?</Title>
          <Text>
            Score Companion is under active development. Subscribe to be
            notified when new features and sites are added, and to join us on
            our development journey. We'd love to have you!
          </Text>
          <iframe
            title='Substack'
            src='https://scorecompanion.substack.com/embed'
            frameBorder={0}
            scrolling='no'
          ></iframe>
        </PaperContainer>
      </div>
    </>
  );
};

export default Hero;
