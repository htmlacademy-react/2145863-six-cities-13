import { render, screen } from '@testing-library/react';
import LoadingScreen from './loading-screen';

describe('Component: Loading Screen', () => {
	it('should render correctly', () => {
		const expectedId = 'loader';
		const expectedText = /Loading.../i;

		render(<LoadingScreen />);

		expect(screen.getByTestId(expectedId)).toBeInTheDocument();
		expect(screen.getByText(expectedText)).toBeInTheDocument();
	});
});
