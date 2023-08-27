import { useEffect } from 'react';

/**
 * хук вызовет callback при отмонтировании компонента
 * */
function useUnmount(callback: () => void) {
	useEffect(() => () => (callback()), [callback]);
}

export {useUnmount};
