// Tickets.jsx
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/Tickets/ticketSlice';
import TicketItem from '../components/TicketItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Tickets = () => {
	const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	if (isLoading) {
		return <Spinner />;
	}

	if (!Array.isArray(tickets)) {
		return <div>Error: Tickets data is not an array</div>;
	}

	return (
		<>
			<BackButton url='/' />
			<h1>Tickets</h1>
			<div className='tickets'>
				<div className='ticket-headings'>
					<div>Date</div>
					<div>Product</div>
					<div>Status</div>
					<div></div>
				</div>
				{tickets.map((ticket) => (
					<TicketItem
						key={ticket.id}
						ticket={ticket}
					/>
				))}
			</div>
		</>
	);
};

export default Tickets;
