import React from "react";
import logo1 from "../../../assets/brands/amazon_vector.png";
import logo2 from "../../../assets/brands/amazon.png";
import logo3 from "../../../assets/brands/casio.png";
import logo4 from "../../../assets/brands/moonstar.png";
import logo5 from "../../../assets/brands/randstad.png";
import logo6 from "../../../assets/brands/start-people 1.png";
import logo7 from "../../../assets/brands/start.png";
import Marquee from "react-fast-marquee";

const Partner = () => {
  const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
  return (
    <div className="bg-linear-to-r from-blue-50 via-green-50 to-blue-50">
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-10">
          Partnered Platforms
        </h1>

        <Marquee speed={30} gradient={false}>
          {logos.map((logo) => (
            <div className="lg:mx-20 md:mx-8 mx-4">
              <img src={logo} className="sm:h-6 md:-4 h-3" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Partner;
