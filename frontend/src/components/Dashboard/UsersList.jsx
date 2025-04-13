import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axiosInstanace";
import { saveAs } from "file-saver";
import Papa from "papaparse";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance('/auth/users');
        const data = await response.data;
        setUsers(data);
      } catch (error) {
        setError("Failed to fetch users.");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentUsers = users?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // 🔹 CSV ডাউনলোড ফাংশন (সকল ইউজার সহ)
  const downloadCSV = () => {
    if (!users || users?.length === 0) {
      alert("No users available to download.");
      return;
    }

    const csvData = users?.map((user, index) => ({
      "No": index + 1,
      "Full Name": user.fullName,
      "Email": user.email,
      "Role": user.role,
      "Joined Date": new Date(user.createdAt).toISOString().split("T")[0],
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "users_list.csv");
  };

  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
      <div className="flex items-center justify-between pb-6">
        <div>
          <h2 className="font-semibold text-gray-700">User Accounts</h2>
          <span className="text-xs text-gray-500">View accounts of registered users</span>
        </div>
        <button
          onClick={downloadCSV}
          className="flex items-center cursor-pointer gap-2 rounded-md bg-cyan-500 px-4 py-2 text-sm font-semibold  hover:bg-cyan-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
          </svg>
          CSV
        </button>
      </div>

      {/* 🔥 লোডিং & এরর হ্যান্ডলিং */}
      {loading && <p className="text-center text-gray-500">Loading users...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-cyan-500 text-left text-xs font-semibold uppercase tracking-widest ">
                  <th className="px-5 py-3">ID</th>
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">User Role</th>
                  <th className="px-5 py-3">Created at</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500">
                {currentUsers?.map((user, index) => (
                  <tr key={user._id}>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{(currentPage - 1) * itemsPerPage + index + 1}</p>
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-full w-full rounded-full" src={user.profilePic} alt="" />
                        </div>
                        <div className="ml-3">
                          <p className="whitespace-no-wrap">{user.fullName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{user.role}</p>
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      <p className="whitespace-no-wrap">{new Date(user.createdAt).toISOString().split("T")[0]}</p>
                    </td>
                    <td className="border-b border-gray-200 px-5 py-5 text-sm">
                      <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">Active</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 Pagination */}
          <div className="flex flex-col items-center border-t px-5 py-5 sm:flex-row sm:justify-between">
            <span className="text-xs text-gray-600 sm:text-sm">
              Showing {indexOfFirstItem + 1} to {currentUsers.length + indexOfFirstItem} of {users.length} Entries
            </span>
            <div className="mt-2 inline-flex sm:mt-0">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`mr-2 h-12 w-12 rounded-full border text-sm font-semibold ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Prev
              </button>
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`h-12 w-12 rounded-full border text-sm font-semibold ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"}`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersList;
