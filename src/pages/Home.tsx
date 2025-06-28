import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useEpisodes } from '../context/EpisodeContext';
import { GET_EPISODES } from '../api/api';
import EpisodeCard from '../components/EpisodeCard';
import SearchInput from '../components/SearchInput';

type Episode = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: { id: string; image: string }[];
};

export default function Home() {
    const { data, loading, error } = useQuery(GET_EPISODES);
    const { favorites, watched, toggleFavorite, toggleWatched } = useEpisodes();
    const [filterName, setFilterName] = useState('');

    const filteredEpisodes = data?.episodes?.results?.filter((ep: Episode) =>
        ep.name.toLowerCase().includes(filterName.toLowerCase())
    );

    if (loading)
        return (
            <div className="min-h-screen bg-[#141414] flex justify-center items-center">
                <div className="text-white flex flex-col items-center">
                    <svg
                        className="animate-spin h-10 w-10 text-yellow-400 mb-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                    </svg>
                    <p className="text-white text-lg">Carregando detalhes...</p>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="min-h-screen bg-[#141414] flex justify-center items-center">
                <p className="text-red-500 text-lg font-semibold">Erro ao carregar detalhes.</p>
            </div>
        );

    return (
        <div className="bg-[#141414] p-5 min-h-screen text-white">
            <h3 className="text-xl font-bold text-center m-5">Todos os episódios</h3>
            <SearchInput
                value={filterName}
                onChange={setFilterName}
                placeholder="Buscar episódio pelo nome..."
                showFavorites={true}
            />

            <EpisodeCard
                episodes={filteredEpisodes}
                favorites={favorites}
                watched={watched}
                onToggleFavorite={toggleFavorite}
                onToggleWatched={toggleWatched}
            />

        </div>
    );
}
