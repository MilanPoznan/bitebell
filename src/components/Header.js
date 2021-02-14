import React, { useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './Header.scss'
import './Hamburger.scss'

export default function Header({ currLangMenu, logo }) {

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const { menuItems: { nodes } } = currLangMenu
  const { file: { image: { fluid } } } = logo

  const parentMenuItems = nodes.filter(menuItem => menuItem.parentId === null)
  console.log(parentMenuItems)

  return (
    <div className="main-header">

      <div className="main-header__left">
        <div className="main-header__logo">
          <Link to='/'>
            <Img fluid={fluid} />
          </Link>
        </div>
      </div>
      <div className="main-header__hamburger">
        <div className={`hamburger ${isHamburgerOpen ? 'active' : ''}`} onClick={() => setIsHamburgerOpen(!isHamburgerOpen)}>
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
      </div>
      <nav className="menu">
        {parentMenuItems.map((menuItem, index) => {
          const { childItems } = menuItem
          return (
            childItems.nodes.length !== 0 ?
              <div className="menu__item-wrapper">
                <Link to={menuItem.path} className={`menu__item menu__item--has-child ${menuItem.cssClasses.map(item => item)}`} key={index}>
                  {menuItem.label}
                </Link>
                <div className="menu__item-submenu">
                  {childItems.nodes.map(subMenuItem => <Link to={subMenuItem.path}>{subMenuItem.label}</Link>)}
                </div>
              </div>
              :
              <Link to={menuItem.path} className={`menu__item ${menuItem.cssClasses.map(item => item)}`} key={index}>
                {menuItem.label}
              </Link>
          )
        }

        )}
      </nav>
    </div >
  )
}
