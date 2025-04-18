const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 bg-[#2a2a2a] text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-sm"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  )
}

export default SearchBar 