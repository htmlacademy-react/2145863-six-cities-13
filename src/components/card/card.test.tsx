import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore, createMockOffer } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import Card from './card';

describe('Component: Card', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		vi.mock('../bookmark/bookmark', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Bookmark Component</div>),
		}));
		const mockOffer = createMockOffer();
		mockOffer.isFavorite = true;
		mockOffer.isPremium = true;
		mockOffer.price = 100500;
		mockOffer.title = 'test-title';
		mockOffer.type = 'room';
		const expectedCardId = 'card-id';
		const expectedPremiumText = 'Premium';
		const withHistoryComponent = withHistory(<Card block='test' offer={mockOffer} />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);

		expect(screen.getByTestId(expectedCardId)).toBeInTheDocument();
		expect(screen.getByText(expectedPremiumText)).toBeInTheDocument();
		expect(screen.getByText('Mocked Bookmark Component')).toBeInTheDocument();
		expect(screen.getByText(/100500/)).toBeInTheDocument();
		expect(screen.getByText('test-title')).toBeInTheDocument();
		expect(screen.getByText('Room')).toBeInTheDocument();
	});
});
