import React from 'react';
import useToggle from '../../hooks/useToggle';

interface ICommonContext {
	isNavOpen: boolean;
	closeNav: () => void;
	openNav: () => void;
}

const initialContext: ICommonContext = {
	isNavOpen: false,
	openNav: () => {},
	closeNav: () => {}
};

export const CommonContext = React.createContext<ICommonContext>(initialContext);

const CommonProvider: React.FC = ({ children }) => {
	const { isOpen, handleOpen, handleClose } = useToggle();

	return (
		<CommonContext.Provider value={{ isNavOpen: isOpen, closeNav: handleClose, openNav: handleOpen }}>
			{children}
		</CommonContext.Provider>
	);
};

export default CommonProvider;
