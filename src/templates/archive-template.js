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
    wpPage: { language } } = data;
  console.log('NODES: ', nodes);

  const currentLangPosts = nodes.filter(item => item.language.locale === language.locale)

  return (
    <>
      <NewsPageLayout newsData={currentLangPosts} />
    </>
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
      }
      slug
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
