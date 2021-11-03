import React, { useState } from 'react';
import { IClass } from '../../type';

interface IClassContext {
	classes: IClass[];
	AddClass: (newClass: IClass) => void;
}

const initClassContext: IClassContext = {
	classes: [],
	AddClass: () => {}
};

export const ClassContext = React.createContext(initClassContext);

interface Props {
	initClasses: IClass[];
}

const ClassContextProvider: React.FC<Props> = ({ initClasses, children }) => {
	const [classes, setClasses] = useState<IClass[]>(initClasses);

	const AddClassHandler = (newClass: IClass): void => {
		setClasses((prev) => [...prev, newClass]);
	};

	return <ClassContext.Provider value={{ classes, AddClass: AddClassHandler }}>{children}</ClassContext.Provider>;
};

export default ClassContextProvider;
