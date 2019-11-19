import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/posts-list"

const AuthorTemplate = ({ data }) => {
  const authorData = data.allWordpressPost.edges

  return (
    <Layout>
      <SEO
        title={data.wordpressWpUsers.name}
        description={`${data.wordpressWpUsers.name}'s Posts`}
      />
      <div style={{ marginBottom: "4rem" }}>
        <h4 style={{ marginBottom: 0 }}>Author archives:</h4>
        <h1>{data.wordpressWpUsers.name}</h1>
      </div>
      <PostsList postNodes={authorData} />
    </Layout>
  )
}

export default AuthorTemplate
export const query = graphql`
  query($id: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      limit: 5
      filter: { author: { wordpress_id: { eq: $id } } }
    ) {
      edges {
        node {
          title
          content
          slug
          excerpt
          wordpress_id
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
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
    wordpressWpUsers(wordpress_id: { eq: $id }) {
      name
    }
  }
`
