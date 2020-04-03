import gql from 'graphql-tag';

const getCounts = gql`
  query Counts {
    workCount
    scoreCount
    siteCount
  }
`;

export default getCounts;
