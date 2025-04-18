

const FeaturesCard = () => {
  return (
    <>
      <div className=" font-[sans-serif] my-4 px-1">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold  inline-block relative after:absolute after:w-4/6 after:h-1 after:left-0 after:right-0 after:-bottom-4 after:mx-auto after:bg-cyan-400 after:rounded-full">LATEST BLOGS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16 max-lg:max-w-3xl max-md:max-w-md mx-auto">
            <div className=" cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
              <img src="https://readymadeui.com/Imagination.webp" alt="Blog Post 1" className="w-full h-60 object-cover" />
              <div className="p-6">
                <span className="text-sm block text-gray-400 mb-2">10 FEB 2023 | BY JOHN DOE</span>
                <h3 className="text-xl font-bold ">A Guide to Elevating Your Home Services</h3>
                <hr className="my-4" />
                <p className="text-gray-400 text-sm">Providing exceptional home services requires expertise, efficiency, and attention to detail. Whether it's plumbing....</p>
              </div>
            </div>
            <div className=" cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
              <img src="https://readymadeui.com/hacks-watch.webp" alt="Blog Post 2" className="w-full h-60 object-cover" />
              <div className="p-6">
                <span className="text-sm block text-gray-400 mb-2">7 JUN 2023 | BY MARK ADAIR</span>
                <h3 className="text-xl font-bold ">Hacks to Optimize Your Home Services</h3>
                <hr className="my-4" />
                <p className="text-gray-400 text-sm">Enhance your home service efficiency with smart strategies. Use digital scheduling tools, maintain high-quality ...</p>
              </div>
            </div>
            <div className=" cursor-pointer rounded overflow-hidden shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative top-0 hover:-top-2 transition-all duration-300">
              <img src="https://readymadeui.com/prediction.webp" alt="Blog Post 3" className="w-full h-60 object-cover" />
              <div className="p-6">
                <span className="text-sm block text-gray-400 mb-2">5 OCT 2023 | BY SIMON KONECKI</span>
                <h3 className="text-xl font-bold ">Trends and Predictions in Home Services</h3>
                <hr className="my-4" />
                <p className="text-gray-400 text-sm">The home service industry is evolving with smart technology, eco-friendly solutions, and on-demand services...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FeaturesCard