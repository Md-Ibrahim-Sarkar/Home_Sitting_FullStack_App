import Banner from "../components/Home/banner/Banner"
import OurServices from "../components/Home/banner/OurServices"
import FeaturesCard from "../components/other-section/FeaturesCard"




const Home = () => {
  return (
    <>

      <div className=''>
        <Banner />
        <OurServices />
        <FeaturesCard />
      </div>
    </>
  )
}

export default Home