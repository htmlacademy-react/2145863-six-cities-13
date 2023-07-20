import { useEffect } from 'react';
import { PROJECT_NAME } from '../constants';

export function useDocumentTitle(title: string) {
	useEffect(() => {
		const initialTitle = document.title;
		document.title = ` ${PROJECT_NAME} · ${title}`;

		return () => {
			document.title = initialTitle;
		};

	}, [title]);
}
