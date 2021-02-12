import React from "react"


const Layout = ({ children }) => {

  return (
    <div className="global-wrapper">
      <header>
        Header
      </header>
      <main>{children}</main>
      <footer>
        Footer
      </footer>
    </div>
  )
}

export default Layout
