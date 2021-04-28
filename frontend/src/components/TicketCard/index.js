import { useSelector } from "react-redux";
import "./TicketCard.css";

function TicketCard({ ticket }) {
  const { eventId } = ticket;
  const eventList = useSelector((state) => state.events);
  let eventObj = eventList[eventId];

  return <div className="ticket-card"></div>;
}
export default TicketCard;
