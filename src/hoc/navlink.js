import React from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = props => {
  const routerNavLinkPropTypesKeys = 
  ["innerRef", "onClick", "replace", "target", 
  "to", "aria-current", "activeClassName", "activeStyle", "className", 
  "exact", "isActive", "location", "strict", /*"style"*/]

  const passProps = routerNavLinkPropTypesKeys.reduce(
    (passedProps, propName) => {
      passedProps[propName] = props[propName];
      return passedProps;
    },
    {}
  );

  return <RouterNavLink {...passProps}  style={{
  textDecoration: 'none', color: props.color}}>{props.children}</RouterNavLink>;
};

export default NavLink;