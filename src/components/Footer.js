import React from 'react'
import FooterMenuItems from './FooterMenuItems'
import HeartIcon from '../img/heart-icon.svg'
import './Footer.scss'

export default function Footer({ currLangFooter, language }) {

  const { menuItems: { nodes } } = currLangFooter;

  const isEn = language === 'en' && true

  const footerText = {
    copyright: isEn ? '© Copyright' : '© Sva prava zadržana',
    build: isEn ? 'Built with ' : 'Napravljeno s ljubavlju ',
    city: isEn ? ' in Belgrade' : ' u Beogradu',
    imgCopy: isEn ? 'All logos are trademarks of their respective owners' : 'Svi logotipi su svojina njihovih vlasnika'

  }

  const menuItemParent = nodes.filter(node => node.parentDatabaseId === 0)

  return (
    <div className="footer">
      <div className="container">
        <div className="footer-nav">
          {
            menuItemParent.map((node, index) => {

              return (
                <div className="footer-nav-list footer__container" key={index}>
                  <p>{node.label}</p>
                  <FooterMenuItems childItems={node} />
                </div>
              )
            })
          }
        </div>
        <div className="footer-inner footer__copyright-wrapper">
          <p>{footerText.copyright} {(new Date().getFullYear())} Bitebell Technologies.</p>
          <div className="footer__copyright">
            <p>{footerText.build} </p>
            <img src={HeartIcon} />
            <p> {footerText.city}</p>
          </div>
        </div>
        <p>{footerText.imgCopy}</p>
      </div>
    </div>
  )
}