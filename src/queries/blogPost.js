// queries/blogPost.js
import groq from 'groq';
import { finalNoteProjection } from './finalNote';

export const blogPostQuery = groq`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    body[],
    author->{
      name,
      image{asset->{url}, alt}
    },
    mainImage{asset->{url}, alt, crop, hotspot},
    publishedAt,
    categories[]->{title, slug},
    ${finalNoteProjection}
  }
`;
