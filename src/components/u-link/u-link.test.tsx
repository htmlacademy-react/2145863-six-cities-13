import { render, screen } from '@testing-library/react';
import { withHistory } from '../../utils/mock-component';
import { MemoryHistory, createMemoryHistory } from 'history';
import { ULink } from './u-link';
import { AppRoute } from '../../constants';

describe('Component: ULink', () => {
	let mockHistory: MemoryHistory;

	beforeEach(() => {
		mockHistory = createMemoryHistory();
	});

	it('should render correctly with undefined href', () => {
		const expectedLinkId = 'link-undefined-id';

		render(<ULink>link-text</ULink>);

		expect(screen.getByTestId(expectedLinkId)).toBeInTheDocument();
	});

	it('should render correctly with external href', () => {
		const expectedLinkId = 'link-external-id';

		render(<ULink href="https://test.com">link-text</ULink>);

		expect(screen.getByTestId(expectedLinkId)).toBeInTheDocument();
	});

	it('should render correctly with anchor href', () => {
		const expectedLinkId = 'link-anchor-id';

		render(<ULink href="#test.com">link-text</ULink>);

		expect(screen.getByTestId(expectedLinkId)).toBeInTheDocument();
	});

	it('should render correctly with router link', () => {
		const expectedLinkId = 'link-router-id';
		const withHistoryComponent = withHistory(
			<ULink href={AppRoute.NotFound}>link-text</ULink>,
			mockHistory
		);

		render(withHistoryComponent);

		expect(screen.getByTestId(expectedLinkId)).toBeInTheDocument();
	});
});
