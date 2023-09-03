import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore, createMockOffer } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import MainPage from './main-page';
import { NameSpace } from '../../constants';
import { DEFAULT_CITY, RequestStatus, SortMethod } from '../../constants/common';

describe('Component: MainPage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {

		vi.mock('../../hooks/use-offers/use-offers', () => ({
			useOffers: vi.fn().mockReturnValue({offers: [createMockOffer(), createMockOffer()], isEmpty: false }),
		}));

		vi.mock('../../components/header/header', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Header Component</div>),
		}));
		vi.mock('../../components/location-list/location-list', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked LocationList Component</div>),
		}));
		vi.mock('../../components/offer-list/offer-list', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked OfferList Component</div>),
		}));
		vi.mock('../../components/sort/sort', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked SortList Component</div>),
		}));
		vi.mock('../../components/leaflet-map/leaflet-map', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked LeafletMap Component</div>),
		}));

		const expectedTestId = 'main-page';
		const withHistoryComponent = withHistory(<MainPage />, mockHistory);
		const { withStoreComponent } = withStore(
			withHistoryComponent,
			createFakeStore({
				[NameSpace.Offers]: {
					city: DEFAULT_CITY,
					sort: SortMethod.Popular as string,
					activeOffer: null,
					allOffers: [],
					allOffersFetchingStatus: RequestStatus.Success,
				},
			})
		);

		render(withStoreComponent);

		expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
		expect(screen.getByText('Mocked Header Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked LocationList Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked OfferList Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked SortList Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked LeafletMap Component')).toBeInTheDocument();
	});
});
