import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EPISODE_DETAILS } from '../api/api';
import CharacterCard from '../components/CharacterCard';
import BackButton from '../components/BackButton';

type Character = {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
};

type Episode = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: Character[];
};

export default function EpisodeDetails() {
    const { id } = useParams<{ id: string }>();
    const { data, loading, error } = useQuery<{ episode: Episode }>(GET_EPISODE_DETAILS, {
        variables: { id },
    });

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

    const ep = data?.episode;

    return (
        <div className="min-h-screen bg-[#141414] p-6 text-white">

            <BackButton />

            <h3 className="text-xl font-bold text-center m-5">Detalhes do episódio</h3>
            <h1 className="text-3xl font-bold text-center mb-2">
                {ep?.episode} - {ep?.name}
            </h1>
            <p className="text-lg text-gray-300 text-center mb-6">
                <strong>Data de exibição:</strong> {ep?.air_date}
            </p>
            <h2 className="text-2xl font-semibold mb-4 text-center">Personagens</h2>

            <CharacterCard characters={ep?.characters || []} />
        </div>
    );
}

