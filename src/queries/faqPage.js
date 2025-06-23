import groq from 'groq';

const faqPageQuery = groq`
  *[_type == "faqPage"][0]{
    heroImage {
      asset->{
        url
      }
    },
    faqs[] {
      question,
      answer
    }
  }
`;

export default faqPageQuery;
