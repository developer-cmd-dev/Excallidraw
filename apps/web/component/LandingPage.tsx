
import Navbar from './Navbar';
import Feature from './Feature';
import Footer from './Footer';
import Hero from './Hero';
import Background from './Background';
function LandingPage() {



    return (
        <Background>

            {/* Navbar */}
            <Navbar />


            {/* Main */}
            <Hero />


            {/* Feature */}
            <Feature />

            {/* Footer */}
            <Footer />

        </Background>



    )
}

export default LandingPage