import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import '../components/global-styles/_def-page.scss'
export default function defaultPageTemplate({ data }) {
  const {
    allWpPage: { nodes },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo, phoneNumber } } } } = data

  const { title, content, translations, language } = nodes[0]

  const menuPosition = language.slug === 'en' ? "MENU_1" : "MENU_1___SR";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const footerPosition = language.slug === 'en' ? "FOOTER_MENU" : "FOOTER_MENU___SR";

  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout phoneNumber={phoneNumber} title={title} language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <div className="container def-page">
        <h2 style={{ marginBottom: '10px', color: '#2C4482' }}>{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>

    </Layout>
  )
}


export const defPageQuery = graphql`
  query($id: String) {
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
    allWpPage(filter: {id: {eq: $id}}) {
      nodes {
        title
        content
        language {
          slug
        }
        translations {
          uri
          slug
        }
      }
    }
  }
`
