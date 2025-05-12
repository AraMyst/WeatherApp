export const UserCard = ({ user, onClick }) => (
  <div
    className="w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
    transform hover:scale-105 overflow-hidden p-6 border border-gray-100 flex items-center 
    space-x-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    onClick={onClick}
  >
    <img 
      src={user.picture.thumbnail} 
      alt={`${user.name.first} ${user.name.last}`}
      className="w-16 h-16 rounded-full ring-4 ring-gray-100"
    />
    <div className="text-left">
      <h3 className="text-lg font-semibold text-gray-800">
        {user.name.first} {user.name.last}
      </h3>
      <p className="text-sm text-gray-500 mt-1">{user.email}</p>
      <p className="text-xs text-gray-400 mt-1">{user.location.city}</p>
    </div>
  </div>
); 