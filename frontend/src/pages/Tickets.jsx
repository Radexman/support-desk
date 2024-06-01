import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/Tickets/ticketSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const Tickets = () => {
	const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);

	const dispatch = useDispatch();

	useEffect(() => {
		return () => {
			if (isSuccess) {
				dispatch(reset());
			}
		};
	}, [dispatch, isSuccess]);

	useEffect(() => {
		dispatch(getTickets());
	}, [dispatch]);

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div>
			<h1>Tickets</h1>
		</div>
	);
};

export default Tickets;
