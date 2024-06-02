import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, closeTicket } from '../features/Tickets/ticketSlice';
import { toast } from 'react-toastify';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
	const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, message, ticketId]);

	// Close ticket
	const handleTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket Closed');
		navigate('/tickets');
	};

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
				<h2>Product: {ticket.product}</h2>
				<hr />
				<div className='ticket-desc'>
					<h3>Description of Issue</h3>
					<p>{ticket.description}</p>
				</div>
			</header>
			{ticket.status !== 'closed' && (
				<button
					onClick={handleTicketClose}
					className='btn btn-block btn-danger'
				>
					Close Ticket
				</button>
			)}
		</div>
	);
};

export default Ticket;
