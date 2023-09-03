import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import LoginPage from './login-page';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';

describe('Component: LoginPage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		vi.mock('../../components/header/header', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked Header Component</div>),
		}));
		vi.mock('../../components/login-form/login-form', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked LoginForm Component</div>),
		}));
		vi.mock('../../components/random-city/random-city', () => ({
			default: vi.fn().mockReturnValue(<div>Mocked RandomCity Component</div>),
		}));
		const expectedTestId = 'login-page';
		const withHistoryComponent = withHistory(<LoginPage />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);

		expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
		expect(screen.getByText('Mocked Header Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked LoginForm Component')).toBeInTheDocument();
		expect(screen.getByText('Mocked RandomCity Component')).toBeInTheDocument();
	});
});
