import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    showFavorites?: boolean;
};

export default function SearchInput({
    value,
    onChange,
    placeholder = 'Buscar...',
    showFavorites = false
}: SearchInputProps) {
    return (
        <div className="flex items-center mb-5 bg-[#1c1c1c] p-2.5 rounded-md">
            <FaSearch className="mr-2 text-white" />
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="flex-grow bg-transparent border-none outline-none text-white text-base"
            />
            {
                showFavorites ? (
                    <Link
                        to="/favorites"
                        className="whitespace-nowrap text-white hover:text-yellow-400 font-semibold underline"
                    >
                        Ver favoritos
                    </Link>
                ) : null
            }

        </div>
    );
}
