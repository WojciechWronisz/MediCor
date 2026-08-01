import PageShimmer from '../components/PageShimmer';
import PhoneCta from '../components/PhoneCta';
import MobileNavbar from './MobileNavbar';
import MobileHero from './MobileHero';
import MobileServices from './MobileServices';
import MobileDoctors from './MobileDoctors';
import MobileFirstVisit from './MobileFirstVisit';
import MobileFaq from './MobileFaq';
import MobileContact from './MobileContact';
import MobileFooter from './MobileFooter';
import './mobile.css';

export default function MobileApp() {
  return (
    <div className="m-app">
      <PageShimmer />
      <MobileNavbar />
      <main>
        <MobileHero />
        <MobileServices />
        <MobileDoctors />
        <MobileFirstVisit />
        <MobileFaq />
        <MobileContact />
      </main>
      <MobileFooter />
      <PhoneCta />
    </div>
  );
}
