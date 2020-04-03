import React, { useState, useEffect } from 'react';
import {
  SearchOutlined,
  CoffeeOutlined,
  ControlOutlined,
  StarOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import { volcano, red } from '@ant-design/colors';
import { Typography, Button } from 'antd';
const { Title, Text } = Typography;
import './Hero.scss';
import Logo from './icons/Logo';
import PaperContainer from './containers/PaperContainer';
import { navigate } from 'gatsby';
import LandingPageFeature from './LandingPageFeature';
import CountUp from 'react-countup';
import { useQuery } from '@apollo/client';
import getCounts from '../graphql/queries/getCounts';
import CountUpDisplay from './hero/CountUpDisplay';

interface Props {
  onSearchPress: () => void;
}

const Hero = ({ onSearchPress }: Props) => {
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
            size='large'
            shape='round'
            icon={<SearchOutlined />}
            onClick={() => {
              // if (heroRef)
              //   heroRef.className = 'hero__background hero__fade-to-search';
              onSearchPress();
              setTimeout(() => {
                navigate('/search');
              }, 250);
            }}
          >
            Search Now
          </Button>
        </PaperContainer>
        <CountUpDisplay />
        <PaperContainer centerText horizontal fadeIn>
          <Title style={{ marginBottom: 0 }}>Why Score Companion?</Title>

          <LandingPageFeature
            icon={<SearchOutlined />}
            title='One, Centralized, Score-Finding Machine'
            description="There's no more need scour through IMSLP or search site after
                site looking for the best score - Score Companion takes care of
                all of that for you."
          />
          <LandingPageFeature
            icon={<ControlOutlined />}
            title='Fine-Tuned Control'
            description="Score Companion gives you the tools to quickly find the score you're looking for, with advanced search filtering and detailed score information."
          />
          <LandingPageFeature
            icon={<DollarOutlined />}
            title='Free Now, Free Forever'
            description="Score Companion was built to allow musicians to find the best, most affordable score for them. We will never charge you to use Score Companion, so you're free to search away!"
          />
        </PaperContainer>
        <PaperContainer horizontal centerText fadeIn>
          <Title>Want to learn more?</Title>
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
        <PaperContainer horizontal centerText fadeIn>
          <Title>Find Score Companion useful?</Title>
          <Text>
            Consider buying me a coffee! Every little bit helps to make sure I
            can continue to improve and develop Score Companion for years to
            come.
          </Text>
          <a
            href='https://ko-fi.com/henryfellerhoff'
            target='_blank'
            rel='noopener noreferrer'
          >
            <div
              style={{
                marginTop: 40,
                background: '#F25D5E',
                color: 'white',
                border: 'none',
                padding: '5px 20px',
                fontWeight: 500,
                borderRadius: 50,
              }}
            >
              <img
                src={require('../images/kofi.png')}
                alt='Ko-Fi'
                style={{ height: 32, marginRight: 10 }}
              />
              Buy me a coffee
            </div>
          </a>
        </PaperContainer>
      </div>
    </>
  );
};

export default Hero;
