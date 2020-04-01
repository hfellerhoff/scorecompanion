import gql from 'graphql-tag';

const getWorksByTitleAndComposer = gql`
  query Works(
    $title: String!
    $composer: String!
    $take: Float!
    $skip: Float!
  ) {
    worksByTitleAndComposerCount(title: $title, composer: $composer)
    worksByTitleAndComposer(
      title: $title
      composer: $composer
      take: $take
      skip: $skip
    ) {
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
