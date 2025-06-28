import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar, AiOutlineCheck, AiFillCheckCircle } from 'react-icons/ai';

export type Episode = {
    id: string;
    name: string;
    episode: string;
    air_date: string;
    characters: { id: string; image: string }[];
};

type Props = {
    episodes: Episode[];
    favorites: string[];
    watched: string[];
    onToggleFavorite: (id: string) => void;
    onToggleWatched: (id: string) => void;
};

export default function EpisodeCard({
    episodes,
    favorites,
    watched,
    onToggleFavorite,
    onToggleWatched,
}: Props) {
    if (episodes.length === 0) {
        return (
            <p className="text-white text-center w-full col-span-full">
                Nenhum episódio encontrado.
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {episodes.map((ep) => (
                <div
                    key={ep.id}
                    className="w-full border-none rounded-lg p-3 box-border bg-[#1c1c1c] text-white"
                >
                    <Link to={`/episode/${ep.id}`} className="no-underline text-inherit">
                        <img
                            src={ep.characters[0]?.image}
                            alt="Capa do episódio"
                            className="w-full h-auto rounded-md mb-2"
                        />
                        <h2 className="text-white text-lg font-semibold mt-2">
                            {ep.episode} - {ep.name}
                        </h2>
                        <p><strong>Data de exibição:</strong> {ep.air_date}</p>
                        <p><strong>Participantes:</strong> {ep.characters.length}</p>
                    </Link>
                    <div className="flex gap-5 mt-2.5 text-2xl">
                        <span
                            onClick={() => onToggleFavorite(ep.id)}
                            title={favorites.includes(ep.id) ? 'Desfavoritar' : 'Favoritar aqui'}
                            className={`cursor-pointer ${favorites.includes(ep.id) ? 'text-yellow-400' : 'text-gray-400'}`}
                        >
                            {favorites.includes(ep.id) ? <AiFillStar /> : <AiOutlineStar />}
                        </span>
                        <span
                            onClick={() => onToggleWatched(ep.id)}
                            title={watched.includes(ep.id) ? 'Desmarcar Visto' : 'Marcar como Visto'}
                            className={`cursor-pointer ${watched.includes(ep.id) ? 'text-green-400' : 'text-gray-400'}`}
                        >
                            {watched.includes(ep.id) ? <AiFillCheckCircle /> : <AiOutlineCheck />}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
