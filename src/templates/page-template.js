import React from 'react'
import Hero from '../components/Hero'

export default function page({ data }) {

  const { allWpPage: { nodes } } = data;
  const { homepage_sections: { aboutSection, demoSection, heroSection, mapSection, posSection, sponsorsSection } } = nodes[0];

  return (
    <div>
      <Hero heroSection={heroSection} />
    </div>
  )
}

export const query = graphql`
  query($id: String) {
    allWpPage(filter: {id: {eq: $id}}) {
      nodes {
        homepage_sections {
          aboutSection {
            title
            fieldGroupName
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
              localFile {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid_withWebp
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