import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import EditUser from "./components/EditUser";
import UserDetail from "./components/UserDetail";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                User Management Application
              </h1>
              <nav className="flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  to="/"
                  className="w-full text-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:w-auto"
                >
                  Home
                </Link>
                <Link
                  to="/create"
                  className="w-full text-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 sm:w-auto"
                >
                  Add User
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* routes */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/create" element={<UserForm />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
