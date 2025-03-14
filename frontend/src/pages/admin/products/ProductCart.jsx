/* eslint-disable react/prop-types */

import { useState } from "react"
import { Link } from "react-router-dom"
import { FaEdit, FaTrash, FaTimes, FaBox, FaTag, FaInfoCircle, FaShippingFast, FaTruck, FaShieldAlt, FaBarcode, FaIndustry, FaTags } from "react-icons/fa"

const ProductCart = ({ product, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false)

  console.log(product);

  return (
    <>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden rounded-xl cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 relative">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-gray-100 ">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />

        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {product?.name}
            </h3>
            <div className="flex items-center gap-2">
              {product.discount > 0 && (
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  -{product.discount}%
                </span>
              )}
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                ${product.price}
              </span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <FaBox className="mr-1" />
              <span>{product.quantity || 0} in stock</span>
            </div>
            <div className="flex items-center">
              <FaTag className="mr-1" />
              <span>{product.category || 'Uncategorized'}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              to={`/admin-dashboard/edit-product/${product._id}`}
              onClick={(e) => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              <FaEdit className="text-sm" />
              <span>Edit</span>
            </Link>
            <button
              onClick={(e) => handleDelete(e, product._id)}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <FaTrash className="text-sm" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 max-w-4xl w-full relative max-h-[70vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <FaInfoCircle className="text-blue-500 text-xl" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Product Details
              </h3>
            </div>

            {/* Product Image */}
            <div className="mb-6">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-64 object-contain rounded-lg bg-gray-100 dark:bg-gray-700"
              />
            </div>

            {/* Product Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Basic Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Name</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Brand</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.brand}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Category</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.category}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">SKU</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.sku}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Price</span>
                    <span className="font-medium text-gray-900 dark:text-white">${product.price}</span>
                  </div>
                  {product.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 dark:text-gray-300">Discount</span>
                      <span className="font-medium text-red-600 dark:text-red-400">-{product.discount}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock & Sales */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Stock & Sales
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Quantity</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.quantity}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Sold</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.sold}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">In Stock</span>
                    <span className={`font-medium ${product.isStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      {product.isStock ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Shipping & Warranty */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Shipping & Warranty
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Shipping Cost</span>
                    <span className="font-medium text-gray-900 dark:text-white">${product.shippingCost}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Estimated Time</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.shippingDetails.estimatedTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Warranty</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.warranty}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Return Policy</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.returnPolicy}</span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Additional Information
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Supplier</span>
                    <span className="font-medium text-gray-900 dark:text-white">{product.supplier}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Created At</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(product.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">Updated At</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Description
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Specifications
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-300">{spec.name}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="md:col-span-2">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Variants
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-gray-600 dark:text-gray-300">Name</span>
                          <span className="font-medium text-gray-900 dark:text-white">{variant.name}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">Price</span>
                          <span className="font-medium text-gray-900 dark:text-white">${variant.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCart
