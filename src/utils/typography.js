import Typography from "typography"
import Wordpress2016 from "typography-theme-wordpress-2016"

Wordpress2016.overrideThemeStyles = ({ rhythm }) => {
  return {
    "a.gatsby-resp-image-link": {
      boxShadow: `none`,
      textDecoration: 'none'
    },
    "ol": {
      listStyle: `decimal inside`,
    },
    "ul": {
      listStyle: `disc inside`,
    },
    "blockquote": {
      marginLeft: 0,
    },
    "h1,h2,h3,h4,h5,h6": {
      marginTop: rhythm(0),
      marginBottom: '1rem',
    },
  }
}

delete Wordpress2016.googleFonts

const typography = new Typography(Wordpress2016)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
