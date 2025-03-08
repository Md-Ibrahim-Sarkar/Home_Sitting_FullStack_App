import Description from '../components/Product_Details/Description';
import Addtocart from '../components/Product_Details/Addtocart';
import RelatedData from '../components/Product_Details/RelatedData';

const ProductDetails = () => {
  return (
    <>
      <div className="max-w-[1300px] mx-auto  ">
        <Addtocart />
        <Description />
        <RelatedData />
      </div>
    </>
  )
}

export default ProductDetails