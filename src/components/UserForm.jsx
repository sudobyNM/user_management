import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usersAPI } from "../dataApi/api";

const UserForm = () => {
  const navigate = useNavigate();
  
  // stores all user info into form
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
  const [error, setError] = useState("");

  // handles input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // check if nested
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

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validate req fields
    if (!formData.name || !formData.email || !formData.username) {
      setError("Name, username, and email are required fields.");
      return;
    }

    try {
      setLoading(true);
      const newUser = await usersAPI.create(formData);
      alert(`User "${newUser.name}" created successfully!`);
      // redirect to home page after creation
      navigate("/");
    } catch (err) {
      setError("Failed to create user. Please try again.");
      console.error("Create user error:", err);
    } finally {
      setLoading(false);
    }
  };

  // main form UI
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Create New User
        </h2>
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
                placeholder="1-770-736-8031"
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

          {/* form btns */}
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
              className="w-full px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed sm:w-auto"
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
