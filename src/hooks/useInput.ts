import React, { useState, useCallback, useEffect } from 'react';

interface IError {
	status: boolean;
	message: string;
}

type ReturnProps = [
	string,
	IError,
	(e: React.ChangeEvent<HTMLInputElement>) => void,
	(err: string) => void,
	() => void,
	React.Dispatch<React.SetStateAction<string>>
];

const initialError: IError = {
	status: false,
	message: ''
};

const useInput = (initialValue = ''): ReturnProps => {
	const [value, setValue] = useState(initialValue);
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

	const resetVal = useCallback(() => {
		setValue('');
	}, []);

	return [value, error, handleChange, handleHavingError, resetVal, setValue];
};

export default useInput;
