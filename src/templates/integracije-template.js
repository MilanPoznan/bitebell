import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import IntegrationsComponent from '../components/IntegrationsComponent'


export default function integracije({ data }) {
  const { allWpIntegration: { integrations },
    allWpPage: { nodes } } = data

  const { title, integrationsFields, language, translations } = nodes[0]

  const currLangIntegrations = integrations.filter(item => item.language.slug === language.slug)
  return (
    <Layout language={language.slug} title={title} translations={translations}>
      <IntegrationsComponent integrationsFields={integrationsFields} integrations={currLangIntegrations} />
    </Layout>
  )
}

export const integracijeQuery = graphql`
  query getAllIntergations($id: String!) {
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
