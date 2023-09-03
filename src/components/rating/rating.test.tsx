import { render, screen } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
	it('should render correctly', () => {
		const expectedRating = 3;

		render(<Rating rating={expectedRating} isSending={false} handleFormChange={()=>null}/>);

		expect(screen.getAllByTestId('label-id').length).toBe(5);
		expect(screen.getAllByTestId('input-id').length).toBe(5);
	});
});
