import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { createFakeStore, createMockOffer } from '../../utils/mocks';
import OfferList from './offer-list';

describe('Component: OfferList', () => {
	it('should render correctly', () => {
		vi.mock('../card/card', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Card Component</div>),
		}));
		const mockOffers = [createMockOffer(), createMockOffer()];
		const {withStoreComponent} = withStore(<OfferList offers={mockOffers}/>, createFakeStore());

		render(withStoreComponent);

		expect(screen.getAllByText('Mocked Card Component').length).toBe(mockOffers.length);
	});
});
