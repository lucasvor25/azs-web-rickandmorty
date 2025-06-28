import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from '../pages/Home';
import { EpisodeProvider } from '../context/EpisodeContext';

jest.mock('@apollo/client', () => {
    const original = jest.requireActual('@apollo/client');
    return {
        ...original,
        useQuery: () => ({
            data: {
                episodes: {
                    results: [
                        {
                            id: '1',
                            name: 'Pilot',
                            episode: 'S01E01',
                            air_date: 'December 2, 2013',
                            characters: [{ id: 'c1', image: 'image.jpg' }],
                        },
                    ],
                },
            },
            loading: false,
            error: null,
        }),
    };
});

describe('Home Page', () => {
    it('deve renderizar e permitir buscar e interagir com episódio', () => {
        render(
            <MemoryRouter>
                <EpisodeProvider>
                    <Home />
                </EpisodeProvider>
            </MemoryRouter>
        );

        expect(screen.getByText(/Todos os episódios/i)).toBeInTheDocument();

        const input = screen.getByPlaceholderText(/Buscar episódio/i);
        fireEvent.change(input, { target: { value: 'Pilot' } });

        expect(screen.getByText(/S01E01 - Pilot/i)).toBeInTheDocument();

        const favoriteButton = screen.getByTitle(/Favoritar aqui/i);
        fireEvent.click(favoriteButton);
        expect(favoriteButton).toHaveClass('text-yellow-400');

        const watchedButton = screen.getByTitle(/Marcar como Visto/i);
        fireEvent.click(watchedButton);
        expect(watchedButton).toHaveClass('text-green-400');
    });
});
