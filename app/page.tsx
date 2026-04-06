import Header from '@/components/Header/Header'
import Hero from '@/components/Hero/Hero'
import Doctors from '@/components/Doctors/Doctors'
import Services from '@/components/Services/Services'
import Reviews from '@/components/Reviews/Reviews'
import OPRegistration from '@/components/OPRegistration/OPRegistration'
import Contact from '@/components/Contact/Contact'
import MapSection from '@/components/MapSection/MapSection'
import Footer from '@/components/Footer/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Doctors />
        <Services />
        <OPRegistration />
        <Reviews />
        <Contact />
        <MapSection />
      </main>
      <Footer />
    </>
  )
}
