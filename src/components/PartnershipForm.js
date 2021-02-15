import React, { useState } from 'react'
import './PartnershipForm.scss'
import CountrySelect from './CountrySelect'
export default function PartnershipForm({ data, language, selectTypes }) {
  console.log(selectTypes)

  const { nameField: { name, nameEn, showNameField, isNameRequired },
    emailField: { email, emailEn, showEmailField, isEmailRequired },
    phoneField: { phone, phoneEn, showPhoneField, isPhoneRequired },
    companyField: { company, companyEn, showCompanyFileld, isCompanyRequired },
    notesField: { notes, notesEn, showNotesField, isNotesRequired },
    selectCompanyField: { selectCompany, selectCompanyEn, isCompanySelectRequired, showCompanySelect } } = data

  const isLangEn = language === 'en';

  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('');
  const [phoneField, setPhoneField] = useState('');
  const [companyField, setCompanyField] = useState('');
  const [companySelect, setCompanySelect] = useState('');
  const [notesField, setNotesField] = useState('');

  const onSubmit = () => console.log('ss')

  return (
    <form className="partnership-form" id="demoPartnership">
      <h2>Become a partner</h2>
      <div className="row">
        <div className="partnership-form__fields-wrap">

          {showNameField &&
            <div className="partnership-form__input-wrap">
              <input
                value={nameField}
                onChange={(e) => setNameField(e.target.value)}
                type="text"
                required={isNameRequired ? true : false}
                name="name"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!nameField ? 'fulfilled' : ''}`}>{isLangEn ? nameEn : name}{isNameRequired ? '*' : ''}</label>
            </div>
          }

          {showEmailField &&
            <div className="partnership-form__input-wrap">
              <input
                type="email"
                value={emailField}
                onChange={(e) => setEmailField(e.target.value)}
                required={isEmailRequired ? true : false}
                name="email"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!emailField ? 'fulfilled' : ''}`}>{isLangEn ? emailEn : email}{isEmailRequired ? '*' : ''}</label>
            </div>
          }
        </div>

        <div className="partnership-form__fields-wrap country-wrapp">
          <CountrySelect />
          {showPhoneField &&
            <div className="partnership-form__input-wrap">
              <input
                type="number"
                value={phoneField}
                onChange={(e) => setPhoneField(e.target.value)}
                required={isPhoneRequired ? true : false}
                name="phone" />
              <span className="highlight"></span>
              <span className="bar"></span>
              <label className={`${!!phoneField ? 'fulfilled' : ''}`}>{isLangEn ? phoneEn : phone}{isPhoneRequired ? '*' : ''}</label>
            </div>
          }
        </div>
        {showCompanyFileld &&
          <div className="partnership-form__input-wrap">
            <input
              type="text"
              value={companyField}
              onChange={(e) => setCompanyField(e.target.value)}
              required={isCompanyRequired ? true : false}
              name="company" />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label className={`${!!companyField ? 'fulfilled' : ''}`}>{isLangEn ? companyEn : company}{isCompanyRequired ? '*' : ''}</label>
          </div>
        }
        {showCompanySelect &&
          <div className="partnership-form__input-wrap">
            <select onChange={(e) => {
              setCompanySelect(e.target.value);
              console.log('companySelect', companySelect)
            }} className="partnership-form__select" required={isCompanySelectRequired ? true : false} name="nameDemo" >
              <option hidden value="">Select Company Type</option>
              {selectTypes.map((type, index) => <option key={index} value={type.name}>{type.name}</option>)}
              <option value={'other'}>Other</option>
            </select>
          </div>
        }
        {showNotesField &&
          <div className="partnership-form__input-wrap">

            <input
              type="text"
              value={notesField}
              onChange={(e) => setNotesField(e.target.value)}
              required={isNotesRequired ? true : false}
              name="notes"
            />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{isLangEn ? notesEn : notes}{isNotesRequired ? '*' : ''}</label>
          </div>
        }

        <button
          onClick={onSubmit}
          className="partnership-form__submit-btn"
        >
          {isLangEn ? 'Submit' : 'Potvrdite'}
        </button>
      </div>

    </form>
  )
}
