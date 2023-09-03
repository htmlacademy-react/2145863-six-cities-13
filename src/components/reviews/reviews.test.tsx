import { render, screen } from '@testing-library/react';
import { withStore } from '../../utils/mock-component';
import { createFakeStore, createMockReview } from '../../utils/mocks';
import Reviews from './reviews';
import { NameSpace } from '../../constants';
import { RequestStatus } from '../../constants/common';

describe('Component: Reviews', () => {
	it('should render correctly', () => {
		const mockReviews = [createMockReview(), createMockReview()];
		const experctedReviewTestId = 'review-test-id';
		const { withStoreComponent } = withStore(
			<Reviews offerId="test-offer-id" />,
			createFakeStore({
				[NameSpace.Offer]: {
					offer: null,
					offerFetchingStatus: RequestStatus.Idle,
					neighborPlaces: [],
					reviews: mockReviews,
					reviewsFetchingStatus: RequestStatus.Success,
					reviewSendingStatus: RequestStatus.Idle,
				},
			})
		);

		render(withStoreComponent);

		expect(screen.getAllByTestId(experctedReviewTestId).length).toBe(mockReviews.length);
	});
});
