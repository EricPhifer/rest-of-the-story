import groq from 'groq';

const faqPageQuery = groq`
  *[_type == "faqPage"][0]{
    title,
    heroImage {
      asset->{
        _id
      },
      crop,
      hotspot
    },
    faqs[]{
      question,
      answer
    }
  }
`;

export default faqPageQuery;
