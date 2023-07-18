type RatingProps = {
	rating: number;
	setRating: (amount: number) => void;
}

function Rating({rating, setRating}: RatingProps) {
	return (
		<div className="reviews__rating-form form__rating"
		>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={5}
				id="5-stars"
				type="radio"
				defaultChecked = {rating===5}
				onChange={()=> {setRating(5)}}
			/>
			<label
				htmlFor="5-stars"
				className="reviews__rating-label form__rating-label"
				title="perfect"
			>
				<svg className="form__star-image" width={37} height={33}>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={4}
				id="4-stars"
				type="radio"
				defaultChecked = {rating===4}
				onChange={()=> {setRating(4)}}
			/>
			<label
				htmlFor="4-stars"
				className="reviews__rating-label form__rating-label"
				title="good"
			>
				<svg className="form__star-image" width={37} height={33}>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={3}
				id="3-stars"
				type="radio"
				defaultChecked = {rating===3}
				onChange={()=> {setRating(3)}}
			/>
			<label
				htmlFor="3-stars"
				className="reviews__rating-label form__rating-label"
				title="not bad"
			>
				<svg className="form__star-image" width={37} height={33}>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={2}
				id="2-stars"
				type="radio"
				defaultChecked = {rating===2}
				onChange={()=> {setRating(2)}}
			/>
			<label
				htmlFor="2-stars"
				className="reviews__rating-label form__rating-label"
				title="badly"
			>
				<svg className="form__star-image" width={37} height={33}>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
			<input
				className="form__rating-input visually-hidden"
				name="rating"
				defaultValue={1}
				id="1-star"
				type="radio"
				defaultChecked = {rating===1}
				onChange={()=> {setRating(1)}}
			/>
			<label
				htmlFor="1-star"
				className="reviews__rating-label form__rating-label"
				title="terribly"
			>
				<svg className="form__star-image" width={37} height={33}>
					<use xlinkHref="#icon-star" />
				</svg>
			</label>
		</div>
	);
}

export default Rating;
