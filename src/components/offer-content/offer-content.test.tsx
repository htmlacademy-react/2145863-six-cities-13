import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore, createFullMockOffer } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import OfferContent from './offer-content';

describe('Component: LoginPage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const mockOffer = createFullMockOffer();
		mockOffer.isPremium = true;
		const offerId = mockOffer.id;
		vi.mock('../gallery-image/gallery-image', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked GalleryImage Component</div>),
		}));
		vi.mock('../bookmark/bookmark', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Bookmark Component</div>),
		}));
		vi.mock('../reviews/reviews', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Reviews Component</div>),
		}));
		const withHistoryComponent = withHistory(<OfferContent offer={mockOffer} offerId={offerId}/>, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent , createFakeStore());

		render(withStoreComponent);

		expect(screen.getAllByText('Mocked GalleryImage Component').length).not.toBe(0);
		expect(screen.queryByText('Premium')).toBeInTheDocument();
		expect(screen.queryByText(mockOffer.title)).toBeInTheDocument();
		expect(screen.queryByText('Mocked Bookmark Component')).toBeInTheDocument();
		expect(screen.queryByText('Mocked Reviews Component')).toBeInTheDocument();

	});
});
