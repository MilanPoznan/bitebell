import React from 'react'
import Layout from '../components/Layout'
import ContactPageLayout from '../components/ContactPageLayout'
import { graphql } from 'gatsby'

export default function requestDemoTemplate({ data, pageContext }) {
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
    <Layout phoneNumber={phoneNumber} language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <ContactPageLayout
        title={nodes[0].demoCf.title}
        content={nodes[0].demoCf.content}
        apiContent={nodes[0].demoCf.apiContent}
        partnerLogo={nodes[0].demoCf.partnerLogo}
        cfData={nodes[0].demoCf.requestDemoCf}
        slug={pageContext.slug}
        selectTypes={currLangIntegrationType}
        language={language.slug}
      />
    </Layout>
  )
}


export const contactQuery = graphql`
  query getDemoRequestPageData($id: String!) {
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
        demoCf {
          apiContent
          content
          title
            partnerLogo {
              logo {
              file: localFile {
                image: childImageSharp {
                  fluid(maxWidth: 200) {
                      ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            }
          requestDemoCf {
            emailGroup {
              email
              emailRequired
              showEmail
            }
            imeGrupa {
              ime
              imeObavezno
              showIme
            }
            locationGroup {
              fieldGroupName
              isLocationRequired
              locationText
              showLocation
            }
            phoneGroup {
              isPhoneRequired
              phoneText
              showPhoneField
            }
            posFieldGroup {
              isPosRequired
              posFieldText
              showPosField
            }
            restaurant {
              restaurantName
              restaurantNameRequired
              restaurantNameShow
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

