import { render, screen } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from './history-route';

describe('Component: LoginPage', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should HistoryRouter correctly', () => {
		const expectedText = 'text';

		render(
			<HistoryRouter history={mockHistory}>
				<span>text</span>
			</HistoryRouter>
		);

		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
