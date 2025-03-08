import { useEffect, useState } from "react"
import ProductCart from "./ProductCart"
import { toast } from "react-toastify";
import { axiosInstance } from "../../../lib/axiosInstanace";
import { FaSearch, FaFilter, FaSort, FaPlus, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const All_Products = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const categories = products?.map(product => product.category);
  const uniqueCategories = [...new Set(categories)].filter(Boolean);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance('/products');
        setProducts(res.data.reverse());
      } catch (error) {
        console.log(error);
        toast.error('Failed to fetch products', { autoClose: 1000 });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      const res = await axiosInstance.delete(`/products/${id}`);
      if (res.status === 200) {
        setProducts(products?.filter(product => product._id !== id));
        toast.success(res.data.message, { autoClose: 1000 });
      }
    } catch (error) {
      console.log(error);
      toast.error('Delete Failed', { autoClose: 1000 });
    }
  };

  const filteredProducts = products?.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      default:
        return 0;
    }
  });

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(sortedProducts?.length / itemsPerPage);

  const currentProducts = sortedProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Products
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your product inventory
          </p>
        </div>
        <Link
          to="/admin-dashboard/add-product"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <FaPlus />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filters and Search */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>

        {/* Filter Panel */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ${showFilters ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 overflow-hidden'}`}>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>

          {/* Active Filters Display */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Active Filters
            </label>
            <div className="flex flex-wrap gap-2">
              {filterCategory !== "all" && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  {filterCategory}
                  <button
                    onClick={() => setFilterCategory("all")}
                    className="hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                  Search: {searchTerm}
                  <button
                    onClick={() => setSearchTerm("")}
                    className="hover:text-blue-600 dark:hover:text-blue-300"
                  >
                    <FaTimes className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts?.map(product => (
          <ProductCart
            key={product._id}
            product={product}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      {/* Empty State */}
      {currentProducts?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            No products found matching your criteria
          </div>
        </div>
      )}

      {/* Pagination */}
      {currentProducts?.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4 border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedProducts?.length)} of {sortedProducts?.length} products
          </div>
          <div className="flex gap-2">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default All_Products;