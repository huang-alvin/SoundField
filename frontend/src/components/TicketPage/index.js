import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { loadTickets } from "../../store/ticket";
import TicketCard from "../TicketCard";
import "./TicketPage.css";

function TicketPage() {
  const [currentTab, setCurrentTab] = useState(0);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);
  const eventList = useSelector((state) => state.events);
  let history = useHistory();

  if (!sessionUser) {
    history.push("/");
  }

  //   let userEventList;

  // could have utilized sequelize to do the dirty work instead
  //   useEffect(async () => {
  let ticketList = useSelector((state) => Object.values(state.tickets));
  let eventIdList = ticketList.map((ticket) => ticket.eventId);
  let userEventList = eventIdList.map((eventId) => eventList[eventId]);

  //   }, [dispatch]);

  let folders = [{ title: "Upcoming" }, { title: "Past tickets" }];
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
  //   console.log(userEventList, "eventlist");

  //   console.log(folders, "folders");
  let tabs = folders.map((tabObj, idx) => {
    const headerClass = idx === currentTab ? "active" : null;
    return (
      <li
        key={idx}
        id={idx}
        className={headerClass}
        onClick={(e) => setCurrentTab(parseInt(e.target.id, 10))}
      >
        {tabObj.title}
      </li>
    );
  });
  const Headers = () => {
    return <ul className="tab-header">{tabs}</ul>;
  };
  let tickets;

  //   const generateTickets = () => {

  if (folders[currentTab].tickets.length) {
    // console.log(userEventList);
    tickets = [];
    folders[currentTab].tickets.forEach((event) => {
      //   console.log(event.id);
      let ticketTile = (
        <div className="ticket-tile" key={event.id}>
          <TicketCard ticket={event} key={event.id} />
        </div>
      );
      tickets.push(ticketTile);
    });
  } else {
    tickets = <div>hi</div>;
  }
  //     return tickets;
  //   };
  //   generateTickets();
  console.log(tickets);
  return (
    <div className="ticket-container">
      <Headers />
      <div ticket-card-container>{tickets}</div>
    </div>
  );
}
export default TicketPage;
