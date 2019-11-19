/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import { rhythm } from "../utils/typography"


const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      allWordpressSiteMetadata {
        edges {
          node {
            name
            description
          }
        }
      }
      allWordpressPage(sort: { fields: wordpress_id, order: ASC }) {
        edges {
          node {
            title
            slug
          }
        }
      }
    }
  `)

  return (
    <>
      <Header
        menuLinks={data.allWordpressPage.edges}
        siteTitle={data.allWordpressSiteMetadata.edges[0].node.name}
        siteDesc={data.allWordpressSiteMetadata.edges[0].node.description}
      />

      <div>
        <div
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: rhythm(36),
            padding: `0 ${rhythm(3 / 4)}`,
          }}
        >
          <main>{children}</main>
        </div>
        <div
          style={{
            marginLeft: `auto`,
            marginRight: `auto`,
            maxWidth: rhythm(36),
            padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
          }}
        >
          <footer>
            © {new Date().getFullYear()}, Written by{" "}
            {data.allWordpressSiteMetadata.edges[0].node.name}. Built with
            {` `}
            <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </div>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
