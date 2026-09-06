import Header from "../layout/Header";
import HeroSlider from "../components/HeroSlider";

import Footer from "../layout/Footer";
import ShopCard from "../components/ShopCard";
import BestsellerProducts from "../components/product/BestsellerProducts";
import Carousel2 from "../components/Carousel2";
import FeaturedPosts from "../components/FeaturedPost";
import Fluid from "../components/Fluid";
import PageContent from "../layout/PageContent";




function Home() {

    return (
        <>
            <Header />

            <PageContent>
                <HeroSlider />
                <ShopCard />
                <BestsellerProducts />
                <Carousel2 />
                <Fluid />
                <FeaturedPosts />
            </PageContent>

            <Footer />
        </>
    );
}

export default Home;
