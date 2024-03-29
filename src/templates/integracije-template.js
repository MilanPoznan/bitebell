import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import IntegrationsComponent from '../components/IntegrationsComponent'


export default function integracije({ data, pageContext }) {


  const { currCategory } = pageContext

  const { allWpIntegration: { integrations },
    allWpPage: { nodes },
    allWpIntegrationType: { types },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo, phoneNumber } } } } = data

  const { title, integrationsFields, language, translations } = nodes[0]

  //Pick from 2 menus 
  const menuPosition = language.slug === 'en' ? "MENU_1" : "MENU_1___SR";

  //Filter by language 
  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const currLangIntegrations = integrations.filter(item => item.language.slug === language.slug)
  const currLangIntegrationType = types.filter(type => type.language.slug === language.slug)

  const footerPosition = language.slug === 'en' ? "FOOTER_MENU" : "FOOTER_MENU___SR";

  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout title={title} language={language.slug} phoneNumber={phoneNumber} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <IntegrationsComponent
        currLang={language.slug}
        currLangIntegrationType={currLangIntegrationType}
        integrationsFields={integrationsFields}
        integrations={currLangIntegrations}
        currCategory={currCategory}
      />
    </Layout>
  )
}

export const integracijeQuery = graphql`
  query getAllIntergations($id: String!) {
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
        title
        integrationsFields {
          title
          subtitle
        }
        language {
          slug
        }
        translations {
          uri
        }
      }
    }
    allWpIntegrationType {
      types: nodes {
        slug
        name
        language {
          slug
        }
      }
    }
    allWpIntegration {
      integrations: nodes {
        title
        featuredImage {
          node {
            title
            file: localFile {
              image: childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        integrations_type {
          nodes {
            name
          }
        }
        integrationsTemplate {
          template
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
