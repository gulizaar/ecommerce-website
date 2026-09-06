import Carousel from "react-bootstrap/Carousel";
import carousel1 from '../assets/carousel1.png';
import carousel2 from '../assets/carousel2.png';
import carouser3 from '../assets/carouser3.jpg';

function Carousel2() {
    return (
        <Carousel className="w-full">


            <Carousel.Item interval={3000}>
                <div className="flex flex-col md:flex-row items-center justify-between bg-[#23856D] h-auto md:h-[600px] px-10 ">


                    <div className="text-white max-w-[700px]  text-center md:text-left p-20 mb-8 md:mb-0">
                        <h5 className="text-xl mb-3">
                            SUMMER 2020
                        </h5>

                        <h1 className="text-6xl font-bold mb-4">
                            Vita Classic Product
                        </h1>

                        <h4 className="mb-5">
                            We know how large objects will act,
                            but things on a small scale.
                        </h4>
                        <div>
                            <h5>$16.48</h5>
                            <button className="bg-[rgba(45,192,113,1)] text-white px-6 py-3 rounded w-48">
                                ADD TO CART
                            </button></div>

                    </div>

                    {/* SAĞ → IMAGE */}
                    <img
                        src={carousel1}
                        alt=""
                        className="h-[500px] object-contain"
                    />
                </div>
            </Carousel.Item>



        </Carousel>
    );
}

export default Carousel2;