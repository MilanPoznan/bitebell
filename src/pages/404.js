import React from "react"
import { graphql } from "gatsby"

import Header from '../components/Header'

import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {

  const { allWpMenu: { menus },
    wp: { optionsPage: { options: { logo, phoneNumber } } } } = data


  const currLangMenu = menus.filter(menu => menu.locations[0] === "MENU_1")
  // const currTranslations = language.slug === 'en' ? [{ uri: '/sr' }] : translations
  const translations = [{ uri: '/sr' }]

  return (
    <div>
      <Header phoneNumber={phoneNumber} currLangMenu={currLangMenu[0]} logo={logo} currentLang={'en'} translations={translations} />
      <SEO title="404: Not Found" />
      <div style={{ display: 'flex', flexFlow: 'column', height: '50vh', alignItems: 'center', justifyContent: 'center' }}>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>

      </div>
    </div>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
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
    site {
      siteMetadata {
        title
      }
    }
    allWpMenu {
      ...getMenus
    }
  }
`
