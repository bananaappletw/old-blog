import React from "react"
import { Link, graphql } from "gatsby"
import App from "../components/App"
import PostSidebar from "../components/PostSidebar"
import "github-markdown-css";
import { makeStyles, Typography, Box } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  postContainer: {
    display: 'flex',
    direction: 'row'
  },
  PostSidebar: {

  },
  post: {
  }
}))

const BlogPostTemplate = ({ data, pageContext }) => {
  const classes = useStyles();
  const { previous, next } = pageContext
  const markdownRemark = data.markdownRemark

  return (
    <App
      title={markdownRemark.frontmatter.title}
      description={markdownRemark.frontmatter.description || markdownRemark.excerpt}
    >
      <Box className={classes.postContainer}>
        <Box className={classes.PostSidebar}>
          <PostSidebar headings={markdownRemark.headings} />
        </Box>
        <Box className={classes.post}>
          <header>
            <Typography variant="h1">
              {markdownRemark.frontmatter.title}
            </Typography>
            <p>
              {markdownRemark.frontmatter.date}
            </p>
          </header>
          <section className="markdown-body" dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
        </Box>
      </Box>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </App >
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html          
      headings {
        id
        depth
        value
      }
      frontmatter {
        title
        date
        categories
        tags
      }
    }
  }
`
