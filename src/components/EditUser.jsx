import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { usersAPI } from "../dataApi/api";

// edit usr details component
const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",

    company: {
      name: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      setFetchLoading(true);
      const user = await usersAPI.getById(id);

      // populate form with fetched data
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        website: user.website || "",

        company: {
          name: user.company?.name || "",
        },
      });
    } catch (err) {
      setError("Failed to load user data. Please try again.");
      console.error("Fetch user error:", err);
    } finally {
      setFetchLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.username) {
      setError("Name, username, and email are required fields.");
      return;
    }

    try {
      setLoading(true);
      const updatedUser = await usersAPI.update(id, formData);
      alert(`User "${updatedUser.name}" updated successfully!`);
      navigate("/");
    } catch (err) {
      setError("Failed to update user. Please try again.");
      console.error("Update user error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading user data...</div>
      </div>
    );
  }

  if (error && !formData.name) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 px-4">
          <div className="text-red-800">{error}</div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={fetchUser}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 sm:w-auto"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 sm:w-auto"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  // main edit form 
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Edit User</h2>
        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-gray-900 text-left sm:text-right"
        >
          ← Back to Users
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-800">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username *
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="johndoe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="(89) 789-667-22"
              />
            </div>

            <div>
              <label
                htmlFor="website"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Website
              </label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="example.com"
              />
            </div>

            <div>
              <label
                htmlFor="company.name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="company.name"
                name="company.name"
                value={formData.company.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="xyz org"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t sm:flex-row sm:justify-end sm:gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
            >
              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
