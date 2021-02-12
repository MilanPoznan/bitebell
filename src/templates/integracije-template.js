import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import IntegrationsComponent from '../components/IntegrationsComponent'


export default function integracije({ data }) {
  console.log(data)
  const { wpPage: { language: { locale }, title, integrationsFields, translations },
    allWpIntegration: { nodes } } = data

  const currLangIntegrations = nodes.filter(item => item.language.locale === locale)
  return (
    <Layout language={locale} title={title} translations={translations}>
      <IntegrationsComponent integrationsFields={integrationsFields} integrations={currLangIntegrations} />
    </Layout>
  )
}

export const integracijeQuery = graphql`
  query getAllIntergations {
    wpPage {
      title
      integrationsFields {
        title
        subtitle
      }
      language {
        locale
      }
      translations {
        uri
      }
    }
    allWpIntegration {
      nodes {
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
        integrationsTemplate {
          template
        }
        language {
          locale
        }
        translations {
          uri
        }
      }
    }
  }
`
