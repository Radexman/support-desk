import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/Tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const NewTicket = () => {
	const { user } = useSelector((state) => state.auth);
	const { isLoading, isError, isSuccess, message } = useSelector((state) => state.ticket);
	const [name] = useState(user.name);
	const [email] = useState(user.email);
	const [product, setProduct] = useState('iPhone');
	const [description, setDescription] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		if (isSuccess) {
			dispatch(reset());
			navigate('/tickets');
		}

		dispatch(reset());
	}, [dispatch, isError, isSuccess, navigate, message]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(createTicket({ product, description }));
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<>
			<BackButton url='/' />
			<section className='heading'>
				<h1>Create New Ticket</h1>
				<p>Please fill out the form below</p>
			</section>
			<section className='form'>
				<div className='form-group'>
					<label htmlFor='name'>Customer Name</label>
					<input
						type='text'
						value={name}
						disabled
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='eamil'>Customer Email</label>
					<input
						type='email'
						value={email}
						disabled
						className='form-control'
					/>
				</div>
				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label htmlFor='product'>Product</label>
						<select
							name='product'
							id='product'
							onChange={(e) => setProduct(e.target.value)}
							value={product}
						>
							<option value='iPhone'>iPhone</option>
							<option value='Macbook Pro'>Macbook Pro</option>
							<option value='iMac'>iMac</option>
							<option value='iPad'>iPad</option>
						</select>
					</div>
					<div className='form-group'>
						<label htmlFor='description'>Description of the issue</label>
						<textarea
							name='description'
							id='description'
							className='form-control'
							placeholder='Description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className='form-group'>
						<button
							type='submit'
							className='btn btn-block'
						>
							Submit
						</button>
					</div>
				</form>
			</section>
		</>
	);
};

export default NewTicket;
