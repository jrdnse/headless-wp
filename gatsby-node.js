const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createPaginatedPages = require("gatsby-paginate")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const BlogPostTemplate = path.resolve("./src/templates/blog-post.js")
  const PageTemplate = path.resolve("./src/templates/page.js")
  const AuthorTemplate = path.resolve("./src/templates/author.js")
  const CategoryTemplate = path.resolve("./src/templates/category.js")

  const result = await graphql(`
    {
      allWordpressPost(sort: { fields: date, order: DESC }) {
        edges {
          node {
            slug
            wordpress_id
            title
            excerpt
            author {
              name
              slug
            }
            categories {
              name
              slug
            }
            date(formatString: "MMMM DD, YYYY")
            featured_media {
              localFile {
                childImageSharp {
                  fixed(width: 1000) {
                    base64
                    width
                    height
                    src
                    srcSet
                  }
                }
              }
            }
          }
        }
      }
      allWordpressPage {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressWpUsers {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
      allWordpressCategory {
        edges {
          node {
            slug
            wordpress_id
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  const BlogPosts = result.data.allWordpressPost.edges

  createPaginatedPages({
    edges: BlogPosts,
    createPage: createPage,
    pageTemplate: "src/templates/posts.js",
    pageLength: 5,
    pathPrefix: "page",
  })

  BlogPosts.forEach(post => {
    createPage({
      path: `/${post.node.slug}`,
      component: BlogPostTemplate,
      context: {
        id: post.node.wordpress_id,
      },
    })
  })

  const Pages = result.data.allWordpressPage.edges
  Pages.forEach(post => {
    createPage({
      path: `/${post.node.slug}`,
      component: PageTemplate,
      context: {
        id: post.node.wordpress_id,
      },
    })
  })

  const Authors = result.data.allWordpressWpUsers.edges
  Authors.forEach(author => {
    createPage({
      path: `/author/${author.node.slug}`,
      component: AuthorTemplate,
      context: {
        id: author.node.wordpress_id,
      },
    })
  })

  const Categories = result.data.allWordpressCategory.edges
  Categories.forEach(category => {
    createPage({
      path: `/category/${category.node.slug}`,
      component: CategoryTemplate,
      context: {
        id: category.node.wordpress_id,
      },
    })
  })
}
