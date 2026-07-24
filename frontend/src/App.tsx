import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import Doctors from './components/Doctors'
// import AppointmentForm from './components/AppointmentForm' // landing — rezerwacja wyłączona
import Contact from './components/Contact'
import './App.css'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Doctors />
        {/* <AppointmentForm /> */}
        <Contact />
      </main>
      <footer className="site-footer">
        <div className="container footer-inner">
          <img
            src="/medicor-logo.png"
            alt="MediCor"
            className="footer-logo"
          />
          <div className="footer-copy">
            <p>&copy; 2026 MediCor — Poradnia Kardiologiczna. Wszelkie prawa zastrzeżone.</p>
            <p className="footer-address">ul. Traugutta 7, 11-400 Kętrzyn</p>
            <p className="footer-contact">
              Tel. <a href="tel:+48897522703">89 752 27 03</a>
              {' · '}
              E-mail: wkrótce
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
