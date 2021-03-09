import React, { useState, useEffect } from "react"


import './global-styles/oldCss.css';
import './global-styles/_normalize.scss';
import './global-styles/_global-styles.scss';


import Header from './Header'
import Footer from './Footer'
import SEO from './seo'
import { useScrollPosition, getScrollPosition } from '../hooks/useScrollPosition'

const Layout = ({ seoTitle, metaDesc, currLangMenu, children, logo, language, translations, currLangFooter }) => {

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
      <SEO description={metaDesc} pageTitle={seoTitle} title={seoTitle} />
      <header className={`main-header-wrapper ${isScrolled ? 'main-header-wrapper__scrolled' : ''}`}>
        <Header translations={translations} currLangMenu={currLangMenu} currentLang={language} logo={logo} />
      </header>
      <main className="main">{children}</main>
      <footer>
        <Footer currLangFooter={currLangFooter} language={language} />
      </footer>
    </div>
  )
}

export default Layout
