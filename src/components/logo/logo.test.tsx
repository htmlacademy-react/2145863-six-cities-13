import { render, screen } from '@testing-library/react';
import Logo from './logo';
import { withHistory } from '../../utils/mock-component';

describe('Component: Logo', () => {
	it('should render correctly', () => {
		const expectedAlt = '6 cities logo';
		const expectedTestid = 'link';
		const preparedComponent = withHistory(<Logo />);

		render(preparedComponent);

		expect(screen.getByAltText(expectedAlt)).toBeInTheDocument();
		expect(screen.getByTestId(expectedTestid)).toBeInTheDocument();
	});
});
