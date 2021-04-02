import React, { useState, useEffect } from "react"
import CookieConsent, { Cookies } from "react-cookie-consent";


import './global-styles/oldCss.css';
import './global-styles/_normalize.scss';
import './global-styles/_global-styles.scss';


import Header from './Header'
import Footer from './Footer'
import SEO from './seo'

const Layout = ({ title, seoTitle, metaDesc, currLangMenu, children, logo, language, translations, currLangFooter, image, phoneNumber }) => {
  console.log(Cookies)
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
      <SEO description={metaDesc} pageTitle={seoTitle} title={seoTitle || title} image={image} />
      <header className={`main-header-wrapper ${isScrolled ? 'main-header-wrapper__scrolled' : ''}`}>
        <Header phoneNumber={phoneNumber} translations={translations} currLangMenu={currLangMenu} currentLang={language} logo={logo} />
      </header>
      <main className="main">{children}</main>
      <footer>
        <Footer currLangFooter={currLangFooter} language={language} />
      </footer>
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        declineButtonText="Decline"
        cookieName="gatsby-gdpr-google-analytics"
        onAccept={() => {
          Cookies.set("gatsby-gdpr-google-tagmanager", true)
          let x = new Cookies
          console.log(x)
        }}
      >
        This site uses cookies ...
      </CookieConsent>
    </div>
  )
}

export default Layout
