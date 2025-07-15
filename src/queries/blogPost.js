import groq from 'groq';

export const blogPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    body,
    author->{name, image},
    mainImage,
    publishedAt,
    categories[]->{title}
  }
`;
