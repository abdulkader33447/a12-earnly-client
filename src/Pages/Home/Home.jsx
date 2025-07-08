import Banner from "./Banner/Banner";
import BestWorkers from "./BestWorkers/BestWorkers";
import GetStarted from "./GetStarted/GetStarted";
import MobileApp from "./MobileApp/MobileApp";
import Partner from "./Partner/Partner";
import Testimonial from "./Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <BestWorkers />
      <Partner />
      <Testimonial />
      <GetStarted />
      <MobileApp />
    </div>
  );
};

export default Home;
