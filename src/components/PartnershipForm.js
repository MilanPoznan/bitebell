import React, { useState } from 'react'
import './PartnershipForm.scss'
import CountrySelect from './CountrySelect'
export default function PartnershipForm({ data, language }) {
  console.log(data)
  const { nameField: { name, nameEn, showNameField, isNameRequired },
    emailField: { email, emailEn, showEmailField, isEmailRequired },
    phoneField: { phone, phoneEn, showPhoneField, isPhoneRequired },
    companyField: { company, companyEn, showCompanyFileld, isCompanyRequired },
    notesField: { notes, notesEn, showNotesField, isNotesRequired },
    selectCompanyField: { selectCompany, selectCompanyEn, isCompanySelectRequired, showCompanySelect } } = data

  const isLangEn = language === 'en';
  return (
    <form className="partnership-form" id="demoPartnership">
      <h2>Become a partner</h2>
      <div className="row">
        <div className="partnership-form__fields-wrap">

        </div>
        {showNameField &&
          <div className="partnership-form__input-wrap">
            {isNameRequired
              ? <input type="text" required name="nameDemo" />
              : <input type="text" name="nameDemo" />}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? nameEn : name}{isNameRequired ? '*' : ''}</label>
          </div>
        }
        {showEmailField &&
          <div className="partnership-form__input-wrap">
            {isEmailRequired
              ? <input type="text" required name="nameDemo" />
              : <input type="text" name="nameDemo" />}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? emailEn : email}{isEmailRequired ? '*' : ''}</label>
          </div>
        }
        <div className="partnership-form__fields-wrap">
          <CountrySelect />
          {showPhoneField &&
            <div className="partnership-form__input-wrap">
              {isPhoneRequired
                ? <input type="text" required name="nameDemo" />
                : <input type="text" name="nameDemo" />}
              <span className="highlight"></span>
              <span className="bar"></span>
              <label>{isLangEn ? phoneEn : phone}{isPhoneRequired ? '*' : ''}</label>
            </div>
          }
        </div>
        {showCompanyFileld &&
          <div className="partnership-form__input-wrap">
            {isCompanyRequired
              ? <input type="text" required name="nameDemo" />
              : <input type="text" name="nameDemo" />}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? companyEn : company}{isCompanyRequired ? '*' : ''}</label>
          </div>
        }
        {/* Promenutu u select */}
        {showCompanySelect &&
          <div className="partnership-form__input-wrap">
            {isCompanySelectRequired
              ? <input type="text" required name="nameDemo" />
              : <input type="text" name="nameDemo" />}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? selectCompanyEn : selectCompany}{isCompanySelectRequired ? '*' : ''}</label>
          </div>
        }
        {showNotesField &&
          <div className="partnership-form__input-wrap">
            {isNotesRequired
              ? <input type="text" required name="nameDemo" />
              : <input type="text" name="nameDemo" />}
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? notesEn : notes}{isNotesRequired ? '*' : ''}</label>
          </div>
        }

      </div>
    </form>
  )
}
