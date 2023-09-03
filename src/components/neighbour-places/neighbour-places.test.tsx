import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { createFakeStore, createMockOffer } from '../../utils/mocks';
import NeighbourPlaces from './neighbour-places';

describe('Component: NeighbourPlaces', () => {
	it('should render correctly', () => {
		vi.mock('../card/card', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Card Component</div>),
		}));
		const mockPlaces = [createMockOffer(), createMockOffer()];
		const {withStoreComponent} = withStore(<NeighbourPlaces places={mockPlaces} />, createFakeStore());
		const expectedTitleText = 'Other places in the neighbourhood';

		render(withStoreComponent);

		expect(screen.getByText(expectedTitleText)).toBeInTheDocument();
		expect(screen.getAllByText('Mocked Card Component').length).toBe(mockPlaces.length);
	});
});
