import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import './Header.scss'
import './Hamburger.scss'

import { useCurrentWidth } from '../hooks/uzeResize'

export default function Header({ currLangMenu, logo, currentLang, translations, phoneNumber }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const { menuItems: { nodes } } = currLangMenu
  const { file: { image: { fluid } } } = logo

  const parentMenuItems = nodes.filter(menuItem => menuItem.parentId === null)
  const windowWidth = useCurrentWidth()
  const body = typeof document !== 'undefined' && document.body

  useEffect(() => {
    isHamburgerOpen ? body.classList.add('no-scroll') : body.classList.remove('no-scroll')
  }, [isHamburgerOpen])
  return (
    <div className="main-header">

      <div className="main-header__left">
        <div className="main-header__logo">
          <Link
            className={`${currentLang === 'sr' ? 'active' : ''} main-header__logo-link`}
            to={currentLang === 'sr' ? '/sr' : "/"}>
            <Img fluid={fluid} loading="eager" />
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
        <div className="menu__wrapper">
          {parentMenuItems.map((menuItem, index) => {
            const { childItems } = menuItem

            console.log(menuItem.cssClasses)
            return (
              childItems.nodes.length !== 0 ?
                <div className="menu__item-wrapper" key={index}>
                  <Link to={menuItem.path} className={`menu__item menu__item--has-child ${menuItem.cssClasses.map(item => `${item}`)}`} key={index}>
                    {menuItem.label}
                  </Link>
                  <div className="menu__item-submenu" onClick={() => setIsHamburgerOpen(false)}>
                    {childItems.nodes.map((subMenuItem, index) => {
                      let submenuPath = subMenuItem.url
                      let anchorTagsubmenu = submenuPath.split('/').slice(-1)[0]
                      return <Link key={index} to={`/${anchorTagsubmenu}`}>{subMenuItem.label}</Link>
                    })}
                  </div>
                </div>
                :
                <Link to={menuItem.path} className={`menu__item ${menuItem.cssClasses.map(item => ` ${item} `)}`} key={index}>
                  {menuItem.label}
                </Link>
            )
          }
          )}

        </div>
        <a href={`tel:${phoneNumber}`} className={`${currentLang === 'sr' ? 'demo-call-rs' : 'demo-call-en'} menu__phone cta-menu cta-menu-round`}>
          <svg width="12px" height="12px" viewBox="0 0 12 12" version="1.1" >
            <g id="Designs-v2" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Homepage-2-alternatief" transform="translate(-1015.000000, -45.000000)" fill="#FFFFFF">
                <g id="Group-3" transform="translate(1004.000000, 36.000000)">
                  <g id="Group-2">
                    <g id="icon-call" transform="translate(11.000000, 9.000000)">
                      <path d="M2.99793109,5.2158525 C2.84477069,4.4433525 3.71172911,4.0313205 4.27278257,3.6708525 C4.57862812,3.4650765 4.62968158,3.1556925 4.52757465,2.8467885 C4.22172911,1.9711605 3.66061623,1.1987085 3.30369346,0.323068503 C3.25264119,0.168376503 3.09995485,0.0657285035 2.94679445,0.0141645035 C1.46818059,-0.140527497 0.396972552,0.992908503 0.0911508527,2.3832045 C-0.826860993,6.5035245 5.39455683,12.7866045 9.52457663,11.9109648 C10.9016063,11.6020609 12.0233093,10.5201645 11.8701608,9.0267645 C11.8191085,8.8720725 11.7170004,8.7178605 11.5643152,8.6662965 C10.6973568,8.3058285 9.93255287,7.7391045 9.06558257,7.4301765 C8.75973703,7.3270509 8.45389148,7.3786137 8.24967762,7.6875165 C7.89277861,8.2542405 7.48482614,9.1294365 6.71997465,8.9751165 C5.39403406,8.7177765 3.20159841,6.5028765 2.99736079,5.2152765 L2.99793109,5.2158525 Z" id="Fill-1"></path>
                    </g>
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </a>
        <div className="menu__lang">
          <Link className={currentLang === 'en' ? 'active' : 'inactive'} to={translations.length === 0 ? '/en' : translations[0].uri} >EN</Link>
          <Link className={currentLang === 'sr' ? 'active' : 'inactive'} to={translations.length === 0 ? '/' : translations[0].uri} >SR</Link>
        </div>
      </nav>
    </div >
  )
}
