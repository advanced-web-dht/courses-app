import React, { useState, useEffect } from 'react';

import { GetAllClasses } from '../../api/client';
import { IClass } from '../../type';

interface IClassContext {
	classes: IClass[];
	AddClass: (newClass: IClass) => void;
	StoreClasses: (classes: IClass[]) => void;
	currentClass: IClass;
	StoreCurrentClass: (newClass: IClass) => void;
}

const initClass = { id: -1, members: [], code: '', name: '', isOwner: false };

const initClassContext: IClassContext = {
	classes: [],
	AddClass: () => {},
	StoreClasses: () => {},
	currentClass: initClass,
	StoreCurrentClass: () => {}
};

export const ClassContext = React.createContext(initClassContext);

// interface Props {
// 	initClasses: IClass[];
// }

const ClassContextProvider: React.FC = ({ children }) => {
	const [classes, setClasses] = useState<IClass[]>([]);
	const [currentClass, setCurrentClass] = useState<IClass>(initClass);

	const StoreClasses = (newClasses: IClass[]) => {
		setClasses([...newClasses]);
	};

	const AddClassHandler = (newClass: IClass): void => {
		setClasses((prev) => [...prev, newClass]);
	};

	const StoreCurrentClass = (newClass: IClass) => {
		setCurrentClass({ ...newClass });
	};

	useEffect(() => {
		(async () => {
			if (!!currentClass && classes.length === 0) {
				const data = await GetAllClasses();
				setClasses([...data]);
			}
		})();
	}, []);

	return (
		<ClassContext.Provider
			value={{ classes, currentClass, AddClass: AddClassHandler, StoreClasses, StoreCurrentClass }}
		>
			{children}
		</ClassContext.Provider>
	);
};

export default ClassContextProvider;
