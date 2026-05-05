import { Search } from "lucide-react";

const SearchBar = ({onSearch}) => {
    return (
        <div className="relative max-w-xl mx-auto mb-8">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
            type="text"
            placeholder="Search by name or email..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-indigo-900 bg-white" />
        </div>         
    );
};

export default SearchBar;