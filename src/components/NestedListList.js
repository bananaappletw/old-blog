import React from "react";
import {
  Box,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@material-ui/core";

import {
  ExpandLess,
  ExpandMore
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));


const NestedListList = ({ list }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List component="nav">
      {
        (list.children !== undefined && list.children.length > 0) ?
          <>
            <ListItem button component="a" key={list.name} href={`#${list.name}`} onClick={handleClick}>
              <ListItemText primary={list.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box className={classes.nested}>
                {
                  list.children.map((i) => {
                    return <NestedListList list={i} />
                  })
                }
              </Box>
            </Collapse>
          </>
          :
          <ListItem button component="a" key={list.name} href={`#${list.name}`}>
            <ListItemText primary={list.name} />
          </ListItem>
      }
    </List>
  )
}

export default NestedListList;
