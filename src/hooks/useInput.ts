import React, { useState, useCallback, useEffect } from 'react';

interface IError {
	status: boolean;
	message: string;
}

const initialError: IError = {
	status: false,
	message: ''
};

const useInput = (): [string, IError, (event: React.ChangeEvent<HTMLInputElement>) => void, (err: string) => void] => {
	const [value, setValue] = useState('');
	const [error, setError] = useState<IError>(initialError);

	useEffect(() => {
		if (error.status) {
			setError(initialError);
		}
	}, [value]);

	const handleChange = useCallback(({ target }: React.ChangeEvent<HTMLInputElement>) => {
		setValue(target.value);
	}, []);

	const handleHavingError = useCallback((err: string) => {
		setError({
			status: true,
			message: err
		});
	}, []);

	return [value, error, handleChange, handleHavingError];
};

export default useInput;
