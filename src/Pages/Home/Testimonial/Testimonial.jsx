import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./styles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Testimonial = () => {
  return (
    <div className="bg-yellow-50">
      <div className="lg:w-8/12 md:w-10/12 w-11/12 mx-auto lg:py-20 md:py-14 py-10">
        <h1 className="text-center lg:text-5xl md:text-3xl text-2xl font-semibold text-gray-800 mb-6">
          What Our Users Are Saying
        </h1>
        <p className="sm:w-[700px] w-11/12 mx-auto text-center sm:text-xl">
          Discover how workers and buyers are experiencing success and
          satisfaction on our platform through real stories and feedback
        </p>

        {/* cards container */}
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQFFuvwsRTG9YA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1692780478982?e=2147483647&v=beta&t=4QnYMOeKaV8ih82zMbEcTWsqMibshh8z-x3q2FYzSG0"
              alt="Rahim Uddin"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">Rahim Uddin</h3>
            <p className="text-gray-600 text-sm">
              "I earned my first $10 in just 2 days. Super easy platform!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://openlogicsys.com/mariya.jpg"
              alt="Maria Khan"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">Maria Khan</h3>
            <p className="text-gray-600 text-sm">
              "Creating tasks was seamless. Loved the user-friendly interface!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://ssl.du.ac.bd/fontView/assets/faculty_image/image_2272_new.jpg"
              alt="Tanvir Hasan"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Tanvir Hasan
            </h3>
            <p className="text-gray-600 text-sm">
              "Smooth withdrawal process and great customer support!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://www.mskcc.org/sites/default/files/styles/large/public/node/18405/3x2/sadia.jpg"
              alt="Sadia Rahman"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Sadia Rahman
            </h3>
            <p className="text-gray-600 text-sm">
              "The best platform to earn money by doing small tasks."
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://www.parliament.gov.bd/mps/012010101.jpg"
              alt="Kamal Hossain"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Kamal Hossain
            </h3>
            <p className="text-gray-600 text-sm">
              "I posted a few tasks and got quality submissions within hours!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://www.thestatesman.com/wp-content/uploads/2018/01/Nusrat.jpg"
              alt="Nusrat Jahan"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Nusrat Jahan
            </h3>
            <p className="text-gray-600 text-sm">
              "Loved how simple the whole process was. Highly reliable."
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://media.licdn.com/dms/image/v2/D4E03AQHTtdyCXNheBw/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1711567987023?e=2147483647&v=beta&t=94DWLw_0WELF-_mhN0TqFKMR5aLPqBaZC6yUvXJcjeY"
              alt="Zahid Hasan"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">Zahid Hasan</h3>
            <p className="text-gray-600 text-sm">
              "I completed 5 tasks and got paid the same day. Awesome!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://randomuser.me/api/portraits/women/50.jpg"
              alt="Fariha Islam"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Fariha Islam
            </h3>
            <p className="text-gray-600 text-sm">
              "Safe and legit platform for micro-tasking and earning!"
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://randomuser.me/api/portraits/men/11.jpg"
              alt="Shahin Alom"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">Shahin Alom</h3>
            <p className="text-gray-600 text-sm">
              "Dashboard is clean and responsive. Loved the experience."
            </p>
          </SwiperSlide>

          <SwiperSlide className="bg-white rounded-xl shadow-md p-6 text-center space-y-4 w-[300px]">
            <img
              src="https://a-list.lawandstyle.ca/wp-content/uploads/2022/09/Chowdhury-Labiba-A-List-1.jpg"
              alt="Labiba Chowdhury"
              className="w-16 h-16 rounded-full mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              Labiba Chowdhury
            </h3>
            <p className="text-gray-600 text-sm">
              "Got my first withdrawal via Nagad. Everything worked perfectly!"
            </p>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
