import React from 'react'
import { graphql } from 'gatsby'
import NewsPageLayout from '../components/NewsPageLayout';
import Layout from '../components/Layout';

/**
 * Archive Template for blog/news page
 * 
 * @param {object} data
 *
 * @returns {JSX Element}
 */
export default function archiveTemplate({ data }) {

  const { allWpPost: { nodes },
    wpPage: { language, title, translations },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } } } = data;

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";
  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const currentLangPosts = nodes.filter(item => item.language.locale === language.locale)

  const footerPosition = language.slug === 'sr' ? "FOOTER_MENU" : "FOOTER_MENU___EN";
  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout title={title} language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <NewsPageLayout newsData={currentLangPosts} />
    </Layout>
  )
}

export const newsQuery = graphql`
  query newsById($id: String) {
    wpPage(id: {eq: $id}) {
      title
      translations {
        uri
      }
      language {
        locale
        slug
      }
    }
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
    allWpPost(sort: {fields: [date], order:DESC}) {
      nodes {
        title
        slug
        content
        language {
          locale
          slug
        }
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            file: localFile {
              blogImage: childImageSharp {
                fluid(maxWidth: 400) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        author_section {
          authorName
          authorDescription
          
        }
      }
    }
  }`
