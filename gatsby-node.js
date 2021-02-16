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

  posts.edges.forEach(singlePost => {
    return createPage({
      path: singlePost.post.uri,
      component: path.resolve(`./src/templates/single-template.js`),
      context: {
        id: singlePost.post.id,
        next: singlePost.next,
        previous: singlePost.previous
      }
    })
  }

  )

  pages.nodes.forEach(page => {
    switch (page.slug) {
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
      case 'schedule-a-demo':
      case 'zakazi-demo':
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/request-demo-template.js'),
          context: {
            id: page.id,
            slug: page.slug
          }
        })
        break;

      default:
        createPage({
          path: page.uri,
          component: path.resolve('./src/templates/page-template.js'),
          context: {
            id: page.id
          }
        })
        break;
    }

  })

  await createArchivePage(posts, graphql, createPage)

}


//Create posts archive
async function createArchivePage(posts, graphql, createPage) {

  const graphqlResult = await graphql(`
  {
    wp {
      readingSettings {
        postsPerPage
      }
    }
  }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings
  //Loadsh.chunk() function is used to break the array in to small chunks. Each chunk is an array of size as given.
  //params (array, size)
  const postsChunkedIntoArchivePages = chunk(posts.edges, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          return page === 1 ? `blog/` : `/blog/${page}`
        }
        return null
      }

      await createPage({
        path: getPagePath(pageNumber),
        component: path.resolve('./src/templates/post-archive.js'),
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
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