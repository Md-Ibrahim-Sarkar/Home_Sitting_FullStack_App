import React, { useContext, useEffect, useState } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaChevronDown, FaChevronUp, FaInfoCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../features/products/productSlice';
import { IndexContext } from '../../context';

function Description() {
  const [activeTab, setActiveTab] = useState('description');
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { products, isLoading } = useSelector((store) => store.products);
  const { productId } = useContext(IndexContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());

  }, [dispatch]);

  const oneProduct = products?.find((product) => product._id === productId);

  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading product details...</div>;
  }

  if (!oneProduct) {
    return <div className="text-center py-8 text-red-500">Product not found</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
          <FaInfoCircle className="text-teal-500 text-xl" />
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
            Product Description
          </h3>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          aria-label={isOpen ? "Close description" : "Open description"}
        >
          {isOpen ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
        </button>
      </div>

      {/* Content */}
      <div
        className={`transition-all duration-300 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
      >
        <div className="p-4 sm:p-6 space-y-4">
          {/* Main Description */}
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {oneProduct?.description}
            </p>
          </div>

          {/* Specifications */}
          {oneProduct?.specifications?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Specifications
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {oneProduct.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900 dark:text-white min-w-[100px] sm:min-w-[120px]">
                      {spec.feature}:
                    </span>
                    <span className="text-gray-600 dark:text-gray-300">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {oneProduct?.additionalInfo?.length > 0 && (
            <div className="mt-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Additional Information
              </h4>
              <ul className="space-y-2">
                {oneProduct.additionalInfo.map((info, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                  >
                    <span className="text-teal-500 mt-1">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Warranty & Return Policy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {oneProduct?.warranty && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Warranty
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {oneProduct.warranty}
                </p>
              </div>
            )}
            {oneProduct?.returnPolicy && (
              <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                  Return Policy
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {oneProduct.returnPolicy}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;
