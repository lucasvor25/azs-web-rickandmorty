import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Episode } from '../pages/Favorites';
import { useQuery } from '@apollo/client';
import { GET_EPISODES } from '../api/api';

type EpisodeContextType = {
    episodes: Episode[];
    favorites: string[];
    watched: string[];
    toggleFavorite: (id: string) => void;
    toggleWatched: (id: string) => void;
};

const EpisodeContext = createContext<EpisodeContextType | undefined>(undefined);

export const useEpisodes = () => {
    const context = useContext(EpisodeContext);
    if (!context) throw new Error('useEpisodes must be used inside EpisodeProvider');
    return context;
};

export const EpisodeProvider = ({ children }: { children: ReactNode }) => {
    const [favorites, setFavorites] = useState<string[]>(() => JSON.parse(localStorage.getItem('favorites') || '[]'));
    const [watched, setWatched] = useState<string[]>(() => JSON.parse(localStorage.getItem('watched') || '[]'));

    const { data } = useQuery(GET_EPISODES);
    const episodes = data?.episodes?.results || [];

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        localStorage.setItem('watched', JSON.stringify(watched));
    }, [favorites, watched]);

    const toggleFavorite = (id: string) => {
        setFavorites((prev) => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const toggleWatched = (id: string) => {
        setWatched((prev) => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id]);
    };

    return (
        <EpisodeContext.Provider value={{ episodes, favorites, watched, toggleFavorite, toggleWatched }}>
            {children}
        </EpisodeContext.Provider>
    );
};
