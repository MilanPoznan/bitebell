const path = require(`path`)
const chunk = require(`lodash/chunk`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async ({ graphql, actions, reporter }) => {

  const { createPage } = actions


  const posts = await getPosts(graphql, reporter)
  const pages = await getPages(graphql, reporter)
  const integrationTypes = await getIntegrationTypes(graphql, reporter)

  posts.edges.forEach(singlePost => {
    const postPath = singlePost.post.language.slug === 'en'
      ? `en/blog-en/${singlePost.post.slug}`
      : `blog/${singlePost.post.slug}`
    return createPage({
      path: postPath,
      component: path.resolve(`./src/templates/single-template.js`),
      context: {
        id: singlePost.post.id,
        next: singlePost.next,
        previous: singlePost.previous
      }
    })
  })

  //Create page for each Integration type
  integrationTypes.forEach(singleType => {

    const isEng = singleType.language.slug === 'en'

    let postPath = `${isEng ? '/integrations/' : '/sr/integracije/'}${singleType.slug}`

    return createPage({
      path: postPath,
      component: path.resolve('./src/templates/integracije-template.js'),
      context: {
        id: isEng ? "cG9zdDoyNg==" : "cG9zdDoyMg==",
        currCategory: singleType.name
      }
    })
  })

  pages.nodes.forEach(page => {
    switch (page.slug) {
      case 'faq':
      case 'najcesce-postavljana-pitanja':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/faq-template.js'),
          context: {
            id: page.id
          }
        })
        break;
      case 'integrations':
      case 'integracije':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/integracije-template.js'),
          context: {
            id: page.id
          }
        })
        break;
      case 'partnerships':
      case 'partnerstva':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/contact-template.js'),
          context: {
            id: page.id,
            slug: page.slug
          }
        })
        break;
      case 'blog':
      case 'blog-en':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/archive-template.js'),
          context: {
            id: page.id,
            slug: page.slug
          }
        })
        break;

      case 'schedule-a-demo':
      case 'zakazite-demo':
      case 'request_demo':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/request-demo-template.js'),
          context: {
            id: page.id,
            slug: page.slug
          }
        })
        break;
      case 'test-slider':
        createPage({
          path: '/test-slider',
          component: path.resolve('./src/templates/test-page-template.js'),
          context: {
            id: page.id
          }
        })
        break;
      case 'pocetna':
        createPage({
          path: '/sr',
          component: path.resolve('./src/templates/page-template.js'),
          context: {
            id: page.id
          }
        })
        break;
      case 'homepage':
        createPage({
          path: '/',
          component: path.resolve('./src/templates/page-template.js'),
          context: {
            id: page.id
          }
        })
        break;
      default:
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/default-page-template.js'),
          context: {
            id: page.id
          }
        })
        break;
    }

  })


}



//Get all pages
async function getPages(graphql, reporter) {
  const pagesResult = await graphql(`
    query WpPages {
      allWpPage {
        nodes {
          id
          title
          slug
          uri
        }
      }
    }
  `)

  if (pagesResult.errors) {
    reporter.panicOnBuild(
      'There was an error loading your Single Page',
      pagesResult.errors
    )
    return
  }
  return pagesResult.data.allWpPage
}


async function getIntegrationTypes(graphql, reporter) {
  const integrationTypesResult = await graphql(`
    query IntegrationTypes {
      allWpIntegrationType {
        nodes {
          name
          slug
          uri
          language {
            locale
            slug
          }
        }
      }
    }
  `)

  if (integrationTypesResult.errors) {
    reporter.panicOnBuild(
      'There was an error loading your Work CPT',
      integrationTypesResult.errors
    )
    return
  }
  return integrationTypesResult.data.allWpIntegrationType.nodes
}

//Get all Works CPT
async function getPosts(graphql, reporter) {
  const graphqlResults = await graphql(`
  query WpPost {
    allWpPost {
      edges {
        previous {
          id
          link
        }
        post: node {
          id
          title
          slug
          uri
          language {
            slug
          }
        }
        next {
          id
          link
        }
      }
    }
  }
  `)

  if (graphqlResults.errors) {
    reporter.panicOnBuild(
      'There was an error loading your Work CPT',
      graphqlResults.errors
    )
    return
  }

  return graphqlResults.data.allWpPost
}