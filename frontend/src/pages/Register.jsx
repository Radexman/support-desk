import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { register, reset } from '../features/Auth/authSlice';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const dispatch = useDispatch();

	const { user, isLoading, isSuccess, isError, message } = useSelector((state) => state.auth);

	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		// Redirect when logged in
		if (isSuccess && user) {
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

		if (!name || !email || !password || !password2) {
			toast.error('Please fill all fields');
			return;
		}

		if (!validateEmail(email)) {
			toast.error('Please enter a valid email');
			return;
		}

		if (password !== password2) {
			toast.error('Passwords do not match');
			return;
		}

		if (password.length < 6) {
			toast.error('Password must be at least 6 characters');
			return;
		}

		const userData = {
			name,
			email,
			password,
		};

		dispatch(register(userData));
	};

	return (
		<>
			<section className='heading'>
				<h1>
					<FaUser />
					Register
				</h1>
				<p>Please create an account</p>
			</section>
			<section className='form'>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<input
							type='text'
							className='form-control'
							id='name'
							name='name'
							value={name}
							onChange={handleChange}
							placeholder='Enter your name'
						/>
					</div>
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
						<input
							type='password'
							className='form-control'
							id='password2'
							name='password2'
							value={password2}
							onChange={handleChange}
							placeholder='Confirm your password'
						/>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className='btn btn-block'
						>
							Register
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default Register;
