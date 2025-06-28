import { Link } from 'react-router-dom';

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

type FavoritesGridProps = {
    filteredFavorites: Episode[];
};

export default function FavoritesGrid({ filteredFavorites }: FavoritesGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredFavorites.length > 0 ? (
                filteredFavorites.map((ep) => (
                    <div key={ep.id} className="bg-[#1c1c1c] border-none rounded-lg p-4 w-full">
                        <Link to={`/episode/${ep.id}`} className="block no-underline text-inherit">
                            <img
                                src={ep.characters[0]?.image}
                                alt={`Imagem do episódio ${ep.name}`}
                                className="rounded-lg w-full h-auto mb-3"
                            />
                            <h2 className="text-lg font-semibold">
                                {ep.episode} - {ep.name}
                            </h2>
                            <p>
                                <strong>Data de exibição:</strong> {ep.air_date}
                            </p>
                            <p>
                                <strong>Participantes:</strong> {ep.characters.length}
                            </p>
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-white text-center w-full col-span-full">
                    Nenhum episódio encontrado com esse nome.
                </p>
            )}
        </div>
    );
}