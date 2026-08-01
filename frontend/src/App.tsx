import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Doctors from './components/Doctors'
import FirstVisit from './components/FirstVisit'
import Faq from './components/Faq'
// import AppointmentForm from './components/AppointmentForm' // landing — rezerwacja wyłączona
import Contact from './components/Contact'
import PhoneCta from './components/PhoneCta'
import PageShimmer from './components/PageShimmer'
import { useI18n } from './i18n/I18nContext'
import { useTheme } from './theme/ThemeContext'
import './App.css'

function App() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const logoSrc = theme === 'dark' ? '/medicor-logo-dark.png' : '/medicor-logo.png'

  return (
    <div className="app">
      <PageShimmer />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Doctors />
        <FirstVisit />
        <Faq />
        {/* <AppointmentForm /> */}
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <img
            src={logoSrc}
            alt="MediCor"
            className="footer-logo"
          />
          <div className="footer-copy">
            <p>&copy; 2026 {t.footer.rights}</p>
            <p className="footer-address">ul. Traugutta 7, 11-400 Kętrzyn</p>
            <p className="footer-contact">
              Tel. <a href="tel:+48897522703">89 752 27 03</a>
              {' · '}
              E-mail: {t.footer.emailSoon}
            </p>
          </div>
        </div>
      </footer>
      <PhoneCta />
    </div>
  )
}

export default App
