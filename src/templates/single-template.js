import React from 'react'

import Layout from '../components/Layout'
import SinglePostLayout from '../components/SinglePostLayout';


/**
 * singlePostTemplate component
 * 
 * @returns {JSX Element}
 */
export default function singlePostTemplate({ data, pageContext }) {

  const {
    allWpPost: { nodes },
    allWpMenu: { menus },
    wp: { optionsPage: { options: { logo } } } } = data


  const { comments, databaseId, title, content, slug, uri, language, translations, author_section, featuredImage } = nodes[0]
  console.log(comments)
  const postBlogImage = featuredImage && featuredImage.node.file.blogImage.fluid

  const menuPosition = language.slug === 'sr' ? "MENU_1" : "MENU_1___EN";
  const currLangMenu = menus.filter(menu => menu.locations[0] === menuPosition)
  const currTranslations = language.slug === 'sr'
    ? translations[0] === undefined ? '/en/news' : [{ uri: `/en/news/${translations[0].slug}/` }]
    : translations[0] === undefined ? '/blog' : [{ uri: `/blog/${translations[0].slug}` }]

  const footerPosition = language.slug === 'sr' ? "FOOTER_MENU" : "FOOTER_MENU___EN";
  const currLangFooter = menus.filter(menu => menu.locations[0] === footerPosition)


  return (
    <Layout language={language.slug} title={title} translations={currTranslations} currLangMenu={currLangMenu[0]} logo={logo} currLangFooter={currLangFooter[0]}>
      <SinglePostLayout
        id={databaseId}
        uri={uri}
        featuredPostArticleImage={postBlogImage}
        postTitle={title}
        postContent={content}
        slug={slug}
        postSlugTranslationName={slug}
        language={language.slug}
        authorName={author_section.authorName}
        // authorImage={author_section.authorImage && author_section.authorImage.file.image.fluid}
        authorDescription={author_section.authorDescription}
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
        id
        databaseId
        date
        content
        slug
        uri
        title
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
        author_section {
          authorName
          authorDescription
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
