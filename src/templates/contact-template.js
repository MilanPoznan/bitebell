import React from 'react'
import Layout from '../components/Layout'
import ContactPageLayout from '../components/ContactPageLayout'

export default function contactTemplate({ data }) {
  const {
    allWpPage: { nodes },
    allWpIntegrationType: { types },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } } } = data

  const { title, language, translations } = nodes[0]
  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  return (
    <Layout language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} >
      <ContactPageLayout data={nodes[0]} language={language.slug} />
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
              companyEn
              isCompanyRequired
              showCompanyFileld
              fieldGroupName
            }
            emailField {
              emailEn
              email
              isEmailRequired
              showEmailField
              fieldGroupName
            }
            nameField {
              isNameRequired
              name
              nameEn
              showNameField
              fieldGroupName
            }
            notesField {
              fieldGroupName
              isNotesRequired
              notes
              notesEn
              showNotesField
            }
            phoneField {
              isPhoneRequired
              phoneEn
              phone
              showPhoneField
              fieldGroupName
            }
            selectCompanyField {
              fieldGroupName
              selectCompany
              selectCompanyEn
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

