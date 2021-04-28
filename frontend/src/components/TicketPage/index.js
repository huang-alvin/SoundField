import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { loadTickets } from "../../store/ticket";

import "./TicketPage.css";

function TicketPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(loadTickets(sessionUser.id));
  }, [dispatch]);

  const ticketList = useSelector((state) => state.tickets);
  return <div></div>;
}
export default TicketPage;
