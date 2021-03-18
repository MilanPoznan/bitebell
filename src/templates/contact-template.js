import React from 'react'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import ContactPageLayout from '../components/ContactPageLayout'

export default function contactTemplate({ data, pageContext }) {
  const {
    allWpPage: { nodes },
    allWpIntegrationType: { types },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo, phoneNumber } } } } = data

  const { title, language, translations } = nodes[0]
  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)
  const currLangIntegrationType = types.filter(type => type.language.slug === language.slug)

  const footerPosition = language.slug === 'sr' ? "FOOTER_MENU" : "FOOTER_MENU___EN";
  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout phoneNumber={phoneNumber} title={title} language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <ContactPageLayout
        title={nodes[0].partners.title}
        content={nodes[0].partners.content}
        apiContent={nodes[0].partners.apiContent}
        partnerLogo={nodes[0].partners.logos}
        cfData={nodes[0].partners.becomePartnerCf}
        slug={pageContext.slug}
        selectTypes={currLangIntegrationType}
        language={language.slug}
      />
    </Layout>
  )
}


export const contactQuery = graphql`
  query getContactPageData($id: String!) {
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
        partners {
          title
          content
          apiContent
          logos {
            logoImage {
              file: localFile {
                image: childImageSharp {
                  fluid(maxWidth: 200) {
                      ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
        
          becomePartnerCf {
            companyField {
              company
              isCompanyRequired
              showCompanyFileld
              fieldGroupName
            }
            emailField {
              email
              isEmailRequired
              showEmailField
              fieldGroupName
            }
            nameField {
              isNameRequired
              name
              showNameField
              fieldGroupName
            }
            notesField {
              fieldGroupName
              isNotesRequired
              notes
              showNotesField
            }
            phoneField {
              isPhoneRequired
              phone
              showPhoneField
              fieldGroupName
            }
            selectCompanyField {
              fieldGroupName
              selectCompany
              isCompanySelectRequired
              showCompanySelect
            }
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
    allWpIntegrationType {
      types: nodes {
        slug
        name
        language {
          slug
        }
      }
    }
  }
`

