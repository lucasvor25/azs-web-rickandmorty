import { useState } from 'react';
import { useEpisodes } from '../context/EpisodeContext';
import SearchInput from '../components/SearchInput';
import FavoritesGrid from '../components/FavoritesGrid';
import BackButton from '../components/BackButton';

export type Episode = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: {
        id: string;
        image: string;
    }[];
};

export default function Favorites() {
    const { episodes, favorites } = useEpisodes();
    const [filterName, setFilterName] = useState('');

    const favoriteEpisodes = episodes?.filter(
        ep => favorites?.includes(ep.id)
    ) || [];

    const filteredFavorites = favoriteEpisodes.filter(ep =>
        ep.name.toLowerCase().includes(filterName.toLowerCase())
    );

    if (!favoriteEpisodes.length) {
        return (
            <div className="min-h-screen bg-[#141414] text-white text-xl p-6">
                <div className="flex items-center gap-4">
                    <BackButton />
                    <span>Nenhum episódio favoritado ainda.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#141414] p-6 text-white">
            <BackButton />

            <h3 className="text-xl font-bold text-center m-5">Episódios Favoritos</h3>

            <SearchInput
                value={filterName}
                onChange={setFilterName}
                placeholder="Buscar episódio pelo nome..."
            />

            <FavoritesGrid filteredFavorites={filteredFavorites} />
        </div>
    );
}
