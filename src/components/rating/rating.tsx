import type { ChangeEvent } from 'react';
import React from 'react';

type RatingProps = {
	rating: number;
	handleFormChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const RATING_DATA = [
	{n: 5, title: 'perfect',},
	{n: 4, title: 'good',},
	{n: 3, title: 'not bad',},
	{n: 2, title: 'badly',},
	{n: 1, title: 'terribly'},
] as const;

function Rating({rating, handleFormChange}: RatingProps) {
	return (
		<div className="reviews__rating-form form__rating">
			{RATING_DATA.map((item) => {
				const {n, title} = item;
				return (
					<React.Fragment key={n}>
						<input
							className="form__rating-input visually-hidden"
							name="rating"
							value={n}
							id={`${n}-stars`}
							type="radio"
							checked = {Number(rating) === n}
							onChange={handleFormChange}
						/>
						<label
							htmlFor={`${n}-stars`}
							className="reviews__rating-label form__rating-label"
							title={title}
						>
							<svg className="form__star-image" width={37} height={33} role="img" aria-labelledby={`${n}-title`}>
								<title id={`${n}-title`}>{title}</title>
								<use xlinkHref="#icon-star" />
							</svg>
						</label>
					</React.Fragment>
				);
			})}
		</div>
	);
}

export default Rating;
