/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { IndexContext } from "../../../context";
import { axiosInstance } from "../../../lib/axiosInstanace";
import { FaTrash, FaFolder, FaFolderOpen, FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";
import { AdminContext } from "../../../context/admin-dashboard/Admin_Context";

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refetch, setRefetch } = useContext(IndexContext);
  const { setReFetchCategory, reFetchCategory } = useContext(AdminContext)



  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/category");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteCategory = async (id) => {
    try {
      const res = await axiosInstance.delete(`/category/${id}`);
      if (res.data) {
        setCategories(categories.filter(category => category._id !== id));
        toast.success("Category deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    }
  };

  const handleDeleteSubCategory = async (categoryId, subCategory) => {
    try {
      const res = await axiosInstance.put(`/category/delete-sub/${categoryId}/${subCategory}`);
      if (res.data) {
        setCategories(categories.map(category =>
          category._id === categoryId
            ? { ...category, sub: category.sub.filter(sub => sub !== subCategory) }
            : category
        ));
        toast.success("Sub-category deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting sub-category:", error);
      toast.error("Failed to delete sub-category");
    }
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <FaSpinner className="text-4xl text-teal-500 animate-spin" />
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <FaFolder className="text-3xl text-teal-500" />
          <h2 className="text-2xl font-bold text-gray-800">Categories List</h2>
        </div>
        <div className="text-sm text-gray-500">
          Total Categories: {categories.length}
        </div>
      </div>

      <div className="space-y-4">
        {categories?.length > 0 ? (
          categories.map((category) => (
            <div key={category._id} className="bg-gray-50 rounded-lg border border-gray-100 overflow-hidden">
              <div
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => toggleCategory(category._id)}
              >
                <div className="flex items-center gap-3">
                  {expandedCategories.includes(category._id) ? (
                    <FaFolderOpen className="text-teal-500 text-xl" />
                  ) : (
                    <FaFolder className="text-teal-500 text-xl" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-800">{category.category}</h3>
                </div>
                <div>
                  <img src={category.image} alt="" className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex items-center gap-3">
                  {/* <span className="text-sm text-gray-500">
                    {category.sub?.length || 0} sub-categories
                  </span> */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCategory(category._id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {expandedCategories.includes(category._id) && (
                <div className="border-t border-gray-100 p-4">
                  <ul className="space-y-2">
                    {category.sub?.length > 0 ? (
                      category.sub.map((subCategory, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-100"
                        >
                          <span className="text-gray-700">{subCategory}</span>
                          <button
                            onClick={() => handleDeleteSubCategory(category._id, subCategory)}
                            className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
                          >
                            <FaTrash className="text-sm" />
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500 text-center py-2">No sub-categories available</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No categories available. Add some categories to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCategory;
