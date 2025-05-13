"use client";
import { UserCard } from "@/components/UserCard";
import { useState, useEffect } from "react";
import ApiClient from "../ApiClient/client";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nationality, setNationality] = useState("");
  const [error, setError] = useState(null);
  
  const apiClient = new ApiClient();

  // Function to fetch users with current filters
  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await apiClient.getUsersByFilters({ nationality });
      setUsers(response.data.results);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setError(error.message || "An unexpected error occurred while fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Effect hook to fetch data when filters change
  useEffect(() => {
    fetchUsers();
  }, [nationality]);

  // Available nationalities
  const nationalities = ['US', 'GB', 'FR', 'DE', 'AU', 'BR', 'CA'];

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {
        error && (
          <div className="text-center bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <p className="text-red-600 font-medium">Error</p>
            <p className="text-red-500 text-sm mt-1">{error}</p>
          </div>
        )
      }
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Weather Forecast
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Check the weather for cities around the world.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-12">
          <select 
            className="px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200 
            focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 
            hover:border-gray-300 transition-colors duration-200"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
          >
            <option value="">All Cities</option>
            {nationalities.map(nat => (
              <option key={nat} value={nat}>{nat}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Selected User Details */}
            {selectedUser && (
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto 
              transform transition-all duration-300 hover:shadow-xl">
                <img 
                  src={selectedUser.picture.large} 
                  alt={`${selectedUser.name.first} ${selectedUser.name.last}`}
                  className="w-32 h-32 rounded-full mx-auto ring-4 ring-gray-100 mb-6"
                />
                <div className="text-center space-y-3">
                  <p className="text-2xl font-bold text-gray-800">
                    {selectedUser.name.title} {selectedUser.name.first} {selectedUser.name.last}
                  </p>
                  <p className="text-blue-500 font-medium">{selectedUser.email}</p>
                  <div className="flex justify-center items-center space-x-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                      clipRule="evenodd" />
                    </svg>
                    <p>{selectedUser.location.city}, {selectedUser.location.country}</p>
                  </div>
                </div>
              </div>
            )}

            {/* User List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard
                  key={user.login.uuid}
                  user={user}
                  onClick={() => setSelectedUser(user)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
