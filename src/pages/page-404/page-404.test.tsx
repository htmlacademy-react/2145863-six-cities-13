import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import Page404 from './page-404';
import { createFakeStore } from '../../utils/mocks';

describe('Component: Page404', () => {
	it('should render correctly', () => {
		const expectedAlt = 'Специалист озадачен.';
		const expectedTitle = '404';
		const expectedText = 'Sorry, the page you visited does not exist.';
		const expectedButtonText = 'Go to main';
		const {withStoreComponent} = withStore(<Page404 />, createFakeStore());
		const preparedComponent = withHistory(withStoreComponent);

		render(preparedComponent);

		expect(screen.getByAltText(expectedAlt)).toBeInTheDocument();
		expect(screen.getByText(expectedTitle)).toBeInTheDocument();
		expect(screen.getByText(expectedText)).toBeInTheDocument();
		expect(screen.getByText(expectedButtonText)).toBeInTheDocument();
	});
});
