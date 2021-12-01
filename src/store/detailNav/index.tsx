import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface INavContext {
	currentTab: number;
	changeTab: (tab: number, url?: string) => void;
}

const initNavContext: INavContext = {
	currentTab: 0,
	changeTab: () => {}
};

export const NavContext = React.createContext(initNavContext);

const NavRoutes: Record<string, number> = {
	'#assignments': 1,
	'#students': 2,
	'#teachers': 3
};

const NavContextProvider: React.FC = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(0);
	const router = useRouter();

	useEffect(() => {
		const { hash } = window.location;
		if (hash) {
			const target = NavRoutes[hash];
			setCurrentTab(target);
		} else {
			setCurrentTab(0);
		}
	}, []);

	// listen url change for browser return
	useEffect(() => {
		const handleHashChange = () => {
			const { hash } = window.location;
			if (hash) {
				const target = NavRoutes[hash];
				setCurrentTab(target);
			} else {
				setCurrentTab(0);
			}
		};

		router.events.on('hashChangeComplete', handleHashChange);

		return () => {
			router.events.off('hashChangeComplete', handleHashChange);
		};
	}, []);

	const changeTab = (tab: number, url?: string): void => {
		// setCurrentTab(tab);
		const { query } = router;
		const currentUrl = router.pathname;
		const as = url ? `/class/${query.code}#${url}` : `/class/${query.code}`;
		router.push(currentUrl, as, { shallow: true });
	};

	return <NavContext.Provider value={{ currentTab, changeTab }}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
