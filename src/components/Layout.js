import React, { useState, useEffect } from "react"
import CookieConsent from "react-cookie-consent";


import './global-styles/oldCss.css';
import './global-styles/_normalize.scss';
import './global-styles/_global-styles.scss';


import Header from './Header'
import Footer from './Footer'
import SEO from './seo'

const Layout = ({ title, seoTitle, metaDesc, currLangMenu, children, logo, language, translations, currLangFooter, image, phoneNumber }) => {

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
        disableStyles={true}
        location="bottom"
        buttonClasses="cookie-popup-btn"
        containerClasses="cookie-popup"
        contentClasses="cookie-content"
        buttonText={language === 'sr' ? "Prihvatam" : "Accept"}
        enableDeclineButton={true}
        declineButtonText={language === 'sr' ? "Ne prihvatam" : "Decline"}
        cookieName="gatsby-gdpr-google-analytics"
        onAccept={() => {
          // Cookies.set("gatsby-gdpr-google-tagmanager", true)
          // window[`ga-disable-UA-46011787-23`] = true

        }}
        onDecline={() => {
          window[`ga-disable-UA-46011787-23`] = true

        }}
      >
        <svg width="41" height="41" viewBox="0 0 41 41"><g fill="none" fill-rule="evenodd"><path fill="#9B572B" d="M29.59 0c-4.235.005-8.103 2.404-9.991 6.195 7.645 1.346 13.63 7.333 14.975 14.978 4.647-2.307 7.094-7.512 5.905-12.563C39.29 3.56 34.779-.008 29.59 0z" opacity=".7"></path><path fill="#B9896A" d="M16.439 7.89C7.36 7.89 0 15.25 0 24.33c0 9.079 7.36 16.439 16.439 16.439s16.439-7.36 16.439-16.44c-.01-9.074-7.364-16.428-16.44-16.438z"></path><g fill="#864937" transform="translate(6.632 5.426)"><circle cx="12.059" cy="11.456" r="1.809"></circle><circle cx="18.088" cy="21.706" r="1.809"></circle><circle cx="9.647" cy="19.294" r="1.809"></circle><circle cx="1.809" cy="15.676" r="1.809"></circle><circle cx="6.632" cy="27.132" r="1.809"></circle><circle cx="25.926" cy="1.809" r="1.809"></circle></g></g></svg>
        <p>
          {language === 'sr'
            ? 'Mi koristimo kolačiće u cilju unapređenja usluge'
            : 'We are using cookies for user experience improving '}
        </p>
      </CookieConsent>
    </div>
  )
}

export default Layout
