import React from 'react'

import './ThankYou.scss';

export default function ThankYou({ language }) {
  return (
    <section className="thank-you container">
      <h2 style={{ marginBottom: '40px' }}>{language === 'en' ? 'Thank you for reaching out to us!' : 'Hvala Vam što ste nas kontaktirali'}</h2>
      <p>{language === 'en' ? 'The request was successfully sent, and someone from our team will contact you in the next 24h.' : 'Uspešno ste poslali zahtev, neko iz našeg tima će Vas kontaktirati u narednih 24h.'}</p>
    </section>
  )
}
