import gql from 'graphql-tag';

const getWorksByTitleAndComposer = gql`
  query Works($title: String!, $composer: String!) {
    worksByTitleAndComposer(title: $title, composer: $composer) {
      composer
      title
      id
      site
      workUrl
      scores {
        description
        title
        url
      }
    }
  }
`;

export default getWorksByTitleAndComposer;
