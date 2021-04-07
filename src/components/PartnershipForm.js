import React, { useState, useRef } from 'react'
//Components 
import CountrySelect from './CountrySelect'
//Hooks
import { fetchWithTimeout } from '../utils/utils'
//Styles
import './PartnershipForm.scss'
//Recatcha
import ReCAPTCHA from 'react-google-recaptcha'



export default function PartnershipForm({ data, language, selectTypes, setIsFormSuccessfullySubmited }) {

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
  const [phoneSelect, setPhoneSelect] = useState('+381');
  const [companyField, setCompanyField] = useState('');
  const [companySelect, setCompanySelect] = useState('');
  const [notesField, setNotesField] = useState('');

  const [submited, setSubmited] = useState(false)

  const recaptchaRef = useRef(null)

  const validateEmail = (email) => {
    let regularExpression = /^(([^.\s@]+(\.[^.\s@]+)*))@(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,})$/;

    if (regularExpression.test(email)) {
      return true;
    }
    return false;
  }

  /**
   * 
   * @param {boolean} isRequired getting data from backend from true/false field 
   * @param {string} fieldValue state field value 
   * 
   * If field is required it will return fieldValue value in bool type
   * If field is not required it will return true automatically and if statement will pass 
   */
  const checkIsFieldValid = (isRequired, fieldValue) => isRequired ? !!fieldValue : true


  //Send form data in json format
  const sendFormData = data => fetch(`https://dev.bitebell.com/wp-json/bitebell/v1/forms`, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }
  )


  /**
   * 
   * @param {object} e 
   * Wheen user submit the form
   */
  const onSubmit = async (e) => {
    e.preventDefault();

    const token = recaptchaRef.current && await recaptchaRef.current.executeAsync()
    recaptchaRef.current && recaptchaRef.current.reset()

    setSubmited(true)

    if (checkIsFieldValid(isNameRequired, nameField) && //Name field
      validateEmail(emailField) && //Email Field
      checkIsFieldValid(isPhoneRequired, phoneField) && //Phone field
      checkIsFieldValid(isCompanyRequired, companyField) && //Company field 
      checkIsFieldValid(isCompanySelectRequired, companySelect) && //select Company field
      checkIsFieldValid(isNotesRequired, notesField) //Notes field
    ) {
      fetchWithTimeout(
        sendFormData,
        {
          full_name: nameField,
          email: emailField,
          phone: phoneField,
          phone_select: phoneSelect,
          company: companyField,
          company_type: companySelect,
          notes: notesField,
          form_type: 'partnership',
          token: token
        },
        10000
      )
        .then(response => {
          if (!response.ok) {
            throw new Error(`${response.statusText}`)
          } else {
            setIsFormSuccessfullySubmited(true)
          }
          return response.json()
        })
        .then(response => { console.log(response) })
        .catch(e => {
          console.error(e)
        })
    }
    else {
      console.log('niis popunio')

    }
  }

  return (
    <>
      <form className="partnership-form" id="demoPartnership">
        <h2>{isLangEn ? "Become a partner" : 'Postanite partner'}</h2>
        <div className="row">
          <div className="partnership-form__fields-wrap">

            {showNameField &&
              <div className={submited && nameField === '' ? "partnership-form__input-wrap error" : "partnership-form__input-wrap"}>
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
                {submited && isNameRequired && nameField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}
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
                {submited && isEmailRequired && emailField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

              </div>
            }
          </div>

          <div className="partnership-form__fields-wrap country-wrapp">
            <CountrySelect setPhoneSelect={setPhoneSelect} phoneSelect={phoneSelect} />
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
                {submited && isPhoneRequired && phoneField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

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
              {submited && isCompanyRequired && companyField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

            </div>
          }
          {showCompanySelect &&
            <div className="partnership-form__input-wrap">
              <select onChange={(e) => {
                setCompanySelect(e.target.value);
              }} className="partnership-form__select" required={isCompanySelectRequired ? true : false} name="nameDemo" >
                <option hidden value="">{selectCompany}</option>
                {selectTypes.map((type, index) => <option key={index} value={type.name}>{type.name}</option>)}
                <option value={'other'}>Other</option>
              </select>
              {submited && isCompanySelectRequired && companySelect === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}
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
              {submited && isNotesRequired && notesField === '' && <div className="partnership-form__input-label-error"> {isLangEn ? 'This field is required.' : 'Ovo polje je obavezno'}</div>}

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
      {/* <ReCAPTCHA
        sitekey="6LdV910aAAAAAM_4ajAwKPMQyzr_z38Hm7NTXrIR"
        size="invisible"
        ref={recaptchaRef}
      /> */}
    </>
  )
}
