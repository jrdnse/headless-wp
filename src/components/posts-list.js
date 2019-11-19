import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import Img from "gatsby-image"

const Li = styled.li`
  padding-bottom: 10px;
  margin-bottom: 45px;
`

const Ul = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  margin: 0;
`

const PostsList = ({ postNodes }) => {
  return (
    <Ul>
      {postNodes.map(post => (
        <Li key={post.node.wordpress_id} style={{ maxWidth: "100%" }}>
          <hr style={{ width: "4rem", height: "2px" }} />
          <Link
            to={`/${post.node.slug}`}
            style={{
              color: "black",
              textDecoration: "none",
              boxShadow: "none",
            }}
          ></Link>
          <div>
            <Link
              to={`/${post.node.slug}`}
              style={{
                color: "black",
                textDecoration: "none !important",
              }}
            >
              <h3
                dangerouslySetInnerHTML={{ __html: post.node.title }}
                style={{ fontSize: 33, marginTop: 0 }}
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
                <Link to={`/author/${post.node.author.slug}`}>
                  {post.node.author.name}
                </Link>{" "}
                on {post.node.date}
              </p>
              <p style={{
                  margin: 0,
                  color: "grey",
                  fontSize: 16,
                  marginTop: 8,
                  marginBottom: 10,
                }}>Categories: {post.node.categories.map(category => (
                  <Link to={`/category/${category.slug}`}>{category.name}, </Link>
                  ))}
                </p>
              {post.node.featured_media && (
                <Img
                  fixed={
                    post.node.featured_media.localFile.childImageSharp.fixed
                  }
                  alt={post.node.title}
                  style={{
                    paddingBottom: "20em",
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              )}
            </Link>
            <article
              style={{ marginBottom: "2rem" }}
              dangerouslySetInnerHTML={
                post.node.excerpt
                  ? { __html: post.node.excerpt }
                  : {
                      __html: post.node.content
                        .substr(
                          0,
                          Math.min(240, post.node.content.lastIndexOf(" "))
                        )
                        .concat("..."),
                    }
              }
            />
            <Link
              to={`/${post.node.slug}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              Continue reading ⟶
            </Link>
          </div>
        </Li>
      ))}
    </Ul>
  )
}
export default PostsList
