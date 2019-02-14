(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":8}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("../utilities/apiManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _eventHTML = require("./eventHTML");

var _eventManager = _interopRequireDefault(require("./eventManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createEvents = () => {
  let html = ""; //creates Html to that is used to add a new event

  html += (0, _eventHTML.createAddEventHtml)(); //make a section container for all events

  html += `
<section id="eventsContainer">
`; //todo we will need to make sure we are using our hidden field user id here

  _apiManager.default.GET("events?userId=1").then(parsedEvent => {
    parsedEvent.forEach(event => {
      html += (0, _eventHTML.eventHtml)(event);
    });
    html += `
        </section>
        `;
    (0, _printToDOM.default)(html, "#events");
    document.querySelector("#submitEvent").addEventListener("click", function () {
      _apiManager.default.POST("events", (0, _eventManager.default)()).then(() => {
        createEvents();
      });
    });
    document.querySelector("#eventsContainer").addEventListener("click", function () {
      console.log(event); //if(event.target.id)
    });
  });
};

var _default = createEvents;
exports.default = _default;

},{"../utilities/apiManager":12,"../utilities/printToDOM":13,"./eventHTML":5,"./eventManager":6}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("../utilities/apiManager"));

var _friendHTML = _interopRequireDefault(require("./friendHTML"));

var _searchUsers = _interopRequireDefault(require("./searchUsers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createFriends() {
  let userId = document.querySelector("#userId").value;
  let friendArray = [];
  let userArray = [];
  let friendList = [];

  _apiManager.default.GET(`users/${userId}/?_embed=friendships`).then(parsedFriendData => {
    friendArray = parsedFriendData.friendships.map(friendship => friendship.friendId);
    return _apiManager.default.GET("users");
  }).then(parsedUserData => {
    userArray = parsedUserData;
    friendList = friendArray.map(friendId => {
      return friendId = userArray.filter(user => {
        if (user.id === friendId) {
          return user.userName;
        }
      });
    });
    return friendList;
  }).then(friendList => (0, _friendHTML.default)(friendList)).then(() => {
    document.querySelector("#userSearchButton").addEventListener("click", () => {
      let input = document.querySelector("#searchUsersInput").value;
      (0, _searchUsers.default)(input);
    });
  });
}

var _default = createFriends;
exports.default = _default;

},{"../utilities/apiManager":12,"./friendHTML":7,"./searchUsers":11}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _apiManager = _interopRequireDefault(require("../utilities/apiManager"));

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _newsHTML = _interopRequireDefault(require("../profile/newsHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createNews = () => {
  // Get news objects from API
  _apiManager.default.GET("users?_embed=friendships&_embed=news").then(userArray => {
    // Check IF userId on news objects matches active user
    let activeUser = parseInt(document.querySelector("#userId").value);
    userArray.forEach(user => {
      if (activeUser === user.id) {
        let userName = user.userName;
        let newsArray = user.news; // Turn each matching news object into HTML

        newsArray.forEach(newsObject => {
          let newsItemHTML = (0, _newsHTML.default)(newsObject, userName) + "<button id='addNews'>Add News Item</button>"; // Print HTML news to DOM

          (0, _printToDOM.default)(newsItemHTML, "#news");
        });
      }
    });
  }); // Add event listener on #news (bubbles!!)

};

var _default = createNews;
exports.default = _default;

},{"../profile/newsHTML":9,"../utilities/apiManager":12,"../utilities/printToDOM":13}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createAddEventHtml = exports.eventHtml = void 0;

const eventHtml = event => {
  return `
    <p>---------------------------------------------------</p>
    <section id="section--${event.id}">
    <p>${event.eventName}</p>
    <p>${event.eventLocation}</p>
    <p>${event.eventDate}</p>
    <button id="edit--${event.id}">Edit</button>
    <button id="delete--${event.id}">Delete</button>
    </section>
    <p>---------------------------------------------------</p>
    `;
};

exports.eventHtml = eventHtml;

const createAddEventHtml = () => {
  return `
    <section id="addEventSection">
    <label>Event Name: </label>
    <input type="text" id="eventNameInput"></input>
    <label>Event Location: </label>
    <input type="text" id="eventLocationInput"></input>
    <label>Event Date: </label>
    <input type="text" id="eventDateInput"></input>
    <button id="submitEvent">submit</button>
    </section>
    `;
};

exports.createAddEventHtml = createAddEventHtml;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Event {
  constructor(userId, name, location, date) {
    this.userId = userId;
    this.eventName = name, this.eventLocation = location, this.eventDate = date;
  }

}

const createNewEvent = () => {
  //todo will need to get userId from hidden field
  const userId = 1;
  const name = document.querySelector("#eventNameInput").value;
  const location = document.querySelector("#eventLocationInput").value;
  const date = document.querySelector("#eventDateInput").value;
  let event = new Event(userId, name, location, date);
  return event;
};

var _default = createNewEvent;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function friendHTML(friendList) {
  let friendHTML = `
    <fieldset id="searchUsers">
        <label for="searchUsersInput" class="searchUsersInput">Search For New Users To Follow</label>
        <input type="text" name="searchUsersInput" id="searchUsersInput">
        <section id="userSearchResults"></section>
        <button id="userSearchButton">Search For Users</button>
    </fieldset>
    <h1 id='FriendList'>Friends</h1>
    `;
  friendList.map(friendObj => {
    let currentHTML = `
        <section id="friend--${friendObj[0].id}"
        <div id="#${friendObj[0].id}">${friendObj[0].userName}</div>
        <button id="delete--${friendObj[0].id}">Unfollow</button>
        `;
    return friendHTML += currentHTML;
  });
  (0, _printToDOM.default)(friendHTML, "#friends");
  return;
}

var _default = friendHTML;
exports.default = _default;

},{"../utilities/printToDOM":13}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _populateProfile = _interopRequireDefault(require("./populateProfile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const makeProfileHTML = userId => {
  const html = ` <article>
            <img></img>
            <input id = "userId" type = "Hidden" value = ${userId}>
            <section id = "title"> NutShell
            </section>
            <section id = "friends">
            </section>
            <section id = "news">
            </section>
            <section id = "events">
            </section>
            <section id = "tasks">
            </section>
            <section id = "chats">
            </section>
        </article>`;
  (0, _printToDOM.default)(html, ".output");
  (0, _populateProfile.default)();
};

var _default = makeProfileHTML;
exports.default = _default;

},{"../utilities/printToDOM":13,"./populateProfile":10}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const newsHTML = (newsObject, userName) => {
  return `
        <article id="newsItem--${newsObject.id}" class="newsItem user--${newsObject.userId}">
            <h3>${newsObject.news}</h3>
            <div>${newsObject.date}</div>
            <div>${newsObject.newsSynopsis}</div>
            <a href="${newsObject.newsURL}">Read Article</a>
            <div>Posted By: ${userName}</div>
            <button id="deleteNews--${newsObject.id}">Delete</button>
            <button id="editNews--${newsObject.id}">Edit</button>
        </article>
    `;
};

var _default = newsHTML;
exports.default = _default;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEvent = _interopRequireDefault(require("./createEvent"));

var _createFriends = _interopRequireDefault(require("./createFriends"));

var _createNews = _interopRequireDefault(require("./createNews"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  (0, _createFriends.default)();
  (0, _createEvent.default)(); // createNews();
  // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2,"./createFriends":3,"./createNews":4}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _apiManager = _interopRequireDefault(require("../utilities/apiManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function searchUsers(input) {
  let userId = document.querySelector("#userId").value;
  let users = [];
  let friendsIds = [];
  let notFriends = [];
  document.querySelector("#userSearchResults").innerHTML = "";
  return _apiManager.default.GET("users").then(parsedUsers => {
    users = parsedUsers;
    return _apiManager.default.GET(`users/${userId}/?_embed=friendships`);
  }).then(parsedFriendData => {
    friendsIds = parsedFriendData.friendships.map(friendship => friendship.friendId);
  }).then(() => {
    console.log({
      users
    });
    console.log({
      friendsIds
    });
    notFriends = users.map(user => {
      if (friendsIds.includes(user.id) === false && user.id !== userId) {
        return user;
      }
    }).filter(element => element !== undefined);
    console.log(notFriends);
  });
}

var _default = searchUsers;
exports.default = _default;

},{"../utilities/apiManager":12,"../utilities/printToDOM":13}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const API = {
  GET: dbArrayString => {
    return fetch(`http://localhost:8088/${dbArrayString}`).then(response => response.json());
  },
  POST: (dbArray, object) => {
    return fetch(`http://localhost:8088/${dbArray}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(response => response.json());
  },
  EDIT: (dbArray, object) => {
    return fetch(`http://127.0.0.1:8088/${dbArray}/${object.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(object)
    }).then(res => res.json());
  },
  DELETE: (dbArray, object) => {
    return fetch(`http://127.0.0.1:8088/${dbArray}/${object.id}`, {
      method: "DELETE"
    }).then(response => response.json());
  }
};
var _default = API;
exports.default = _default;

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function printToDom(HTMLString, DOMLocation) {
  document.querySelector(`${DOMLocation}`).innerHTML = HTMLString;
}

var _default = printToDom;
exports.default = _default;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9jcmVhdGVOZXdzLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL2V2ZW50SFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9ldmVudE1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvZnJpZW5kSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbmV3c0hUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvcG9wdWxhdGVQcm9maWxlLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL3NlYXJjaFVzZXJzLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL3ByaW50VG9ET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0EsOEJBQWdCLENBQWhCOzs7Ozs7Ozs7O0FDREE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNLFlBQVksR0FBRyxNQUFNO0FBQ3ZCLE1BQUksSUFBSSxHQUFHLEVBQVgsQ0FEdUIsQ0FFdkI7O0FBQ0EsRUFBQSxJQUFJLElBQUksb0NBQVIsQ0FIdUIsQ0FLdkI7O0FBQ0EsRUFBQSxJQUFJLElBQUs7O0NBQVQsQ0FOdUIsQ0FTdkI7O0FBQ0Esc0JBQUksR0FBSixDQUFRLGlCQUFSLEVBQTJCLElBQTNCLENBQWdDLFdBQVcsSUFBSTtBQUMzQyxJQUFBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLEtBQUssSUFBSTtBQUN6QixNQUFBLElBQUksSUFBSSwwQkFBVSxLQUFWLENBQVI7QUFDSCxLQUZE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Q0FBRSx5QkFBd0IsT0FBUSxJQUFHLE1BQU0sQ0FBQyxFQUFHLEVBQS9DLEVBQWtEO0FBQzFELE1BQUEsTUFBTSxFQUFFO0FBRGtELEtBQWxELENBQUwsQ0FHTixJQUhNLENBR0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBSFgsQ0FBUDtBQUlIO0FBOUJPLENBQVo7ZUFpQ2UsRzs7Ozs7Ozs7Ozs7QUNqQ2YsU0FBUyxVQUFULENBQW9CLFVBQXBCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQ3pDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsR0FBRSxXQUFZLEVBQXRDLEVBQXlDLFNBQXpDLEdBQXFELFVBQXJEO0FBQ0g7O2VBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBtYWtlUHJvZmlsZUhUTUwgZnJvbSBcIi4vcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUxcIlxubWFrZVByb2ZpbGVIVE1MKDEpXG4iLCJpbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiXG5pbXBvcnQgcHJpbnRUb0RvbSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IHsgZXZlbnRIdG1sLCBjcmVhdGVBZGRFdmVudEh0bWwgfSBmcm9tIFwiLi9ldmVudEhUTUxcIlxuaW1wb3J0IGNyZWF0ZU5ld0V2ZW50IGZyb20gXCIuL2V2ZW50TWFuYWdlclwiXG5jb25zdCBjcmVhdGVFdmVudHMgPSAoKSA9PiB7XG4gICAgbGV0IGh0bWwgPSBcIlwiXG4gICAgLy9jcmVhdGVzIEh0bWwgdG8gdGhhdCBpcyB1c2VkIHRvIGFkZCBhIG5ldyBldmVudFxuICAgIGh0bWwgKz0gY3JlYXRlQWRkRXZlbnRIdG1sKClcblxuICAgIC8vbWFrZSBhIHNlY3Rpb24gY29udGFpbmVyIGZvciBhbGwgZXZlbnRzXG4gICAgaHRtbCArPSBgXG48c2VjdGlvbiBpZD1cImV2ZW50c0NvbnRhaW5lclwiPlxuYFxuICAgIC8vdG9kbyB3ZSB3aWxsIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGFyZSB1c2luZyBvdXIgaGlkZGVuIGZpZWxkIHVzZXIgaWQgaGVyZVxuICAgIEFQSS5HRVQoXCJldmVudHM/dXNlcklkPTFcIikudGhlbihwYXJzZWRFdmVudCA9PiB7XG4gICAgICAgIHBhcnNlZEV2ZW50LmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgICAgICAgaHRtbCArPSBldmVudEh0bWwoZXZlbnQpXG4gICAgICAgIH0pXG4gICAgICAgIGh0bWwgKz0gYFxuICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIGBcbiAgICAgICAgcHJpbnRUb0RvbShodG1sLCBcIiNldmVudHNcIilcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1Ym1pdEV2ZW50XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBBUEkuUE9TVChcImV2ZW50c1wiLCBjcmVhdGVOZXdFdmVudCgpKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBjcmVhdGVFdmVudHMoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50c0NvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coZXZlbnQpXG4gICAgICAgICAgICAvL2lmKGV2ZW50LnRhcmdldC5pZClcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXZlbnRzIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuaW1wb3J0IGZyaWVuZEhUTUwgZnJvbSBcIi4vZnJpZW5kSFRNTFwiXG5pbXBvcnQgc2VhcmNoVXNlcnMgZnJvbSBcIi4vc2VhcmNoVXNlcnNcIjtcblxuZnVuY3Rpb24gY3JlYXRlRnJpZW5kcygpIHtcbiAgICBsZXQgdXNlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VySWRcIikudmFsdWVcbiAgICBsZXQgZnJpZW5kQXJyYXkgPSBbXVxuICAgIGxldCB1c2VyQXJyYXkgPSBbXVxuICAgIGxldCBmcmllbmRMaXN0ID0gW11cbiAgICBBUEkuR0VUKGB1c2Vycy8ke3VzZXJJZH0vP19lbWJlZD1mcmllbmRzaGlwc2ApXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XG4gICAgICAgICAgICBmcmllbmRBcnJheSA9IHBhcnNlZEZyaWVuZERhdGEuZnJpZW5kc2hpcHMubWFwKChmcmllbmRzaGlwKSA9PiBmcmllbmRzaGlwLmZyaWVuZElkKVxuICAgICAgICAgICAgcmV0dXJuIEFQSS5HRVQoXCJ1c2Vyc1wiKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocGFyc2VkVXNlckRhdGEpID0+IHtcbiAgICAgICAgICAgIHVzZXJBcnJheSA9IHBhcnNlZFVzZXJEYXRhXG4gICAgICAgICAgICBmcmllbmRMaXN0ID0gZnJpZW5kQXJyYXkubWFwKChmcmllbmRJZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcmllbmRJZCA9IHVzZXJBcnJheS5maWx0ZXIoKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IGZyaWVuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci51c2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZnJpZW5kTGlzdFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZnJpZW5kTGlzdCkgPT4gZnJpZW5kSFRNTChmcmllbmRMaXN0KSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyU2VhcmNoQnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hVc2Vyc0lucHV0XCIpLnZhbHVlXG4gICAgICAgICAgICAgICAgc2VhcmNoVXNlcnMoaW5wdXQpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGcmllbmRzIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBuZXdzSFRNTCBmcm9tIFwiLi4vcHJvZmlsZS9uZXdzSFRNTFwiXG5cbmNvbnN0IGNyZWF0ZU5ld3MgPSAoKSA9PiB7XG4gICAgLy8gR2V0IG5ld3Mgb2JqZWN0cyBmcm9tIEFQSVxuICAgIEFQSS5HRVQoXCJ1c2Vycz9fZW1iZWQ9ZnJpZW5kc2hpcHMmX2VtYmVkPW5ld3NcIilcbiAgICAgICAgLnRoZW4oKHVzZXJBcnJheSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgSUYgdXNlcklkIG9uIG5ld3Mgb2JqZWN0cyBtYXRjaGVzIGFjdGl2ZSB1c2VyXG4gICAgICAgICAgICBsZXQgYWN0aXZlVXNlciA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcklkXCIpLnZhbHVlKVxuICAgICAgICAgICAgdXNlckFycmF5LmZvckVhY2ggKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVVc2VyID09PSB1c2VyLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyTmFtZSA9IHVzZXIudXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3NBcnJheSA9IHVzZXIubmV3c1xuICAgICAgICAgICAgICAgICAgICAvLyBUdXJuIGVhY2ggbWF0Y2hpbmcgbmV3cyBvYmplY3QgaW50byBIVE1MXG4gICAgICAgICAgICAgICAgICAgIG5ld3NBcnJheS5mb3JFYWNoKG5ld3NPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3NJdGVtSFRNTCA9IG5ld3NIVE1MKG5ld3NPYmplY3QsIHVzZXJOYW1lKSArIFwiPGJ1dHRvbiBpZD0nYWRkTmV3cyc+QWRkIE5ld3MgSXRlbTwvYnV0dG9uPlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmludCBIVE1MIG5ld3MgdG8gRE9NXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludFRvRG9tKG5ld3NJdGVtSFRNTCwgXCIjbmV3c1wiKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIG9uICNuZXdzIChidWJibGVzISEpXG59XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU5ld3MiLCJcbmNvbnN0IGV2ZW50SHRtbCA9IChldmVudCkgPT57XG4gICAgcmV0dXJuIGBcbiAgICA8cD4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS08L3A+XG4gICAgPHNlY3Rpb24gaWQ9XCJzZWN0aW9uLS0ke2V2ZW50LmlkfVwiPlxuICAgIDxwPiR7ZXZlbnQuZXZlbnROYW1lfTwvcD5cbiAgICA8cD4ke2V2ZW50LmV2ZW50TG9jYXRpb259PC9wPlxuICAgIDxwPiR7ZXZlbnQuZXZlbnREYXRlfTwvcD5cbiAgICA8YnV0dG9uIGlkPVwiZWRpdC0tJHtldmVudC5pZH1cIj5FZGl0PC9idXR0b24+XG4gICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtldmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPC9wPlxuICAgIGBcbn1cblxuY29uc3QgY3JlYXRlQWRkRXZlbnRIdG1sPSgpPT57XG4gICAgcmV0dXJuIGBcbiAgICA8c2VjdGlvbiBpZD1cImFkZEV2ZW50U2VjdGlvblwiPlxuICAgIDxsYWJlbD5FdmVudCBOYW1lOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZXZlbnROYW1lSW5wdXRcIj48L2lucHV0PlxuICAgIDxsYWJlbD5FdmVudCBMb2NhdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImV2ZW50TG9jYXRpb25JbnB1dFwiPjwvaW5wdXQ+XG4gICAgPGxhYmVsPkV2ZW50IERhdGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJldmVudERhdGVJbnB1dFwiPjwvaW5wdXQ+XG4gICAgPGJ1dHRvbiBpZD1cInN1Ym1pdEV2ZW50XCI+c3VibWl0PC9idXR0b24+XG4gICAgPC9zZWN0aW9uPlxuICAgIGBcbn1cbmV4cG9ydCB7ZXZlbnRIdG1sLCBjcmVhdGVBZGRFdmVudEh0bWx9IiwiY2xhc3MgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJJZCwgbmFtZSwgbG9jYXRpb24sIGRhdGUpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWRcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lLFxuICAgICAgICB0aGlzLmV2ZW50TG9jYXRpb24gPSBsb2NhdGlvbixcbiAgICAgICAgdGhpcy5ldmVudERhdGUgPSBkYXRlXG4gICAgfVxufVxuXG5jb25zdCBjcmVhdGVOZXdFdmVudD0oKT0+e1xuICAgIC8vdG9kbyB3aWxsIG5lZWQgdG8gZ2V0IHVzZXJJZCBmcm9tIGhpZGRlbiBmaWVsZFxuICAgIGNvbnN0IHVzZXJJZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudE5hbWVJbnB1dFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50TG9jYXRpb25JbnB1dFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnREYXRlSW5wdXRcIikudmFsdWVcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCh1c2VySWQsIG5hbWUsIGxvY2F0aW9uLCBkYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBldmVudFxuXG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdFdmVudCIsImltcG9ydCBwcmludFRvRG9tIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiO1xuXG5mdW5jdGlvbiBmcmllbmRIVE1MKGZyaWVuZExpc3QpIHtcbiAgICBsZXQgZnJpZW5kSFRNTCA9IGBcbiAgICA8ZmllbGRzZXQgaWQ9XCJzZWFyY2hVc2Vyc1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoVXNlcnNJbnB1dFwiIGNsYXNzPVwic2VhcmNoVXNlcnNJbnB1dFwiPlNlYXJjaCBGb3IgTmV3IFVzZXJzIFRvIEZvbGxvdzwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hVc2Vyc0lucHV0XCIgaWQ9XCJzZWFyY2hVc2Vyc0lucHV0XCI+XG4gICAgICAgIDxzZWN0aW9uIGlkPVwidXNlclNlYXJjaFJlc3VsdHNcIj48L3NlY3Rpb24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJ1c2VyU2VhcmNoQnV0dG9uXCI+U2VhcmNoIEZvciBVc2VyczwvYnV0dG9uPlxuICAgIDwvZmllbGRzZXQ+XG4gICAgPGgxIGlkPSdGcmllbmRMaXN0Jz5GcmllbmRzPC9oMT5cbiAgICBgXG4gICAgZnJpZW5kTGlzdC5tYXAoKGZyaWVuZE9iaikgPT4ge1xuICAgICAgICBsZXQgY3VycmVudEhUTUwgPSBgXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZnJpZW5kLS0ke2ZyaWVuZE9ialswXS5pZH1cIlxuICAgICAgICA8ZGl2IGlkPVwiIyR7ZnJpZW5kT2JqWzBdLmlkfVwiPiR7ZnJpZW5kT2JqWzBdLnVzZXJOYW1lfTwvZGl2PlxuICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLS0ke2ZyaWVuZE9ialswXS5pZH1cIj5VbmZvbGxvdzwvYnV0dG9uPlxuICAgICAgICBgXG4gICAgICAgIHJldHVybiBmcmllbmRIVE1MICs9IGN1cnJlbnRIVE1MXG4gICAgfSlcbiAgICBwcmludFRvRG9tKGZyaWVuZEhUTUwsXCIjZnJpZW5kc1wiKVxuICAgIHJldHVyblxufVxuXG5leHBvcnQgZGVmYXVsdCBmcmllbmRIVE1MIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBwb3B1bGF0ZVByb2ZpbGUgZnJvbSBcIi4vcG9wdWxhdGVQcm9maWxlXCJcbmNvbnN0IG1ha2VQcm9maWxlSFRNTCA9ICh1c2VySWQpID0+IHtcbiAgICBjb25zdCBodG1sID0gYCA8YXJ0aWNsZT5cbiAgICAgICAgICAgIDxpbWc+PC9pbWc+XG4gICAgICAgICAgICA8aW5wdXQgaWQgPSBcInVzZXJJZFwiIHR5cGUgPSBcIkhpZGRlblwiIHZhbHVlID0gJHt1c2VySWR9PlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRpdGxlXCI+IE51dFNoZWxsXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZnJpZW5kc1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcIm5ld3NcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJldmVudHNcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJ0YXNrc1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImNoYXRzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwvYXJ0aWNsZT5gXG4gICAgcHJpbnRUb0RPTShodG1sLCBcIi5vdXRwdXRcIilcbiAgICBwb3B1bGF0ZVByb2ZpbGUoKTtcbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9maWxlSFRNTCIsImNvbnN0IG5ld3NIVE1MID0gKG5ld3NPYmplY3QsIHVzZXJOYW1lKSA9PiB7XG4gICAgcmV0dXJuIGBcbiAgICAgICAgPGFydGljbGUgaWQ9XCJuZXdzSXRlbS0tJHtuZXdzT2JqZWN0LmlkfVwiIGNsYXNzPVwibmV3c0l0ZW0gdXNlci0tJHtuZXdzT2JqZWN0LnVzZXJJZH1cIj5cbiAgICAgICAgICAgIDxoMz4ke25ld3NPYmplY3QubmV3c308L2gzPlxuICAgICAgICAgICAgPGRpdj4ke25ld3NPYmplY3QuZGF0ZX08L2Rpdj5cbiAgICAgICAgICAgIDxkaXY+JHtuZXdzT2JqZWN0Lm5ld3NTeW5vcHNpc308L2Rpdj5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIke25ld3NPYmplY3QubmV3c1VSTH1cIj5SZWFkIEFydGljbGU8L2E+XG4gICAgICAgICAgICA8ZGl2PlBvc3RlZCBCeTogJHt1c2VyTmFtZX08L2Rpdj5cbiAgICAgICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGVOZXdzLS0ke25ld3NPYmplY3QuaWR9XCI+RGVsZXRlPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZWRpdE5ld3MtLSR7bmV3c09iamVjdC5pZH1cIj5FZGl0PC9idXR0b24+XG4gICAgICAgIDwvYXJ0aWNsZT5cbiAgICBgXG59XG5cbmV4cG9ydCBkZWZhdWx0IG5ld3NIVE1MIiwiaW1wb3J0IGNyZWF0ZUV2ZW50cyBmcm9tIFwiLi9jcmVhdGVFdmVudFwiXG5pbXBvcnQgY3JlYXRlRnJpZW5kcyBmcm9tIFwiLi9jcmVhdGVGcmllbmRzXCJcbmltcG9ydCBjcmVhdGVOZXdzIGZyb20gXCIuL2NyZWF0ZU5ld3NcIlxuXG5jb25zdCBwb3B1bGF0ZVByb2ZpbGUgPSAoKSA9PiB7XG4gICAgY3JlYXRlRnJpZW5kcygpO1xuICAgIGNyZWF0ZUV2ZW50cygpO1xuICAgIC8vIGNyZWF0ZU5ld3MoKTtcbiAgICAvLyBjcmVhdGVUYXNrcygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcblxuIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcblxuZnVuY3Rpb24gc2VhcmNoVXNlcnMoaW5wdXQpIHtcbiAgICBsZXQgdXNlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VySWRcIikudmFsdWVcbiAgICBsZXQgdXNlcnMgPSBbXVxuICAgIGxldCBmcmllbmRzSWRzID0gW11cbiAgICBsZXQgbm90RnJpZW5kcyA9IFtdXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJTZWFyY2hSZXN1bHRzXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICByZXR1cm4gQVBJLkdFVChcInVzZXJzXCIpXG4gICAgICAgIC50aGVuKChwYXJzZWRVc2VycykgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSBwYXJzZWRVc2Vyc1xuICAgICAgICAgICAgcmV0dXJuIEFQSS5HRVQoYHVzZXJzLyR7dXNlcklkfS8/X2VtYmVkPWZyaWVuZHNoaXBzYClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHBhcnNlZEZyaWVuZERhdGEpID0+IHtcbiAgICAgICAgICAgIGZyaWVuZHNJZHMgPSBwYXJzZWRGcmllbmREYXRhLmZyaWVuZHNoaXBzLm1hcCgoZnJpZW5kc2hpcCkgPT4gZnJpZW5kc2hpcC5mcmllbmRJZClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coe3VzZXJzfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHtmcmllbmRzSWRzfSlcbiAgICAgICAgICAgIG5vdEZyaWVuZHMgPSB1c2Vycy5tYXAoKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZihmcmllbmRzSWRzLmluY2x1ZGVzKHVzZXIuaWQpID09PSBmYWxzZSAmJiB1c2VyLmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub3RGcmllbmRzKVxuICAgICAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWFyY2hVc2VycyIsImNvbnN0IEFQSSA9IHtcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJBcnJheVN0cmluZ31gKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgUE9TVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXl9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgRURJVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH0sXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImZ1bmN0aW9uIHByaW50VG9Eb20oSFRNTFN0cmluZywgRE9NTG9jYXRpb24pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
