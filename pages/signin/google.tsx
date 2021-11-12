import React, { useEffect } from 'react';
import { NextPage } from 'next';
import { signIn, useSession } from 'next-auth/client';

const GoogleSignIn: NextPage = () => {
	const [session, loading] = useSession();

	useEffect(() => {
		if (!loading && !session) signIn('google');
		if (!loading && session) window.close();
	}, [session, loading]);

	return null;
	return <React.Fragment />;
};

export default GoogleSignIn;
