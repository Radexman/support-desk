import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTicket, closeTicket } from '../features/Tickets/ticketSlice';
import { getNotes, createNote } from '../features/Notes/noteSlice';
import { FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import NoteItem from '../components/NoteItem';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Ticket = () => {
	const { ticket, isLoading, isError, message } = useSelector((state) => state.tickets);
	const { notes, isLoading: notesIsLoading } = useSelector((state) => state.notes);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [noteText, setNoteText] = useState('');

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

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	// Create note submit
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!noteText) {
			toast.error('Please add a note');
			return;
		}

		dispatch(createNote({ noteText, ticketId }));
		closeModal();
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
			{ticket.status !== 'closed' && (
				<button
					onClick={openModal}
					type='button'
					className='btn'
				>
					<FaPlus />
					Add Note
				</button>
			)}
			{modalIsOpen && (
				<div className='modal'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h2>Add Note</h2>
							<button
								onClick={closeModal}
								className='btn btn-modal'
							>
								X
							</button>
						</div>
						<form onSubmit={handleSubmit}>
							<div className='form-group'>
								<textarea
									name='noteText'
									id='noteText'
									className='form-control'
									placeholder='Note text'
									value={noteText}
									onChange={(e) => setNoteText(e.target.value)}
								></textarea>
							</div>
							<div className='form-group'>
								<button
									type='submit'
									className='btn'
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
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
