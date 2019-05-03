import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './header.css'

const Header = props => {
  
  const {headerRef, title, children} = props;
  
  return (
  <header ref={headerRef} className={classes.header} >
    <nav className={classes.navigation}>
      <h1>
        <NavLink to='/' className={classes.logo}>
          {title}
        </NavLink> 
      </h1>
      <ul className={classes.navlist}>  
        <li>
          <NavLink to='/' className={classes.navigation__link }> 
            ГЛАВНАЯ
          </NavLink>  
        </li>
        <li>
          <NavLink to='/park' className={classes.navigation__link }> 
            НАШ АВТОПАРК
          </NavLink>  
        </li>
        <li>
          <NavLink to='/conditions' className={classes.navigation__link }> 
            УСЛОВИЯ АРЕНДЫ
          </NavLink>  
        </li>
        <li>
          <NavLink to='/contacts' className={classes.navigation__link }> 
            КОНТАКТЫ
          </NavLink>  
        </li>
      </ul>
    </nav>
    {children}    
  </header>
)}

export default Header;