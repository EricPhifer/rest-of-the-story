import groq from 'groq';

const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0]{
    title,
    slug,
    body
  }
`;

export default legalPageQuery;
