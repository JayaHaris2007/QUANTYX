import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';
import Categories from '../components/Categories';
import TrendingDeals from '../components/TrendingDeals';
import WhyQuantyx from '../components/WhyQuantyx';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-light-900">
            <Navbar />
            <HeroSection />
            <FeaturedProducts />
            <Categories />
            <TrendingDeals />
            <WhyQuantyx />
            <Testimonials />
            <Newsletter />
            <Footer />
        </div>
    );
}
