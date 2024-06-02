import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTicket } from '../features/Tickets/ticketSlice';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
	const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, message, ticketId]);

	if (isLoading) {
		return <Spinner />;
	}

	if (isError) {
		return <h1>Something went wrong</h1>;
	}

	return (
		<div className='ticket-page'>
			<header className='ticket-header'>
				<BackButton url='/tickets' />
				<h1>Ticket ID: {ticket._id}</h1>
				<span className={`status status-${ticket.status}`}>{ticket.status}</span>
				<h2>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h2>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
			</header>
		</div>
	);
};

export default Ticket;
