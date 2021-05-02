# SoundField

![](https://i.gyazo.com/4b8c4427db4a39520c63245dc8342ede.jpg)
## Summary
SoundField is a web app for finding the newest music events. It was inspired by Eventbrite and built using Express, React, and PostgreSQL.
## Technologies
#### Back End
SoundField's backend was created with Express. It also follows RESTful API convention. <br />
Libraries:
* Sequelize
* JSONWebToken
* BCryptJS
* Faker
* Luxon
#### Front End
SoundField's frontend is a single page React app.  <br />
Libraries:
* React Redux
## Technical Details
### Filter Search
![](https://i.gyazo.com/6352cb453b1177b44d34618ba9041af1.png)
```
function HomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [activeTags, setActiveTags] = useState({}); //[1,2,3,4,5]
  const [categories, setCategories] = useState([]);
  const [eventList, setEventList] = useState([]);

  function isEmpty(obj) {
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) return false;
    }
    return true;
  }

  useEffect(async () => {
    if (!isEmpty(activeTags)) {
      let payload = Object.values(activeTags).map((tag) => parseInt(tag, 10));

      let res = await csrfFetch("/api/events/filter", {
        method: "POST",
        body: JSON.stringify({ payload }),
      });
      let result = await res.json();
      setEventList(result);
    } else {
      setEventList([]);
    }
  }, [activeTags]);
```
The filter search keeps track of the active tabs through a local state. When React detects a change in the active tags, a query is made with the new list of active tags.
### Tickets Page
![](https://i.gyazo.com/e4dfd7c22cba4a56fd6ec966a3a0e40e.png) <br />
The Tickets Page sorts the user's tickets into upcoming events and past events. Clicking on a tab will display user tickets associated with that tab. Following traditional music events tradition, users are not allowed to return their tickets and all purchases are final. Clicking on the ticket redirects the user to that event page to display additional information.
### Events Page
![](https://i.gyazo.com/c694b2281e86eeac4382f6d2420a0294.png) <br />
The Events Page shows events being hosted by the user. It utilizes the same tab feature from the Tickets Page. Users are also able to delete their owned events.
