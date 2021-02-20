import React from 'react'
import { graphql } from 'gatsby'
import NewsPageLayout from '../components/NewsPageLayout';
import Layout from '../components/Layout';

/**
 * Archive Template for blog/news page
 * 
 * @param {object} data
 * @param {object} pageContext
 *
 * @returns {JSX Element}
 */
export default function archiveTemplate({ data }) {

  const { allWpPost: { nodes },
    wpPage: { language, title, translations },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } }  } = data;

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";
  
  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)
  
  const currentLangPosts = nodes.filter(item => item.language.locale === language.locale)
  // console.log('Current Lang Posts: ', currentLangPosts)

  return (
    <Layout language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo}>
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
      }
    }
  }`
