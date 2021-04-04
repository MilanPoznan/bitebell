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
    wpPage: { seoFields: { metaDescription, seoTitle }, language, title, translations, blogTitles: { pageSubtitle, pageTitle } },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo, phoneNumber } } } } = data;

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";
  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  const currentLangPosts = nodes.filter(item => item.language.locale === language.locale)

  const footerPosition = language.slug === 'sr' ? "FOOTER_MENU" : "FOOTER_MENU___EN";
  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)

  return (
    <Layout seoTitle={seoTitle} metaDesc={metaDescription} phoneNumber={phoneNumber} title={title} language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <NewsPageLayout newsData={currentLangPosts} pageSubtitle={pageSubtitle} pageTitle={pageTitle} />
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
      blogTitles {
        pageSubtitle: subtitle
        pageTitle: title
      }
      seoFields {
          metaDescription
          seoTitle: pageTitle
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
                fluid(maxWidth: 400, quality: 90) {
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
    allWpPost(sort: {fields: [date], order:DESC}) {
      nodes {
        title
        slug
        date
        content
        language {
          locale
          slug
        }
        isPostFeatured: FeaturedPost {
          featuredPost
          previewText
        }
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            file: localFile {
              blogImage: childImageSharp {
                fluid(quality: 90) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        author_section {
          authorName
        }
      }
    }
  }`
