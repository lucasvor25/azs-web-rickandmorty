import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import EpisodeDetails from '../pages/EpisodeDetails';

jest.mock('@apollo/client', () => {
    const original = jest.requireActual('@apollo/client');
    return {
        ...original,
        useQuery: jest.fn(),
    };
});

import { useQuery } from '@apollo/client';

describe('EpisodeDetails', () => {
    const mockEpisode = {
        id: '1',
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
        characters: [
            {
                id: 'c1',
                name: 'Rick Sanchez',
                status: 'Alive',
                species: 'Human',
                image: 'rick.png',
            },
            {
                id: 'c2',
                name: 'Morty Smith',
                status: 'Alive',
                species: 'Human',
                image: 'morty.png',
            },
        ],
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('mostra loading inicialmente', () => {
        (useQuery as jest.Mock).mockReturnValue({
            loading: true,
            error: null,
            data: undefined,
        });

        render(
            <MemoryRouter initialEntries={['/episode/1']}>
                <Routes>
                    <Route path="/episode/:id" element={<EpisodeDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/carregando detalhes/i)).toBeInTheDocument();
    });

    it('mostra mensagem de erro quando erro ocorre', () => {
        (useQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: new Error('fail'),
            data: undefined,
        });

        render(
            <MemoryRouter initialEntries={['/episode/1']}>
                <Routes>
                    <Route path="/episode/:id" element={<EpisodeDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByText(/erro ao carregar detalhes/i)).toBeInTheDocument();
    });

    it('exibe detalhes do episódio e personagens', () => {
        (useQuery as jest.Mock).mockReturnValue({
            loading: false,
            error: null,
            data: { episode: mockEpisode },
        });

        render(
            <MemoryRouter initialEntries={['/episode/1']}>
                <Routes>
                    <Route path="/episode/:id" element={<EpisodeDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('S01E01 - Pilot');
        expect(screen.getByText(/data de exibição/i)).toBeInTheDocument();
        expect(screen.getByText(/december 2, 2013/i)).toBeInTheDocument();

        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Personagens');

        expect(screen.getByText(/Nome:\s*Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Nome:\s*Morty Smith/i)).toBeInTheDocument();
    });
});
