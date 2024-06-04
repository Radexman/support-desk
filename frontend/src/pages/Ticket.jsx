import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, closeTicket } from '../features/Tickets/ticketSlice';
import { getNotes, reset as notesReset } from '../features/Notes/noteSlice';
import { toast } from 'react-toastify';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
	const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);
	const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { ticketId } = useParams();

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getTicket(ticketId));
		dispatch(getNotes(ticketId));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isError, message, ticketId]);

	// Close ticket
	const handleTicketClose = () => {
		dispatch(closeTicket(ticketId));
		toast.success('Ticket Closed');
		navigate('/tickets');
	};

	if (isLoading || notesIsLoading) {
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
				<h2>Notes</h2>
			</header>
			{notes.map((note) => (
				<NoteItem
					key={note._id}
					note={note}
				/>
			))}
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
