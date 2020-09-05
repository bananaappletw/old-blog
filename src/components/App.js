import React from "react"
import Header from "./Header"
import { makeStyles } from '@material-ui/core/styles';
import SEO from "./seo"
import "./App.css";
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles(theme => ({
  app: {
    backgroundColor: '#fafafa',
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh"
  },
  header: {
    backgroundColor: theme.palette.secondary.main
  },
  content: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    maxWidth: theme.breakpoints.values.lg
  }
}))

const App = ({ title, description, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.app} >
      <SEO title={title} description={description} />
      <CssBaseline />
      <div className={classes.header}>
        <Header />
      </div>
      <main className={classes.content}>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}


App.defaultProps = {
  title: ``,
  description: ``,
}


export default App
