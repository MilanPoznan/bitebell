import React from 'react'
import Layout from '../components/Layout'
import FaqTemplate from '../components/FaqTemplate'

export default function faqTemplate({ data }) {

  const {
    allWpMenu: { menus },
    allWpPage: { nodes },
    wp: { optionsPage: { options: { logo, phoneNumber } } }
  } = data

  const { language, translations, faq_acf: { title, subtitle, accordion, demoSectionFaq } } = nodes[0]

  const menuPosition = language.slug === 'en' ? "MENU_1" : "MENU_1___SR";
  const footerPosition = language.slug === 'en' ? "FOOTER_MENU" : "FOOTER_MENU___SR";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)
  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout title={title} language={language.slug} phoneNumber={phoneNumber} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <FaqTemplate title={title} subtitle={subtitle} accordionArray={accordion} demoSectionFaq={demoSectionFaq} language={language.slug} />
    </Layout>
  )
}


export const faqQuery = graphql`
  query getFaqData($id: String!) {
    wp {
      optionsPage {
        options: optionsPage {
          logo {
            file: localFile {
              image: childImageSharp {
                fluid(maxWidth: 400) {
                    ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
          phoneNumber
        }
      }
    }
    allWpMenu {
      ...getMenus
    }
    allWpPage(filter: { id: { eq: $id } }) {
        nodes {
          faq_acf {
            title
            subtitle
            accordion {
              accordionContent
              acordionTitle
              category
            }
            demoSectionFaq {
              link {
                target
                title
                url
              }
              text
              title
            }
          }
          language {
            slug
          }
          translations {
          uri
          }
      }
    }
  }
`