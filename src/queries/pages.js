import groq from "groq";

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    content[] {
      _key,
      _type,

      ...select(_type == "heroSection" => {
        heading,
        body,
        image {
          asset->{
            url
          }
        },
        altText,
        button {
          text,
          url
        }
      }),

      ...select(_type == "textSection" => {
        heading,
        body
      }),

      ...select(_type == "textImageSection" => {
        heading,
        body,
        image {
          asset->{
            url
          }
        },
        altText,
        imagePosition
      }),

      ...select(_type == "imageSection" => {
        heading,
        body,
        image {
          asset->{
            url
          }
        },
        button {
          text,
          url
        }
      }),

      ...select(_type == "videoSection" => {
        title,
        video {
          asset->{
            playbackId
          }
        }
      })

      ...select(_type == "contactInformationSection" => {
        storeHours,
        address,
        addressIcon,
        phone,
        phoneIcon,
        email,
        emailIcon
      })
      
      ...select(_type == "threeSectionContent" => {
        cards[] {
          number,
          heading,
          body,
          iconImage {
            asset->{
              url
            }
          },
          button {
            text,
            url
          }
        }
      })
      
      ...select(_type == "buttonSection" => {
        buttons[] {
          text,
          url,
          internalLink->{
            slug
          }
        }
      })

      ...select(_type == "contactCardSection" => {
        phone {
          label,
          value,
          icon
        },
        email {
          label,
          value,
          icon
        },
        socialMedia[] {
          label,
          url,
          icon
        }
      })

      ...select(_type == "formSection" => {
        formTitle,
        formDescription,
        fields[] {
          name,
          label,
          type,
          required,
          options
        }
      })
      
      ...select(_type == "footerSection" => {
        mapUrl
      })
      
      ...select(_type == "copyrightSection" => {
        companyName,
        legalPages[]->{
          title,
          slug
        },
        credits[] {
          name,
          url
        }
      })
    }
  }
`;

export default pageQuery;
