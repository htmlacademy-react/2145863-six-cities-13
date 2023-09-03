import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore, createFullMockOffer } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';
import OfferPage from './offer-page';

describe('Component: OfferPage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {

		vi.mock('../../components/header/header', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Header Component</div>),
		}));
		vi.mock('../../components/offer-content/offer-content', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked OfferContent Component</div>),
		}));
		vi.mock('../../components/leaflet-map/leaflet-map', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked LeafletMap Component</div>),
		}));
		vi.mock('../../components/neighbour-places/neighbour-places', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked NeighbourPlaces Component</div>),
		}));

		const expectedTestId = 'offer-page';
		const withHistoryComponent = withHistory(<OfferPage />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			createFakeStore({
				[NameSpace.Offer]: {
					offer: createFullMockOffer(),
					offerFetchingStatus: RequestStatus.Success,
					neighborPlaces: [],
					reviews: [],
					reviewsFetchingStatus: RequestStatus.Success,
					reviewSendingStatus: RequestStatus.Idle,
				},
			})
		);

		render(withStoreComponent);

		expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
		expect(screen.getByText('Mocked Header Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked OfferContent Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked LeafletMap Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked NeighbourPlaces Component')).toBeInTheDocument();
	});
});
