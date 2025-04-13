import Banner from "../components/Home/banner/Banner"
import OurServices from "../components/Home/banner/OurServices"
import FeaturesCard from "../components/other-section/FeaturesCard"
import FeatureSection from "../components/other-section/FeatureSection"
import Future_of_Home_Services from "../components/other-section/Future_of_Home_Services"




const Home = () => {
  return (
    <>

      <div className=''>
        <Banner />
        <OurServices />
        <FeatureSection />
        <Future_of_Home_Services />
        <FeaturesCard />
      </div>
    </>
  )
}

export default Home