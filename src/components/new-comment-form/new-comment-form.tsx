import type { ChangeEvent } from 'react';
import { useState } from 'react';
import Rating from '../rating/rating';

function NewCommentForm() {
	const [formData, setFormData] = useState({
		rating: 0,
		review: '',
	});

	function handleFormChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const {name, value} = evt.target;
		setFormData({...formData, [name]: value});
	}

	return (
		<form className="reviews__form form" action="#" method="post"
			onSubmit={(event) => {
				event.preventDefault();
			}}
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<Rating rating={formData.rating} handleFormChange={handleFormChange}/>
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={formData.review}
				onChange={handleFormChange}
			/>
			<div className="reviews__button-wrapper">
				<p className="reviews__help">
					To submit review please make sure to set{' '}
					<span className="reviews__star">rating</span> and describe
					your stay with at least{' '}
					<b className="reviews__text-amount">50 characters</b>.
				</p>
				<button
					className="reviews__submit form__submit button"
					type="submit"
					disabled={false}
				>
					Submit
				</button>
			</div>
		</form>
	);
}

export default NewCommentForm;
