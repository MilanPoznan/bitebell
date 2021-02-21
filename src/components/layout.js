import React, { useState, useEffect } from "react"


import './global-styles/oldCss.css';
import './global-styles/_normalize.scss';
import './global-styles/_global-styles.scss';


import Header from './Header'
import Footer from './Footer'
import { useScrollPosition, getScrollPosition } from '../hooks/useScrollPosition'

const Layout = ({ currLangMenu, children, logo, language, translations }) => {

  const [isScrolled, setIsScrolled] = useState(false)

  /**
 * Handle scroll
 */
  const handleScroll = () => {
    if (window.pageYOffset > 40) {
      if (!isScrolled) {
        setIsScrolled(true)
      }
    } else {
      if (isScrolled) {
        setIsScrolled(false)
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return (
    <div className="global-wrapper">
      <header className={`main-header-wrapper ${isScrolled ? 'main-header-wrapper__scrolled' : ''}`}>
        <Header translations={translations} currLangMenu={currLangMenu} currentLang={language} logo={logo} />
      </header>
      <main className="main">{children}</main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
