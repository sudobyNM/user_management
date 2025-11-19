import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { usersAPI } from '../dataApi/api'


// detailed info for single user component
const UserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

 
  const fetchUser = async () => {
    try {
      setLoading(true)
      setError('')
      const userData = await usersAPI.getById(id)
      setUser(userData)
    } catch (err) {
      setError('Failed to load user details. Please try again.')
      console.error('Fetch user error:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading user details...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-red-800">{error}</div>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={fetchUser}
              className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 sm:w-auto"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 sm:w-auto"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-0">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="text-yellow-800">User not found.</div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 sm:w-auto"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    )
  }

  // main details UI
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">User Details</h2>
        <button
          onClick={() => navigate('/')}
          className="text-gray-600 hover:text-gray-900 text-left sm:text-right"
        >
          ← Back to Users
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
          <h3 className="text-xl font-semibold text-white">{user.name}</h3>
          <p className="text-blue-100">@{user.username}</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Email</h4>
              <p className="text-gray-900">{user.email}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Phone</h4>
              <p className="text-gray-900">{user.phone || 'Not provided'}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Website</h4>
              <p className="text-gray-900">
                {user.website ? (
                  <a 
                    href={`http://${user.website}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {user.website}
                  </a>
                ) : (
                  'Not provided'
                )}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">Company</h4>
              <p className="text-gray-900">{user.company?.name || 'Not provided'}</p>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-gray-500">
                User ID: {user.id}
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  to={`/edit/${user.id}`}
                  className="text-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Edit User
                </Link>
                <button
                  onClick={() => navigate('/')}
                  className="text-center bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  Back to List
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetail
