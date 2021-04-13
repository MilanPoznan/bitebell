import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import PosComponent from '../components/PosComponent'
import MapComponent from '../components/MapComponent'
import AboutComponent from '../components/AboutComponent'
import SponsorsComponent from '../components/SponsorsComponent'
import DemoComponent from '../components/DemoComponent'

export default function page({ data }) {

  const { allWpPage: { nodes }, allWpMenu: { menus }, wp: { optionsPage: { options: { logo, phoneNumber } } } } = data;
  const { title, language, translations,
    homepage_sections: { aboutSection, demoSection, heroSection, mapSection, posSection, sponsorsSection },
    seoFields: { metaDescription, pageTitle } } = nodes[0];

  const menuPosition = language.slug === 'en' ? "MENU_1" : "MENU_1___SR";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const currTranslations = language.slug === 'en' ? [{ uri: '/sr' }] : translations

  const footerPosition = language.slug === 'en' ? "FOOTER_MENU" : "FOOTER_MENU___SR";

  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout phoneNumber={phoneNumber} seoTitle={pageTitle} metaDesc={metaDescription} language={language.slug} title={title} translations={currTranslations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <Hero heroSection={heroSection} />
      <PosComponent posSection={posSection} language={language.slug} />
      <MapComponent mapSection={mapSection} language={language.slug} />
      <AboutComponent aboutSection={aboutSection} />
      <SponsorsComponent sponsorsSection={sponsorsSection} />
      <DemoComponent demoSection={demoSection} language={language.slug} />
    </Layout>
  )
}

export const query = graphql`
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
        language {
          slug
        }
        translations {
          uri
        }
        seoFields {
          metaDescription
          pageTitle
        }
        homepage_sections {
          aboutSection {
            fieldGroupName
            title
            aboutRepeater {
              cardText
              cardTitle
              icon {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
          demoSection {
            fieldGroupName
            text
            title
            link {
              title
              url
            }
          }
          heroSection {
            fieldGroupName
            heroSubtitle
            heroTitle
          }
          mapSection {
            fieldGroupName
            subtitle
            text
            title
            link {
              title
              url
            }
            map {
              sourceUrl
              localFile {
                childImageSharp {
                  fluid(quality: 100) {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            locations {
              color
              locationIcon {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
            orderConfirmed {
              text
              icon {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
          posSection {
            fieldGroupName
            subtitle
            text
            title
            link {
              title
              url
            }
            partnersLogoIcons {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
            partnersRepeater {
              color
              id
              name
              price
              status
            }
            tabelIcon {
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
              }
            }
          }
          sponsorsSection {
            fieldGroupName
            sponsorsTitle
            sponsorsLogoRepeater {
              logoIcon {
                localFile {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`