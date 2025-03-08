import Slider from "rc-slider"
import { AiOutlineTags } from "react-icons/ai"


function FilterByPrice({ clearPriceFilter, priceRange, handlePriceChange, handlePriceFilter }) {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">
            <AiOutlineTags className="text-teal-500" />
            Filter by Price
          </h3>
          <button
            onClick={clearPriceFilter}
            className="text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            Reset All
          </button>
        </div>
        <div className="px-2">
          <Slider
            range
            min={0}
            max={10000}
            value={priceRange}
            onChange={handlePriceChange}
            trackStyle={[{ backgroundColor: '#14b8a6' }]}
            handleStyle={[
              { backgroundColor: '#14b8a6', borderColor: '#14b8a6' },
              { backgroundColor: '#14b8a6', borderColor: '#14b8a6' }
            ]}
            railStyle={{ backgroundColor: '#e2e8f0' }}
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm font-medium text-gray-700">
            Range: <span className="text-teal-500">৳{priceRange[0]}</span> - <span className="text-teal-500">৳{priceRange[1]}</span>
          </div>
          <button
            onClick={handlePriceFilter}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg text-sm hover:bg-teal-600 transition-colors duration-200"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterByPrice