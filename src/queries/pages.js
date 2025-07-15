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
            _id,
            url
          },
          hotspot,
          crop
        },
        altText,
        button {
          text,
          "url": internalLink->slug
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
            _id,
            url
          },
          hotspot,
          crop
        },
        altText,
        imagePosition
      }),

      ...select(_type == "imageSection" => {
        heading,
        body,
        image {
          asset->{
            _id,
            url
          },
          hotspot,
          crop
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
      }),

     ...select(_type == "contactInfoSection" => {
        hours[] {
          days,
          closed,
          open,
          close,
          note
        },
        contacts[] {
          address,
          addressIcon,
          phone,
          phoneIcon,
          email,
          emailIcon
        }
      }),

      
      ...select(_type == "threeCardSection" => {
        cards[] {
          number,
          heading,
          body,
          iconImage {
            asset->{
              _id,
              url
            },
            hotspot,
            crop
          },
          altText,
          button {
            text,
            "url": internalLink->slug
          }
        }
      }),
      
      ...select(_type == "buttonSection" => {
        buttons[] {
          text,
          url,
          internalLink->{
            slug
          }
        }
      }),

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
      }),

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
      }),
      
      ...select(_type == "footerSection" => {
        mapEmbedBlocks
      }),
      
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
      }),
    }
  }
`;

export default pageQuery;
