import React from 'react'
import Layout from '../components/Layout'

export default function defaultPageTemplate({ data }) {
  console.log(data)
  const {
    allWpPage: { nodes },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } } } = data

  const { title, content, translations, language } = nodes[0]

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const footerPosition = language.slug === 'sr' ? "FOOTER_MENU" : "FOOTER_MENU___EN";
  const currLangFooter = menus.filter(menu => menu.locations[0] ===  footerPosition)


  console.log(nodes)

  return (
    <Layout language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <div className="container def-page">
        <h1 style={{ marginBottom: '30px' }}>{title}</h1>
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
