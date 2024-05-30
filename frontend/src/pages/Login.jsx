import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/Auth/authSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Login = () => {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect when logged in
		if (isSuccess || user) {
			navigate('/');
		}

		dispatch(reset());
	}, [isError, isSuccess, user, message, navigate, dispatch]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const validateEmail = (email) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!email || !password) {
			toast.error('Please fill all fields');
			return;
		}

		if (!validateEmail(email)) {
			toast.error('Please enter a valid email');
			return;
		}

		const userData = {
			email,
			password,
		};

		dispatch(login(userData));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<section className='heading'>
				<h1>
					<FaSignInAlt />
					Login
				</h1>
				<p>Please login to get support</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='email'
							className='form-control'
							id='email'
							name='email'
							value={email}
							onChange={handleChange}
							placeholder='Enter your email'
						/>
					</div>
					<div className='form-group'>
						<input
							type='password'
							className='form-control'
							id='password'
							name='password'
							value={password}
							onChange={handleChange}
							placeholder='Enter your password'
						/>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className='btn btn-block'
						>
							Login
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Login;
