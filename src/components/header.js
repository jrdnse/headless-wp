import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { rhythm } from "../utils/typography"
import styled from "styled-components"

const Menu = styled.ul`
  display: flex;
  margin-bottom: 0;
`
const MenuLink = styled.li`
  padding: 1rem;
  list-style-type: none;
  &:nth-child(1) {
    padding-left: 0;
  }
`

const Header = ({ menuLinks, siteTitle, siteDesc }) => (
  <header
    style={{
      fontFamily: `Montserrat, sans-serif`,
      marginTop: 0,
    }}
  >
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(36),
        padding: `${rhythm(1)} ${rhythm(3 / 4)}`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "black",
            boxShadow: "none",
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p>{siteDesc}</p>
      <div>
        <nav>
          <Menu>
            <MenuLink key="Home">
              <Link to={"/"}>Home</Link>
            </MenuLink>
            {menuLinks.map(link => (
              <MenuLink key={link.node.title}>
                <Link to={link.node.slug}>
                  {link.node.title}
                </Link>
              </MenuLink>
            ))}
          </Menu>
        </nav>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
