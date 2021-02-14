import React from "react"

import './global-styles/oldCss.css';

import Header from './Header'

const Layout = ({ currLangMenu, children, logo }) => {

  return (
    <div className="global-wrapper">
      <header>
        <Header currLangMenu={currLangMenu} logo={logo} />
      </header>
      <main>{children}</main>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default Layout
