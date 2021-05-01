import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import TicketCard from "../TicketCard";
import { deleteOneEvent } from "../../store/event";
import "./UserEventPage.css";

function UserEventPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const userEventList = useSelector((state) =>
    Object.values(state.events.userEvents)
  );
  let history = useHistory();

  if (!sessionUser) {
    history.push("/home");
  }
  const handleDelete = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteOneEvent(eventId));
  };
  const handleAdd = (e) => {
    e.preventDefault();
    history.push("/");
  };

  // let ticketList = useSelector((state) => Object.values(state.tickets));
  // let eventIdList = ticketList.map((ticket) => ticket.eventId);
  // let userEventList = eventIdList.map((eventId) => eventList[eventId]);

  let folders = [{ title: "Upcoming" }, { title: "Past Events" }];
  let activeTickets = [];
  let expiredTickets = [];

  const sortTickets = () => {
    const today = new Date();
    userEventList.forEach((event) => {
      let endDate = event.end_date;
      if (Date.parse(today) - Date.parse(endDate) > 0) {
        expiredTickets.push(event);
      } else {
        activeTickets.push(event);
      }
    });
    folders[0]["tickets"] = activeTickets;
    folders[1]["tickets"] = expiredTickets;
  };
  sortTickets();

  let tabs = folders.map((tabObj, idx) => {
    const headerClass = idx === currentTab ? "active" : null;
    return (
      <span
        key={idx}
        id={idx}
        className={`${headerClass} tabs`}
        onClick={(e) => setCurrentTab(parseInt(e.target.id, 10))}
      >
        {tabObj.title}
      </span>
    );
  });
  const Headers = () => {
    return <div className="tab-header">{tabs}</div>;
  };
  let tickets;

  if (folders[currentTab].tickets.length) {
    tickets = [];
    folders[currentTab].tickets.forEach((event) => {
      let ticketTile = (
        <div className="ticket-tile" key={event.id}>
          <TicketCard ticket={event} key={event.id} />
          <button
            onClick={(e) => handleDelete(e, event.id)}
            className="delete-btn"
          >
            Delete
          </button>
        </div>
      );
      tickets.push(ticketTile);
    });
  } else {
    tickets = <div>Nothing to see here :)</div>;
  }

  return (
    <div className="ticket-container">
      <div className="events-header">Your Events</div>
      <Headers />
      <div ticket-card-container>{tickets}</div>
    </div>
  );
}
export default UserEventPage;
