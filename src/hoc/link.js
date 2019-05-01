import React from 'react'
import NavLink from './navlink'
import Radium from "radium";


const LinkText = Radium((props)=><span style={props.style}>{props.children}</span>)

const Link = (props) => {
  return (
    <NavLink exact to={props.to} color={props.color} activeStyle={{ color: props.hoverColor, fontWeight: "bold" }}>
      <LinkText style={{":hover": { color: props.hoverColor}}}>{props.title}</LinkText>
    </NavLink> 
  )
}

export default Link
