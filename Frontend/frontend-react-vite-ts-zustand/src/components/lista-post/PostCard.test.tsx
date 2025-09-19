import PostCard from '@components/lista-post/PostCard';
import { renderWithRouter } from '../../tests/test-utils';
import { screen, fireEvent } from '@testing-library/react';
import { usePostsStore } from '@store/publicaciones/posts';

jest.mock('../../store/publicaciones/posts', () => ({
    usePostsStore: jest.fn(),
}));

describe('PostCard', () => {
    it('renderiza mensaje y likes y permite like', () => {
        const toggleLike = jest.fn();
        const mockLogout = jest.fn();
        (usePostsStore as unknown as jest.Mock).mockReturnValue({ user: null, logout: mockLogout });

        const post = {
            id: '1',
            userId: 'u1',
            message: 'Hola mundo',
            createdAt: new Date().toISOString(),
            likes: 2,
            likedByMe: false,
        };

        renderWithRouter(<PostCard post={post as any} />);
        expect(screen.getByText('Hola mundo')).toBeInTheDocument();
        fireEvent.click(screen.getByRole('button'));
        expect(toggleLike).toHaveBeenCalledWith('0');
    });
});
