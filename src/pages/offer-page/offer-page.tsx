import Header from '../../components/header/header';
import Page404 from '../page-404/page-404';
import GalleryImage from '../../components/gallery-image/gallery-image';
import { getReviewDateString, getReviewDateTime } from '../../utils/formats';
import NewCommentForm from '../../components/new-comment-form/new-comment-form';
import { AuthorizationStatus, NameSpace } from '../../constants';
import { useAppDispatch, useAppSelector, useDocumentTitle } from '../../hooks';
import LeafletMap from '../../components/leaflet-map/leaflet-map';
import Card from '../../components/card/card';
import clsx from 'clsx';
import { useEffect } from 'react';
import { offersActions } from '../../store/offers/offers.slice';
import { useParams } from 'react-router-dom';

type OfferPageProps = {
	status: AuthorizationStatus;
};

function OfferPage({ status }: OfferPageProps): React.JSX.Element {

	const offer = useAppSelector((state) => state[NameSpace.Offers].offer);
	const reviews = useAppSelector((state) => state[NameSpace.Offers].reviews);
	const neighbourPlaces = useAppSelector((state) => state[NameSpace.Offers].neighborPlaces);
	const dispatch = useAppDispatch();
	const offerId = useParams().id;

	useEffect(() => {
		if (offerId) {
			dispatch(offersActions.fetchOffer(offerId));
			dispatch(offersActions.fetchReviews(offerId));
			dispatch(offersActions.fetchNeighborPlaces(offerId));
		}

		return () => {
			dispatch(offersActions.dropOffer());
		};
	}, [offerId, dispatch]); // зачем dispatch

	const favoriteLabel = `${offer?.isFavorite ? 'In' : 'To'} bookmarks`;
	const bookmarkClass = clsx(
		'offer__bookmark-button',
		offer?.isFavorite && 'offer__bookmark-button--active',
		'button');
	const hostAvatarClass = clsx(
		'offer__avatar-wrapper',
		offer?.host.isPro && 'offer__avatar-wrapper--pro',
		'user__avatar-wrapper');
	const isAuthorized = status === AuthorizationStatus.Auth;

	useDocumentTitle(`Place: ${offer?.title || ''}`);

	return (
		<div className="page">
			<Header isAuthorized={isAuthorized} />
			{offer === null &&
				<Page404 />}
			{offer &&
				<main className="page__main page__main--offer">
					<section className="offer">

						<div className="offer__gallery-container container">
							<div className="offer__gallery">
								{offer.images.map((image) =>
									<GalleryImage imageSrc={image} key={image + offer.id} />)}
							</div>
						</div>

						<div className="offer__container container">
							<div className="offer__wrapper">
								{offer.isPremium && <div className="offer__mark"><span>Premium</span></div>}
								<div className="offer__name-wrapper">
									<h1 className="offer__name">
										{offer.title}
									</h1>
									<button className={bookmarkClass} type="button">
										<svg className="offer__bookmark-icon" width={31} height={33}>
											<use xlinkHref="#icon-bookmark" />
										</svg>
										<span className="visually-hidden">{favoriteLabel}</span>
									</button>
								</div>

								<div className="offer__rating rating">
									<div className="offer__stars rating__stars">
										<span style={{ width: `${offer.rating * 20}%` }} />
										<span className="visually-hidden">Rating</span>
									</div>
									<span className="offer__rating-value rating__value">{offer.rating}</span>
								</div>
								<ul className="offer__features">
									<li className="offer__feature offer__feature--entire">{offer.type}</li>
									<li className="offer__feature offer__feature--bedrooms">
										{offer.bedrooms} Bedrooms
									</li>
									<li className="offer__feature offer__feature--adults">
										Max {offer.maxAdults} adults
									</li>
								</ul>
								<div className="offer__price">
									<b className="offer__price-value">€{offer.price}</b>
									<span className="offer__price-text">&nbsp;night</span>
								</div>

								<div className="offer__inside">
									<h2 className="offer__inside-title">What&apos;s inside</h2>
									<ul className="offer__inside-list">
										{offer.goods.map((good, index) =>
											<li className="offer__inside-item" key={index.toString() + crypto.randomUUID()}>{good}</li>
										)}
									</ul>
								</div>

								<div className="offer__host">
									<h2 className="offer__host-title">Meet the host</h2>
									<div className="offer__host-user user">
										<div className={hostAvatarClass}>
											<img
												className="offer__avatar user__avatar"
												src={offer.host.avatarUrl}
												width={74}
												height={74}
												alt="Host avatar"
											/>
										</div>
										<span className="offer__user-name">{offer.host.name}</span>
										{offer.host.isPro && <span className="offer__user-status">Pro</span>}
									</div>
									{/* description */}
									<div className="offer__description">
										{offer.description.map((desc, index) =>
											(
												<p className="offer__text" key={index.toString() + crypto.randomUUID()}>{desc}</p>
											)
										)}
									</div>
								</div>

								{/* reviews */}
								<section className="offer__reviews reviews">
									<h2 className="reviews__title">
										Reviews
										{reviews?.length > 0 &&
											<> · <span className="reviews__amount">{reviews.length}</span></>}
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
									{isAuthorized && <NewCommentForm />}
								</section>
							</div>
						</div>
						<LeafletMap
							block="offer"
							neighborhoodOffers={neighbourPlaces}
						/>
					</section>
					<div className="container">
						{neighbourPlaces &&
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								<div className="near-places__list places__list">
									{neighbourPlaces.map((place) =>
										<Card block='near-places' offer={place} key={place.id} />
									)}

								</div>
							</section>}
					</div>
				</main>}
		</div>
	);
}

export default OfferPage;
