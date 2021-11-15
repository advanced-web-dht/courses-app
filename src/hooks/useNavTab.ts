import { useRouter } from 'next/router';
import { useState } from 'react';

const useNavTab = () => {
	const [currentTab, setCurrentTab] = useState(0);
	const router = useRouter();

	const changeTab = (tab: number, url: string) => {
		router.push(url, url, {
			shallow: true
		});
		setCurrentTab(tab);
	};
	return { currentTab, changeTab };
};

export default useNavTab;
