import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../components/prism.css"
import Prism from "prismjs"
import Link from 'gatsby-link'

const BlogPostTemplate = ({ data }) => {
  const postData = data.wordpressPost
  let featuredImg = undefined

  useEffect(() => {
    Prism.highlightAll()
  }, [])

  if (postData.featured_media) {
    featuredImg = postData.featured_media.localFile.childImageSharp.fixed
  }

  return (
    <Layout>
      <SEO title={postData.title} description={postData.excerpt} />
      <hr style={{ width: "4rem", height: "2px" }} />
      <h3
        style={{ fontSize: 33 }}
        dangerouslySetInnerHTML={{ __html: postData.title }}
      />
      <p
                style={{
                  margin: 0,
                  color: "grey",
                  fontSize: 16,
                  marginTop: 8,
                  marginBottom: 10,
                }}
              >
                Written by{" "}
                <Link to={`/author/${postData.author.slug}`}>
                  {postData.author.name}
                </Link>{" "}
                on {postData.date}
              </p>
              <p style={{
                  margin: 0,
                  color: "grey",
                  fontSize: 16,
                  marginTop: 8,
                  marginBottom: 10,
                }}>Categories: {postData.categories.map(category => (
                  <Link to={`/category/${category.slug}`}>{category.name}, </Link>
                  ))}
                </p>
      {featuredImg && (
        <Img
          fluid={featuredImg}
          alt={postData.title}
          style={{
            paddingBottom: "20em",
            height: "200px",
            width: "100%",
            objectFit: "cover",
            marginBottom: "2rem",
          }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
    </Layout>
  )
}
export default BlogPostTemplate

export const query = graphql`
  query($id: Int!) {
    wordpressPost(wordpress_id: { eq: $id }) {
      title
      content
      excerpt
      date(formatString: "MMMM DD, YYYY")
      author {
        name
        slug
      }
      categories{
        name
        slug
      }
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
`
