import React, { useState } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './Header.scss'
import './Hamburger.scss'

import { useCurrentWidth } from '../hooks/uzeResize'

export default function Header({ currLangMenu, logo, currentLang, translations }) {

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const { menuItems: { nodes } } = currLangMenu
  const { file: { image: { fluid } } } = logo

  const parentMenuItems = nodes.filter(menuItem => menuItem.parentId === null)
  const windowWidth = useCurrentWidth()


  return (
    <div className="main-header">

      <div className="main-header__left">
        <div className="main-header__logo">
          <Link className={currentLang === 'sr' && 'active'} to='/'>
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
      <nav className={`menu ${windowWidth < 1024 ? isHamburgerOpen ? '' : 'hidden' : ''}`}>
        {parentMenuItems.map((menuItem, index) => {
          const { childItems } = menuItem
          return (
            childItems.nodes.length !== 0 ?
              <div className="menu__item-wrapper" key={index}>
                <Link to={menuItem.path} className={`menu__item menu__item--has-child ${menuItem.cssClasses.map(item => item)}`} key={index}>
                  {menuItem.label}
                </Link>
                <div className="menu__item-submenu">
                  {childItems.nodes.map((subMenuItem, index) => <Link key={index} to={subMenuItem.path}>{subMenuItem.label}</Link>)}
                </div>
              </div>
              :
              <Link to={menuItem.path} className={`menu__item ${menuItem.cssClasses.map(item => item)}`} key={index}>
                {menuItem.label}
              </Link>
          )
        }
        )}
        <div className="menu__lang">
          <Link className={currentLang === 'en' ? 'active' : 'inactive'} to={translations[0].uri} >EN</Link>
          <Link className={currentLang === 'sr' ? 'active' : 'inactive'} to={translations[0].uri} >SR</Link>
        </div>
      </nav>
    </div>
  )
}
