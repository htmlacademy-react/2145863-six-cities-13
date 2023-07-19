import { Link, useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import type { ServerFullOffer, ServerRewiew } from '../../types/offer';
import Page404 from '../page-404/page-404';
import classNames from 'classnames';
import GalleryImage from '../../components/gallery-image/gallery-image';
import { getMockNeighbourPlaces, reviews } from '../../mocks/mocks';
import { getReviewDateString, getReviewDateTime } from '../../utils/formats';
import NewCommentForm from '../../components/new-comment-form/new-comment-form';
import { AppRoute } from '../../constants';
import { useDocumentTitle } from '../../hooks';

type OfferPageProps = {
	fullOffers: ServerFullOffer[];
	reviews: ServerRewiew[];
};

function OfferPage({fullOffers}: OfferPageProps ): React.JSX.Element {
	const {id: offerId} = useParams();
	const favoriteAmount = fullOffers.filter((offer) => offer.isFavorite)?.length;
	const offer = fullOffers.find((offer) => {
		return offer.id === offerId
	});
	const favorireLabel = `${offer?.isFavorite ? 'In' : 'To'} bookmarks`;
	const bookmarkClass = classNames(
		'offer__bookmark-button',
		{'offer__bookmark-button--active': offer?.isFavorite},
		'button');
	const hostAvatartClass = classNames(
		'offer__avatar-wrapper',
		{'offer__avatar-wrapper--pro': offer?.host.isPro},
		'user__avatar-wrapper');
	const offerReviwes = reviews
		.filter((review) => review.offerId === offerId)

	const neighbourPlaces = getMockNeighbourPlaces();

	useDocumentTitle(`Place: ${offer?.title}`);

	return (
		<div className="page">
			<Header favoriteAmount={favoriteAmount} />

			{ offer === undefined &&
				<Page404 />
			}

			{ offer !== undefined &&
				<main className="page__main page__main--offer">
					<section className="offer">

						<div className="offer__gallery-container container">
							<div className="offer__gallery">
								{offer.images.map((image) =>
									<GalleryImage imageSrc = {image} key={image+offer.id}/>)}
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
										<span className="visually-hidden">{favorireLabel}</span>
									</button>
								</div>

								<div className="offer__rating rating">
									<div className="offer__stars rating__stars">
										<span style={{ width: `${offer.rating * 20}%`}} />
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
											<li className="offer__inside-item" key={index}>{good}</li>
										)}
									</ul>
								</div>

								<div className="offer__host">
									<h2 className="offer__host-title">Meet the host</h2>
									<div className="offer__host-user user">
										<div className={hostAvatartClass}>
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
											<p className="offer__text" key={index}>
												{desc}
											</p>
										)}
									</div>
								</div>

								{/* rewies */}
								<section className="offer__reviews reviews">
									<h2 className="reviews__title">
										Reviews
										{offerReviwes.length > 0 &&
											<> · <span className="reviews__amount">{offerReviwes.length}</span></>
										}
									</h2>
									<ul className="reviews__list">
										{offerReviwes.map((review) => (
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
														<span style={{ width: review.rating * 20 + '%'}} />
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
									<NewCommentForm />
								</section>
							</div>
						</div>
						<section className="offer__map map" />
					</section>
					<div className="container">
						{neighbourPlaces &&
							<section className="near-places places">
								<h2 className="near-places__title">
									Other places in the neighbourhood
								</h2>
								<div className="near-places__list places__list">
									{neighbourPlaces.map((place, index) =>
										<article className="near-places__card place-card" key={place.id+index}>
											<div className="near-places__image-wrapper place-card__image-wrapper">
												<Link to={AppRoute.offer.replace(':id', place.id)}>
													<img
														className="place-card__image"
														src={place.previewImage}
														width={260}
														height={200}
														alt="Place image"
													/>
												</Link>
											</div>
											<div className="place-card__info">
												<div className="place-card__price-wrapper">
													<div className="place-card__price">
														<b className="place-card__price-value">€{place.price}</b>
														<span className="place-card__price-text">/&nbsp;night</span>
													</div>
													<button
														className={`place-card__bookmark-button ${place.isFavorite && 'place-card__bookmark-button--active'} button`}
														type="button"
													>
														<svg
															className="place-card__bookmark-icon"
															width={18}
															height={19}
														>
															<use xlinkHref="#icon-bookmark" />
														</svg>
														<span className="visually-hidden">{`${place.isFavorite ? 'In' : 'To' } bookmarks`}</span>
													</button>
												</div>
												<div className="place-card__rating rating">
													<div className="place-card__stars rating__stars">
														<span style={{ width: `${place.rating * 20}%` }} />
														<span className="visually-hidden">Rating</span>
													</div>
												</div>
												<h2 className="place-card__name">
													<a href="#">{place.title}</a>
												</h2>
												<p className="place-card__type">{place.type}</p>
											</div>
										</article>
									)}

								</div>
							</section>
						}
					</div>
				</main>
			}



		</div>
	);
}

export default OfferPage;
