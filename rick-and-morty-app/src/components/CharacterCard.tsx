type Character = {
    id: string;
    name: string;
    status: string;
    species: string;
    image: string;
};

type Props = {
    characters: Character[];
};

export default function CharacterCard({ characters }: Props) {
    if (characters.length === 0) {
        return (
            <p className="text-white text-center w-full col-span-full">
                Nenhum personagem encontrado.
            </p>
        );
    }

    return (
        <div className="flex flex-wrap gap-6">
            {characters.map((char) => (
                <div
                    key={char.id}
                    className="bg-[#1c1c1c] rounded-lg p-4 w-64 flex flex-col items-center text-center transition"
                >
                    <img
                        src={char.image}
                        alt={char.name}
                        className="rounded-lg mb-4 w-40 h-40 object-cover"
                    />
                    <p className="text-lg font-semibold mb-1">Nome: {char.name}</p>
                    <p className="text-lg font-semibold mb-1">Espécie: {char.species}</p>
                    <p className="text-lg font-semibold mb-1">Status: {char.status}</p>
                </div>
            ))}
        </div>
    );
}
