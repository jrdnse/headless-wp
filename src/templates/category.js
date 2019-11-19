import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/posts-list"

const CategoryTemplate = ({ data }) => {
  const categoryData = data.allWordpressPost.edges

  return (
    <Layout>
      <SEO
        title={data.wordpressCategory.name}
        description={`Posts about ${data.wordpressCategory.name}`}
      />
      <div style={{ marginBottom: "4rem" }}>
        <h4 style={{ marginBottom: 0 }}>Showing posts for category:</h4>
        <h1>{data.wordpressCategory.name}</h1>
      </div>
      <PostsList postNodes={categoryData} />
    </Layout>
  )
}

export default CategoryTemplate
export const query = graphql`
  query($id: Int!) {
    allWordpressPost(
      sort: { fields: date, order: DESC }
      filter: { categories: { elemMatch: { wordpress_id: { eq: $id } } } }
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
    wordpressCategory(wordpress_id: { eq: $id }) {
      name
    }
  }
`
