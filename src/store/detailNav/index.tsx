import React, { useState } from 'react';

interface INavContext {
	currentTab: number;
	changeTab: (tab: number) => void;
}

const initNavContext: INavContext = {
	currentTab: 0,
	changeTab: () => {}
};

export const NavContext = React.createContext(initNavContext);

const NavContextProvider: React.FC = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(0);

	const changeTab = (tab: number): void => {
		setCurrentTab(tab);
	};

	return <NavContext.Provider value={{ currentTab, changeTab }}>{children}</NavContext.Provider>;
};

export default NavContextProvider;
