import type { ChangeEvent, FormEvent } from 'react';
import React, { useState } from 'react';
import Rating from '../rating/rating';
import { store } from '../../store';
import { sendReviewApiAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { toast } from 'react-toastify';
import { getReviewSendingStatus } from '../../store/offer/offer.selectors';
import { RequestStatus } from '../../constants/common';
import { offerActions } from '../../store/offer/offer.slice';

type NewCommentFormProps = {
	offerId: string;
}

function NewCommentForm({offerId}: NewCommentFormProps): React.JSX.Element {
	const [formData, setFormData] = useState({
		rating: 0,
		review: '',
	});
	const [isValid, setIsValid] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const reviewSendingStatus = useAppSelector(getReviewSendingStatus);
	const dispatch = useAppDispatch();

	// function checkValidity(formData: {review: string; rating: number}) {
	function checkValidity({review, rating}: {review: string; rating: number}) {
		const ratingValidity = 1 <= rating && rating <= 5;
		const commentValidity = 50 <= review.length && review.length <= 300;
		setIsValid(ratingValidity && commentValidity);
	}

	function handleFormChange(evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
		const {name, value} = evt.target;
		setFormData({...formData, [name]: value});
		checkValidity({...formData, [name]: value});
	}

	function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsSending(true);
		store.dispatch(sendReviewApiAction({
			offerId,
			comment: formData.review,
			rating: Number(formData.rating),
		}));
	}

	if (reviewSendingStatus === RequestStatus.Error) {
		if (isSending) {
			setIsSending(false);
			toast.warn('Failed to submit form. Please try again!');
		}
		dispatch(offerActions.dropReviewSendingStatus);
	}
	if (reviewSendingStatus === RequestStatus.Success) {
		if (isSending) {
			setIsSending(false);
			setFormData({ rating: 0, review: '', });
			setIsValid(false);
		}
	}

	return (
		<form className="reviews__form form" action="#" method="post"
			onSubmit={handleFormSubmit}
		>
			<label className="reviews__label form__label" htmlFor="review">
				Your review
			</label>
			<Rating rating={formData.rating} handleFormChange={handleFormChange} isSending={isSending}/>
			<textarea
				className="reviews__textarea form__textarea"
				id="review"
				name="review"
				placeholder="Tell how was your stay, what you like and what can be improved"
				value={formData.review}
				onChange={handleFormChange}
				disabled={isSending}
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
					disabled={!isValid || isSending}
				>
					{isSending ? 'Submiting...' : 'Submit'}
				</button>
			</div>
		</form>
	);
}

export default NewCommentForm;
