import React from "react"
import Link from "gatsby-link"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostsList from "../components/posts-list"

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const IndexPage = ({ pageContext }) => {
  const { group, index, first, last, pageCount } = pageContext
  const previousUrl = index - 1 === 1 ? "/" : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <Layout>
      <SEO title={`Page ${index}`} />
      <PostsList postNodes={group} />
      <div>
        {index === 2 ? (
          <NavLink test={first} url={"/"} text="Go to Homepage" />
        ) : (
          <NavLink
            test={first}
            url={"page/" + previousUrl}
            text="Go to Previous Page"
          />
        )}
        <span style={{ margin: "0 1rem", fontWeight: 700 }}>{index}</span>
        {nextUrl <= pageCount ? (
          <NavLink test={last} url={"page/" + nextUrl} text="Go to Next Page" />
        ) : null}
      </div>
    </Layout>
  )
}
export default IndexPage
