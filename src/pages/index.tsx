// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Typography from '@material-ui/core/Typography';
import App from "../components/App"
import { Card, CardContent, CardActions, Button, makeStyles, requirePropFactory, CardActionArea } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat( auto-fit, 200px )",
    gridGap: "20px"

  },
  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }

}))
type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          description: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const classes = useStyles();
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (

    <App title={siteTitle}>
      <div className={classes.cards}>

        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <Card className={classes.card}>
              <CardActionArea>
                <CardContent>
                  <Typography component="h1">
                    {title}
                  </Typography>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" component={Link} to={node.fields.slug}>
                  LEARN MORE
                </Button>
              </CardActions>
            </Card>
            // <article key={node.fields.slug}>
            //   <header>
            //     <h3>
            //       <Link to={node.fields.slug}>
            //         {title}
            //       </Link>
            //     </h3>
            //     <small>{node.frontmatter.date}</small>
            //   </header>
            //   <section>
            //     <p
            //       dangerouslySetInnerHTML={{
            //         __html: node.frontmatter.description || node.excerpt,
            //       }}
            //     />
            //   </section>
            // </article>
          )
        })}

      </div>
    </App>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
