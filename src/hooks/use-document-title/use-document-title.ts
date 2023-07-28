import { useEffect } from 'react';
import { PROJECT_NAME } from '../../constants';

export function useDocumentTitle(title: string) {

	useEffect(() => {
		const initialTitle = document.title;
		return () => {
			document.title = initialTitle;
		};
	}, []);

	useEffect(() => {
		document.title = ` ${PROJECT_NAME} · ${title}`;
	}, [title]);
}
