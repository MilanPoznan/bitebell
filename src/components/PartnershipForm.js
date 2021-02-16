import React, { useState } from 'react'
//Components 
import CountrySelect from './CountrySelect'
//Hooks
import { fetchWithTimeout } from '../utils/utils'
//Styles
import './PartnershipForm.scss'
//Recatcha
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';


export default function PartnershipForm({ data, language, selectTypes }) {

  const { nameField: { name, showNameField, isNameRequired },
    emailField: { email, showEmailField, isEmailRequired },
    phoneField: { phone, showPhoneField, isPhoneRequired },
    companyField: { company, showCompanyFileld, isCompanyRequired },
    notesField: { notes, showNotesField, isNotesRequired },
    selectCompanyField: { selectCompany, isCompanySelectRequired, showCompanySelect } } = data

  const isLangEn = language === 'en';
  //Fields
  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('');
  const [phoneField, setPhoneField] = useState('');
  const [companyField, setCompanyField] = useState('');
  const [companySelect, setCompanySelect] = useState('');
  const [notesField, setNotesField] = useState('');

  const [submited, setSubmited] = useState(false)

  const validateEmail = (email) => {
    let regularExpression = /^(([^.\s@]+(\.[^.\s@]+)*))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

    if (regularExpression.test(email)) {
      return true;
    }
    return false;
  }

  const checkIsFieldValid = (isRequired, fieldValue) => isRequired ? !!fieldValue : true

  const backendUrl = '';

  const sendFormData = data => fetch(`https://dev.bitebell.com/wp-json/bitebell/v1/forms`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  )

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmited(true)


    const testObj = {
      full_name: nameField,
      email: emailField,
      phone: phoneField,
      company: companyField,
      company_type: companySelect,
      notes: notesField,
      form_type: 'partnership'
    }
    console.log(testObj)
    if (checkIsFieldValid(isPhoneRequired, phoneField),
      validateEmail(emailField),
      checkIsFieldValid(isPhoneRequired, phoneField),
      checkIsFieldValid(isCompanyRequired, companyField),
      checkIsFieldValid(isCompanySelectRequired, companySelect),
      checkIsFieldValid(isNotesRequired, notesField)
    ) {
      fetchWithTimeout(
        sendFormData,
        {
          full_name: nameField,
          email: emailField,
          phone: phoneField,
          company: companyField,
          company_type: companySelect,
          notes: notesField,
          form_type: 'partnership'
        },
        10000
      )
        .then(response => {
          console.log(response)
          if (!response.ok) {
            throw new Error(`${response.statusText}`)
          }
        })
        .catch(e => {
          console.error(e)
        })
    }
  }

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
              <label className={`${!!nameField ? 'fulfilled' : ''}`}>{name}{isNameRequired ? '*' : ''}</label>
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
              <label className={`${!!emailField ? 'fulfilled' : ''}`}>{email}{isEmailRequired ? '*' : ''}</label>
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
              <label className={`${!!phoneField ? 'fulfilled' : ''}`}>{phone}{isPhoneRequired ? '*' : ''}</label>
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
            <label className={`${!!companyField ? 'fulfilled' : ''}`}>{company}{isCompanyRequired ? '*' : ''}</label>
          </div>
        }
        {showCompanySelect &&
          <div className="partnership-form__input-wrap">
            <select onChange={(e) => {
              setCompanySelect(e.target.value);
              console.log('companySelect', companySelect)
            }} className="partnership-form__select" required={isCompanySelectRequired ? true : false} name="nameDemo" >
              <option hidden value="">{selectCompany}</option>
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
            <label className={`${!!notesField ? 'fulfilled' : ''}`}>{notes}{isNotesRequired ? '*' : ''}</label>
          </div>
        }
        <button
          onClick={(e) => onSubmit(e)}
          className="partnership-form__submit-btn"
        >
          {isLangEn ? 'Submit' : 'Potvrdite'}
        </button>
      </div>

    </form>
  )
}
