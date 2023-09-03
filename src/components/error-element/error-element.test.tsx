import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { createFakeStore } from '../../utils/mocks';
import { MemoryHistory, createMemoryHistory } from 'history';
import ErrorElement, { ErrorMessage } from './error-element';
import { ErrorCause } from '../../constants/errors';

describe('Component: ErrorElement', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly', () => {
		const expectedText = 'Try again!';
		const expectedCause = ErrorCause.FetchFavorites;
		const withHistoryComponent = withHistory(
			<ErrorElement cause={expectedCause} offerId='test-offer-id' />,
			mockHistory
		);
		const {withStoreComponent} = withStore(withHistoryComponent, createFakeStore());

		render(withStoreComponent);

		expect(screen.getByText(ErrorMessage[expectedCause])).toBeInTheDocument();
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
