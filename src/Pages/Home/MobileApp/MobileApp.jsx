import React from "react";

const MobileApp = () => {
  return (
    <div className="sm:bg-linear-to-r bg-linear-to-t from-yellow-50 to-blue-50">
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <div className=" p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-10  max-w-5xl mx-auto">
          {/* Left Content */}
          <div className="text-center md:text-left flex-1 space-y-3">
            <h2 className="text-center xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-semibold text-gray-800 ">
               Mobile App Coming Soon!
            </h2>
            <p className="text-gray-600 text-base md:text-lg">
              Our mobile app will make tasking and earning even easier.
              Available soon on iOS & Android!
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
              <img
                src="https://cdn.clickworker.com/wp-content/themes/clickworkerV8/assets-dist/img/clickworker-landingpage/badge-app-store.svg"
                alt="App Store"
                className="h-10 opacity-60 hover:opacity-100 transition"
              />
              <img
                src="https://cdn.clickworker.com/wp-content/themes/clickworkerV8/assets-dist/img/clickworker-landingpage/badge-google-play.svg"
                alt="Play Store"
                className="h-10 opacity-60 hover:opacity-100 transition"
              />
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="https://cdn.clickworker.com/wp-content/themes/clickworkerV8/assets-dist/img/clickworker-landingpage/new/iphone-slider-2.png"
              alt="Mobile Teaser"
              className="w-[200px] md:w-[260px] rounded-xl"
            />

            <img
              src="https://cdn.clickworker.com/wp-content/themes/clickworkerV8/assets-dist/img/clickworker-landingpage/new/iphone-slider-6.png"
              alt="Mobile Teaser"
              className="w-[200px] md:w-[260px] rounded-xl xl:block hidden ml-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileApp;
