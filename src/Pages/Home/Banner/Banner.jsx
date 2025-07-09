import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import imgOne from "../../../assets/pexels-life-of-pix-8169.jpg";
import imgTwo from "../../../assets/pexels-yankrukov-7698819.jpg";
import imgThree from "../../../assets/pexels-alphatradezone-5833793.jpg";

const slides = [
  {
    img: imgOne,
    title: "Complete Micro Tasks Effortlessly",
    subtitle: "Earn coins by completing small tasks from real buyers.",
  },
  {
    img: imgTwo,
    title: "Buyers, Get Things Done Fast",
    subtitle: "Post your task, set reward, and pay only when it's approved.",
  },
  {
    img: imgThree,
    title: "Track Earnings and Withdraw Anytime",
    subtitle: "View your balance, submit proof, and withdraw instantly.",
  },
];

const Banner = () => {
  return (
    <div className="bg-[#1ebcec0b]">
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 2.5,
            
          }}
          className="pb-8"
        >
          <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800">
            Discover Tasks, Earn Coins, Level Up!
          </h1>
          <p className="sm:w-[700px] w-11/12 mx-auto text-center mt-2 sm:text-xl">
            Join thousands of workers completing micro tasks and getting
            rewarded instantly
          </p>
        </motion.div>

        {/* Slider */}
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showIndicators={true}
          interval={4000}
          showStatus={false}
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="relative group rounded-md">
              <img
                src={slide.img}
                alt={slide.title}
                className="lg:h-[600px] md:h-[400px] h-[200px] w-full object-cover rounded-md"
              />
              {/* Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/60 z-50 
             flex flex-col justify-center items-center text-center px-4 text-white rounded-md"
              >
                <h2 className="text-xl md:text-3xl lg:text-4xl font-bold mb-2 drop-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg lg:text-xl mb-4 drop-shadow">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
