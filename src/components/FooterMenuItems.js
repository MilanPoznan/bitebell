import React from 'react'
import {Link} from 'gatsby'

export default function FooterMenuItems({childItems}) {

  const {childItems: {nodes}} = childItems

  return (
    <div className="footer__menu-items">
      {
        nodes.map((node, index) => {
          return (
            <div className="footer__menu-items-item" key={index}>
              <Link to={node.path}>{node.label}</Link>
            </div>
          )
        })
      }
    </div>
  )
}