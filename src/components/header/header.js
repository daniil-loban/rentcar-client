import React from 'react';
import classes from './header.css'
import NavLink from '../../hoc/navlink'
import Link from '../../hoc/link'

const Header = props => (
  <header ref={props.headerRef} className={classes.header} >
    <nav className={classes.navigation}>
      <h1 className={classes.logo}>
        <NavLink to={'/'} color="white">
        {props.title}
        </NavLink> 
      </h1>
      <ul className={classes.navlist}>  
      <li>
        <Link to={'/'} color="white" hoverColor="goldenrod" title="ГЛАВНАЯ"/>
      </li>
      <li>
        <Link to={'/park'} color="white" hoverColor="goldenrod" title="НАШ АВТОПАРК"/>
      </li>
      <li>
        <Link to={'/conditions'} color="white" hoverColor="goldenrod" title="УСЛОВИЯ АРЕНДЫ"/>
      </li>
      <li>
        <Link to={'/contacts'} color="white" hoverColor="goldenrod" title="КОНТАКТЫ"/>
      </li>
      </ul>
    </nav>
    {props.children}    
  </header>
)

export default Header;