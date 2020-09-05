import React from "react";
import {
  List,
} from "@material-ui/core";
import NestedListList from './NestedListList'

const NestedList = ({ list }) => {
  return (
    <List
      component="nav"
    >
      {
        list.map((i) => {
          return <NestedListList key={i.name} list={i} />
        })
      }
    </List>
  )
}

const PostSidebar = ({ headings }) => {
  let depth = 0
  let list = []
  const stack = []
  headings.forEach((heading) => {
    if (depth < heading.depth) {
      if (list.length > 0) {
        stack.push(list)
        list = []
      }
    }
    if (depth > heading.depth) {
      while (stack.length > 0) {
        const tmp = stack.pop()
        tmp[tmp.length - 1].children = tmp[tmp.length - 1].children.concat(list)
        // tmp[tmp.length - 1].children = list
        list = tmp
        if (tmp[tmp.length - 1].depth <= heading.depth)
          break;
      }
    }

    list.push(
      {
        name: heading.id,
        children: [],
        depth: heading.depth
      }
    )
    depth = heading.depth
  })


  return (
    <NestedList list={list} />
  );
};

export default PostSidebar;
