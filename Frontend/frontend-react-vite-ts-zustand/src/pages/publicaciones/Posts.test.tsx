import { renderWithRouter } from '../../tests/test-utils';
import { screen } from '@testing-library/react';
import Posts from './Posts';
import { usePostsStore } from '@store/publicaciones/posts';

jest.mock('../../store/publicaciones/posts.ts', () => ({
  usePostsStore: jest.fn().mockReturnValue({
    items: [{
      id: '1', userId: 'u2', message: 'Post de otro', createdAt: new Date().toISOString(),
      likes: 5, likedByMe: false
    }],
    loading: false,
    fetch: jest.fn(),
    bindRealtime: jest.fn()
  })
}));

describe('Posts page', () => {
  it('muestra lista de posts', () => {
    renderWithRouter(<Posts />);
    expect(screen.getByText('Post de otro')).toBeInTheDocument();
  });
});
