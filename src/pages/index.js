import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/posts-list"

const IndexPage = ({ data }) => {
  const postNodes = data.allWordpressPost.edges
  return (
    <Layout>
      <SEO title="Home" keywords={[`blog`]} />
      <PostsList postNodes={postNodes} />
      {Object.keys(postNodes).length >= 5 ? (
        <Link to="page/2" style={{ textAlign: "right" }}>
          Older posts
        </Link>
      ) : null}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    allWordpressPost(sort: { fields: date, order: DESC }, limit: 5) {
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
  }
`
