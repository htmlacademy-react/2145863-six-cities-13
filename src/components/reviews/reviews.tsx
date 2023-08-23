import React from 'react';
import { AuthorizationStatus, MAX_COMMENTS, RequestStatus } from '../../constants/common';
import { useAppSelector } from '../../hooks';
import { getReviewDateString, getReviewDateTime } from '../../utils/formats';
import NewCommentForm from '../new-comment-form/new-comment-form';
import ErrorElement from '../error-element/error-element';
import { ErrorCause } from '../../constants/errors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import { getAuthorizationStatus } from '../../store/user/user.selectors';
import { getReviews, getReviewsFetchingStatus } from '../../store/offer/offer.selectors';
import { sortByDecDate } from '../../utils/common';

type ReviewsProps = {
	offerId: string;
}

function Reviews({offerId}: ReviewsProps): React.JSX.Element {
	const fetchingStatus = useAppSelector(getReviewsFetchingStatus);
	const rawReviews = useAppSelector(getReviews);
	const reviews = rawReviews.slice().sort(sortByDecDate).slice(0, MAX_COMMENTS);
	const authorizationStatus = useAppSelector(getAuthorizationStatus);
	const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

	return (
		<section className="offer__reviews reviews">
			{fetchingStatus === RequestStatus.Pending && <LoadingScreen />}
			{fetchingStatus === RequestStatus.Error && <ErrorElement cause={ErrorCause.FetchReviews} offerId={offerId}/>}
			{fetchingStatus === RequestStatus.Success && (
				<>
					<h2 className="reviews__title">
						Reviews
						{reviews?.length > 0 &&
							<> · <span className="reviews__amount">{rawReviews.length}</span></>}
					</h2>
					<ul className="reviews__list">
						{reviews?.map((review) => (
							<li className="reviews__item" key={review.id}>
								<div className="reviews__user user">
									<div className="reviews__avatar-wrapper user__avatar-wrapper">
										<img
											className="reviews__avatar user__avatar"
											src={review.user.avatarUrl}
											width={54}
											height={54}
											alt="Reviews avatar"
										/>
									</div>
									<span className="reviews__user-name">{review.user.name}</span>
								</div>
								<div className="reviews__info">
									<div className="reviews__rating rating">
										<div className="reviews__stars rating__stars">
											<span style={{ width: `${review.rating * 20}%` }} />
											<span className="visually-hidden">Rating</span>
										</div>
									</div>
									<p className="reviews__text">
										{review.comment}
									</p>
									<time className="reviews__time" dateTime={getReviewDateTime(review.date)}>
										{getReviewDateString(review.date)}
									</time>
								</div>
							</li>
						))}

					</ul>
					{isAuthorized && offerId && <NewCommentForm offerId={offerId} />}
				</>
			)}
		</section>
	);
}

export default Reviews;
