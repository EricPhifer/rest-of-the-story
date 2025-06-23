import groq from "groq";

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    content[] {
      _key,
      _type,

      // Hero Section
      ...select(_type == "heroSection" => {
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

      // Text Section
      ...select(_type == "textSection" => {
        heading,
        body
      }),

      // Text & Image Section
      ...select(_type == "textImageSection" => {
        heading,
        body,
        image {
          asset->{
            url
          }
        },
        imagePosition
      }),

      // Image Section
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

      // Video Section
      ...select(_type == "videoSection" => {
        title,
        video {
          asset->{
            playbackId
          }
        }
      })

       // Contact Information Section
      ...select(_type == "contactInformationSection" => {
        storeHours,
        address,
        addressIcon,
        phone,
        phoneIcon,
        email,
        emailIcon
      })
      
       // Three Section Content
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
      
      // Button Section
      ...select(_type == "buttonSection" => {
        buttons[] {
          text,
          url,
          internalLink->{
            slug
          }
        }
      })

       // Contact Card Section
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

       // Form Section
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
      
      // Map Embed Section
      ...select(_type == "footerSection" => {
        mapUrl
      })
      
      // Copyright Section
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
