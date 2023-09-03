import { render, screen } from '@testing-library/react';
import GalleryImage from './gallery-image';
import { faker } from '@faker-js/faker';

describe('Component: GalleryImage', () => {
	it('should render correctly', () => {
		const mockSrc = faker.internet.url();
		const expectedImageId = 'gallery-image';

		render(<GalleryImage imageSrc={mockSrc}/>);

		expect(screen.getByTestId(expectedImageId)).toBeInTheDocument();
	});
});
