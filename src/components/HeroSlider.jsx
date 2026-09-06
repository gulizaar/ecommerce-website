import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import { useNavigate } from "react-router-dom";

function HeroSlider() {
    const navigate = useNavigate();
    return (
        <Carousel>

            {/* SLIDE 1 */}
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-full h-[600px] object-cover"
                    src={slide1}
                    alt="First slide"
                />

                <div
                    className="
                        absolute top-1/2
                        left-1/2 md:left-20
                        -translate-x-1/2 md:translate-x-0
                        -translate-y-1/2
                        text-center md:text-left
                        text-white
                        z-10
                        px-4
                    "
                >
                    <h5 className="text-xl mb-3">SUMMER 2020</h5>

                    <h1 className="text-6xl font-bold mb-4">
                        NEW COLLECTION
                    </h1>

                    <h4 className="max-w-[500px] mb-5">
                        We know how large objects will act,
                        but things on a small scale.
                    </h4>

                    <button onClick={() => navigate('/shop')} className="bg-green-500 px-6 py-3 rounded w-48">
                        SHOP NOW
                    </button>
                </div>
            </Carousel.Item>

            {/* SLIDE 2 */}
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-full h-[600px] object-cover"
                    src={slide2}
                    alt="Second slide"
                />

                <div
                    className="
                        absolute top-1/2 left-1/2
                        -translate-x-1/2 -translate-y-1/2
                        text-center text-white
                        z-10
                        px-4
                    "
                >
                    <h1 className="text-6xl font-bold mb-4">
                        BLACK FRIDAY
                    </h1>

                    <h4 className="max-w-[600px] mx-auto mb-5">
                        We know how large objects will act,
                        but things on a small scale just do not act that way.
                    </h4>

                    <button onClick={() => navigate('/shop')} className="bg-[#23A6F0] text-white px-6 py-3 rounded w-48">
                        Start Now
                    </button>
                </div>
            </Carousel.Item>

        </Carousel>
    );
}

export default HeroSlider;