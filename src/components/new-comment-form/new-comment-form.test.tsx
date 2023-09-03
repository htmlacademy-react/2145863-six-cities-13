import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { createFakeStore, createFullMockOffer } from '../../utils/mocks';
import NewCommentForm from './new-comment-form';

describe('Component: NewCommentForm', () => {
	it('should render correctly', () => {
		const mockOffer = createFullMockOffer();
		const offerId = mockOffer.id;
		const {withStoreComponent} = withStore(<NewCommentForm offerId={offerId}/>, createFakeStore());
		const expectedLabel = 'Your review';
		const expectedHelpText = /To submit review please make sure to set/i;

		render(withStoreComponent);

		expect(screen.getByText(expectedLabel)).toBeInTheDocument();
		expect(screen.getByText(expectedHelpText)).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
});
