import clsx from 'clsx';
import { ServerFullOffer } from '../../types/offer';
import { capitalize, getPluralPlaces } from '../../utils/convert';
import Bookmark from '../bookmark/bookmark';
import Reviews from '../reviews/reviews';
import GalleryImage from '../gallery-image/gallery-image';

type OfferContentProps = {
	offer: ServerFullOffer;
	offerId: string | undefined;
}

function OfferContent({offer, offerId}: OfferContentProps): React.JSX.Element {
	const hostAvatarClass = clsx(
		'offer__avatar-wrapper',
		offer?.host.isPro && 'offer__avatar-wrapper--pro',
		'user__avatar-wrapper');

	return (
		<>
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
						<Bookmark block="offer" offerId={offer.id} isFavorite={offer.isFavorite} />
					</div>

					<div className="offer__rating rating">
						<div className="offer__stars rating__stars">
							<span style={{ width: `${Math.round(offer.rating) * 20}%` }} />
							<span className="visually-hidden">Rating</span>
						</div>
						<span className="offer__rating-value rating__value">{offer.rating}</span>
					</div>
					<ul className="offer__features">
						<li className="offer__feature offer__feature--entire">{capitalize(offer.type)}</li>
						<li className="offer__feature offer__feature--bedrooms">
							{offer.bedrooms} {getPluralPlaces(offer.bedrooms, 'Bedroom')}
						</li>
						<li className="offer__feature offer__feature--adults">
							Max {offer.maxAdults} {getPluralPlaces(offer.maxAdults, 'adult')}
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
							<p className="offer__text">{offer.description}</p>
						</div>
					</div>

					{offerId && <Reviews offerId={offerId} />}

				</div>
			</div>
		</>
	);
}

export default OfferContent;
