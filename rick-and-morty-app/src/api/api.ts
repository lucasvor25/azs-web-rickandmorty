import { gql } from '@apollo/client';


export const GET_EPISODES = gql`
  query {
    episodes {
      results {
        id
        name
        episode
        air_date
        characters {
          id
          image
        }
      }
    }
  }
`;

export const GET_EPISODE_DETAILS = gql`
  query ($id: ID!) {
    episode(id: $id) {
      id
      name
      episode
      air_date
      characters {
        id
        name
        status
        species
        image
      }
    }
  }
`;