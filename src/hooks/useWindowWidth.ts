import { useState, useEffect } from 'react';

const getWidth = () =>
	typeof window !== 'undefined' &&
	(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);

const useWindowWidth = () => {
	const [width, setWidth] = useState(getWidth());

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		const resizeListener = () => {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => setWidth(getWidth()), 150);
		};

		window.addEventListener('resize', resizeListener);

		return () => {
			window.removeEventListener('resize', resizeListener);
		};
	}, []);

	return width;
};

export default useWindowWidth;
