import groq from 'groq';

export const blogIndexQuery = groq`
  *[_type == "post"]|order(publishedAt desc){
    title,
    slug,
    publishedAt
  }
`;
