import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { usersAPI } from "../dataApi/api";

// display a table of all users component
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch user list on page loading
  useEffect(() => {
    fetchUsers();
  }, []);

  // get all users from api
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await usersAPI.getAll();
      setUsers(data);
    } catch (err) {
      setError("Failed to load users. Please try again later.");
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}?`)) {
      return;
    }

    try {
      await usersAPI.delete(userId);
      setUsers(users.filter((user) => user.id !== userId));
      alert(`${userName} has been deleted successfully.`);
    } catch (err) {
      alert("Failed to delete user. Please try again.");
      console.error("Delete user error:", err);
    }
  };

  // loading spinner 
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading users...</div>
      </div>
    );
  }

  // error msg if fetch failed
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="text-red-800">{error}</div>
        <button
          onClick={fetchUsers}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  // main user list page
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">All Users</h2>
        <span className="text-gray-600 text-sm sm:text-base">
          Total: {users.length} users
        </span>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border px-4">
          <p className="text-gray-500 text-lg">No users found</p>
          <Link
            to="/create"
            className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Create First User
          </Link>
        </div>
      ) : (
        <>
          {/* Mobile cards */}
          <div className="space-y-4 sm:hidden">
            {users.map((user) => (
              <div
                key={user.id}
                className="rounded-lg border bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    ID: {user.id}
                  </span>
                </div>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Email:</dt>
                    <dd className="text-gray-900 text-right">
                      {user.email}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Phone:</dt>
                    <dd className="text-gray-900 text-right">
                      {user.phone || "—"}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Company:</dt>
                    <dd className="text-gray-900 text-right">
                      {user.company?.name || "—"}
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to={`/user/${user.id}`}
                    className="w-full rounded-md bg-blue-50 px-4 py-2 text-center text-sm font-medium text-blue-700 hover:bg-blue-100"
                  >
                    View Details
                  </Link>
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <Link
                      to={`/edit/${user.id}`}
                      className="w-full rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="w-full rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop table */}
          <div className="hidden bg-white shadow-md rounded-lg overflow-hidden sm:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* user info table */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-sm text-gray-900">{user.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-left">
                        <div className="text-sm text-gray-900">
                          {user.company?.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2 text-left">
                        {/* view details btn */}
                        <Link
                          to={`/user/${user.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {/* edit details */}
                        <Link
                          to={`/edit/${user.id}`}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </Link>
                        {/* delete user */}
                        <button
                          onClick={() => handleDelete(user.id, user.name)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserList;
