import groq from 'groq'

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    slug,
    // add fields referenced by head/meta
    seo{ title, description },
    excerpt,
    mainImage{ asset->{ url } },

    content[] {
      _key,
      _type,

      ...select(_type == "heroSection" => {
        heading,
        body,
        image{asset, hotspot, crop},
        altText,
        button{ text, "url": internalLink->slug }
      }),

      ...select(_type == "textSection" => {
        heading,
        body
      }),

      ...select(_type == "textImageSection" => {
        heading,
        body,
        image{asset->{_id, url}, hotspot, crop},
        altText,
        imagePosition
      }),

      ...select(_type == "imageSection" => {
        heading,
        body,
        image{asset->{_id, url}, hotspot, crop},
        button{ text, url }
      }),

      ...select(_type == "videoSection" => {
        title,
        video{ asset->{ playbackId } }
      }),

      ...select(_type == "contactInfoSection" => {
        hours[]{ days, closed, open, close, note },
        contacts[]{ address, addressIcon, phone, phoneIcon, email, emailIcon }
      }),

      ...select(_type == "threeCardSection" => {
        cards[]{
          number,
          heading,
          body,
          iconImage{asset->{_id, url}, hotspot, crop},
          altText,
          button{ text, "url": internalLink->slug }
        }
      }),

      ...select(_type == "buttonSection" => {
        buttons[]{ text, url, internalLink->{ slug } }
      }),

      ...select(_type == "contactCardSection" => {
        "phone":  contactCards[_type == "phoneCard"][0]{ label, "value": number, icon },
        "email":  contactCards[_type == "emailCard"][0]{ label, "value": address, icon },
        "socialLabel": contactCards[_type == "socialLinksCard"][0].label,
        "socialMedia": contactCards[_type == "socialLinksCard"][0].links[]{ label, url, icon }
      }),

      ...select(_type == "formSection" => {
        formTitle,
        formDescription,
        fields[]{ name, label, type, required, options }
      }),

      ...select(_type == "footerSection" => {
        mapEmbedBlocks
      }),

      ...select(_type == "copyrightSection" => {
        companyName,
        legalPages[]->{ title, slug },
        credits[]{ name, url }
      }),

      ...select(_type == "blogCardsSection" => {
        _type,
        title,
        "limit": coalesce(limit, 5),
        "posts": *[_type == "post"] | order(publishedAt desc)[0...12]{
          _id,
          title,
          "excerpt": pt::text(body),
          slug,
          publishedAt,
          mainImage{asset, alt, crop, hotspot},
          categories[]->{ title, slug }
        }
      }),

      ...select(_type == "blogCategoriesSection" => {
        _type,
        title,
        description,
        "categories": *[_type == "category"] | order(title asc){
          title,
          slug,
          description,
          image{asset->{url}, alt}
        }
      })
    }
  }
`

export default pageQuery
