type GalleryImageProps = {
	imageSrc: string;
}

function GalleryImage({imageSrc}: GalleryImageProps): React.JSX.Element {
	return (
		<div className="offer__image-wrapper">
			<img
				data-testid="gallery-image"
				className="offer__image"
				src={imageSrc}
				alt=""
			/>
		</div>
	);
}

export default GalleryImage;
