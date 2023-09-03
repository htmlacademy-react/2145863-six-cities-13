import { render } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import ScrollToTop from './scroll-to-top';

describe('Component: LoginPage', () => {
	const mockScrollTo = vi.spyOn(window, 'scrollTo');

	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const withHistoryComponent = withHistory(<ScrollToTop />, mockHistory);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);

		expect(mockScrollTo).toBeCalledTimes(1);
	});
});
