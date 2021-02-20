import React from 'react'

import Layout from '../components/Layout'
import SinglePostLayout from '../components/SinglePostLayout';

export default function singlePostTemplate({ data }) {

  const {
    allWpPost: { nodes },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } } } = data

  const postBlogImage = nodes[0].featuredImage.node.file.blogImage

  const { title, language, translations } = nodes[0]

  // console.log('Language: ', language);
  // console.log('Translations: ', translations);

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";

  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)

  return (
    <Layout language={language.slug} title={title} translations={translations} currLangMenu={currLangMenu[0]} logo={logo}>
      <SinglePostLayout 
        featuredPostArticleImage={postBlogImage}
        postTitle={nodes[0].title}
        postContent={nodes[0].content}
        slug={nodes[0].slug}
        postSlugTranslationName={nodes[0].slug}
        language={language.locale}
      />
    </Layout>
  )
}

export const singlePostQuery = graphql`
  query singlePost($id: String!) {
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
    allWpPost(filter: {id: {eq: $id}}) {
      nodes {
        date
        content
        slug
        title
        author {
          node {
            avatar {
              url
            }
            firstName
          }
        }
        featuredImage {
          node {
            file: localFile {
              blogImage: childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
        translations {
          slug
          uri
        }
        language {
          locale
          slug
        }
      }
    }
  }
`
