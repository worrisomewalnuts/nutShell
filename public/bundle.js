(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":7}],2:[function(require,module,exports){
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

},{"../utilities/apiManager":10,"../utilities/printToDOM":11,"./eventHTML":4,"./eventManager":5}],3:[function(require,module,exports){
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

},{"../utilities/apiManager":10,"./friendHTML":6,"./searchUsers":9}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{"../utilities/printToDOM":11}],7:[function(require,module,exports){
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

},{"../utilities/printToDOM":11,"./populateProfile":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEvent = _interopRequireDefault(require("./createEvent"));

var _createFriends = _interopRequireDefault(require("./createFriends"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  (0, _createFriends.default)();
  (0, _createEvent.default)(); // createNews();
  // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2,"./createFriends":3}],9:[function(require,module,exports){
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

},{"../utilities/apiManager":10,"../utilities/printToDOM":11}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9ldmVudEhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvZXZlbnRNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL2ZyaWVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL3BvcHVsYXRlUHJvZmlsZS5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9zZWFyY2hVc2Vycy5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBLDhCQUFnQixDQUFoQjs7Ozs7Ozs7OztBQ0RBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0EsTUFBTSxZQUFZLEdBQUcsTUFBTTtBQUN2QixNQUFJLElBQUksR0FBRyxFQUFYLENBRHVCLENBRXZCOztBQUNBLEVBQUEsSUFBSSxJQUFJLG9DQUFSLENBSHVCLENBS3ZCOztBQUNBLEVBQUEsSUFBSSxJQUFLOztDQUFULENBTnVCLENBU3ZCOztBQUNBLHNCQUFJLEdBQUosQ0FBUSxpQkFBUixFQUEyQixJQUEzQixDQUFnQyxXQUFXLElBQUk7QUFDM0MsSUFBQSxXQUFXLENBQUMsT0FBWixDQUFvQixLQUFLLElBQUk7QUFDekIsTUFBQSxJQUFJLElBQUksMEJBQVUsS0FBVixDQUFSO0FBQ0gsS0FGRDtBQUdBLElBQUEsSUFBSSxJQUFLOztTQUFUO0FBR0EsNkJBQVcsSUFBWCxFQUFpQixTQUFqQjtBQUVBLElBQUEsUUFB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TSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXG5tYWtlUHJvZmlsZUhUTUwoMSlcbiIsImltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcbmltcG9ydCBwcmludFRvRG9tIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiXG5pbXBvcnQgeyBldmVudEh0bWwsIGNyZWF0ZUFkZEV2ZW50SHRtbCB9IGZyb20gXCIuL2V2ZW50SFRNTFwiXG5pbXBvcnQgY3JlYXRlTmV3RXZlbnQgZnJvbSBcIi4vZXZlbnRNYW5hZ2VyXCJcbmNvbnN0IGNyZWF0ZUV2ZW50cyA9ICgpID0+IHtcbiAgICBsZXQgaHRtbCA9IFwiXCJcbiAgICAvL2NyZWF0ZXMgSHRtbCB0byB0aGF0IGlzIHVzZWQgdG8gYWRkIGEgbmV3IGV2ZW50XG4gICAgaHRtbCArPSBjcmVhdGVBZGRFdmVudEh0bWwoKVxuXG4gICAgLy9tYWtlIGEgc2VjdGlvbiBjb250YWluZXIgZm9yIGFsbCBldmVudHNcbiAgICBodG1sICs9IGBcbjxzZWN0aW9uIGlkPVwiZXZlbnRzQ29udGFpbmVyXCI+XG5gXG4gICAgLy90b2RvIHdlIHdpbGwgbmVlZCB0byBtYWtlIHN1cmUgd2UgYXJlIHVzaW5nIG91ciBoaWRkZW4gZmllbGQgdXNlciBpZCBoZXJlXG4gICAgQVBJLkdFVChcImV2ZW50cz91c2VySWQ9MVwiKS50aGVuKHBhcnNlZEV2ZW50ID0+IHtcbiAgICAgICAgcGFyc2VkRXZlbnQuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICAgICAgICBodG1sICs9IGV2ZW50SHRtbChldmVudClcbiAgICAgICAgfSlcbiAgICAgICAgaHRtbCArPSBgXG4gICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgYFxuICAgICAgICBwcmludFRvRG9tKGh0bWwsIFwiI2V2ZW50c1wiKVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VibWl0RXZlbnRcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIEFQSS5QT1NUKFwiZXZlbnRzXCIsIGNyZWF0ZU5ld0V2ZW50KCkpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNyZWF0ZUV2ZW50cygpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnRzQ29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudClcbiAgICAgICAgICAgIC8vaWYoZXZlbnQudGFyZ2V0LmlkKVxuICAgICAgICB9KVxuICAgIH0pXG59XG5cblxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudHMiLCJpbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiXG5pbXBvcnQgZnJpZW5kSFRNTCBmcm9tIFwiLi9mcmllbmRIVE1MXCJcbmltcG9ydCBzZWFyY2hVc2VycyBmcm9tIFwiLi9zZWFyY2hVc2Vyc1wiO1xuXG5mdW5jdGlvbiBjcmVhdGVGcmllbmRzKCkge1xuICAgIGxldCB1c2VySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJJZFwiKS52YWx1ZVxuICAgIGxldCBmcmllbmRBcnJheSA9IFtdXG4gICAgbGV0IHVzZXJBcnJheSA9IFtdXG4gICAgbGV0IGZyaWVuZExpc3QgPSBbXVxuICAgIEFQSS5HRVQoYHVzZXJzLyR7dXNlcklkfS8/X2VtYmVkPWZyaWVuZHNoaXBzYClcbiAgICAgICAgLnRoZW4oKHBhcnNlZEZyaWVuZERhdGEpID0+IHtcbiAgICAgICAgICAgIGZyaWVuZEFycmF5ID0gcGFyc2VkRnJpZW5kRGF0YS5mcmllbmRzaGlwcy5tYXAoKGZyaWVuZHNoaXApID0+IGZyaWVuZHNoaXAuZnJpZW5kSWQpXG4gICAgICAgICAgICByZXR1cm4gQVBJLkdFVChcInVzZXJzXCIpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwYXJzZWRVc2VyRGF0YSkgPT4ge1xuICAgICAgICAgICAgdXNlckFycmF5ID0gcGFyc2VkVXNlckRhdGFcbiAgICAgICAgICAgIGZyaWVuZExpc3QgPSBmcmllbmRBcnJheS5tYXAoKGZyaWVuZElkKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyaWVuZElkID0gdXNlckFycmF5LmZpbHRlcigodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodXNlci5pZCA9PT0gZnJpZW5kSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJOYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHJldHVybiBmcmllbmRMaXN0XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChmcmllbmRMaXN0KSA9PiBmcmllbmRIVE1MKGZyaWVuZExpc3QpKVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJTZWFyY2hCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFVzZXJzSW5wdXRcIikudmFsdWVcbiAgICAgICAgICAgICAgICBzZWFyY2hVc2VycyhpbnB1dClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUZyaWVuZHMiLCJcbmNvbnN0IGV2ZW50SHRtbCA9IChldmVudCkgPT57XG4gICAgcmV0dXJuIGBcbiAgICA8cD4tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS08L3A+XG4gICAgPHNlY3Rpb24gaWQ9XCJzZWN0aW9uLS0ke2V2ZW50LmlkfVwiPlxuICAgIDxwPiR7ZXZlbnQuZXZlbnROYW1lfTwvcD5cbiAgICA8cD4ke2V2ZW50LmV2ZW50TG9jYXRpb259PC9wPlxuICAgIDxwPiR7ZXZlbnQuZXZlbnREYXRlfTwvcD5cbiAgICA8YnV0dG9uIGlkPVwiZWRpdC0tJHtldmVudC5pZH1cIj5FZGl0PC9idXR0b24+XG4gICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtldmVudC5pZH1cIj5EZWxldGU8L2J1dHRvbj5cbiAgICA8L3NlY3Rpb24+XG4gICAgPHA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPC9wPlxuICAgIGBcbn1cblxuY29uc3QgY3JlYXRlQWRkRXZlbnRIdG1sPSgpPT57XG4gICAgcmV0dXJuIGBcbiAgICA8c2VjdGlvbiBpZD1cImFkZEV2ZW50U2VjdGlvblwiPlxuICAgIDxsYWJlbD5FdmVudCBOYW1lOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZXZlbnROYW1lSW5wdXRcIj48L2lucHV0PlxuICAgIDxsYWJlbD5FdmVudCBMb2NhdGlvbjogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImV2ZW50TG9jYXRpb25JbnB1dFwiPjwvaW5wdXQ+XG4gICAgPGxhYmVsPkV2ZW50IERhdGU6IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJldmVudERhdGVJbnB1dFwiPjwvaW5wdXQ+XG4gICAgPGJ1dHRvbiBpZD1cInN1Ym1pdEV2ZW50XCI+c3VibWl0PC9idXR0b24+XG4gICAgPC9zZWN0aW9uPlxuICAgIGBcbn1cbmV4cG9ydCB7ZXZlbnRIdG1sLCBjcmVhdGVBZGRFdmVudEh0bWx9IiwiY2xhc3MgRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHVzZXJJZCwgbmFtZSwgbG9jYXRpb24sIGRhdGUpIHtcbiAgICAgICAgdGhpcy51c2VySWQgPSB1c2VySWRcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lLFxuICAgICAgICB0aGlzLmV2ZW50TG9jYXRpb24gPSBsb2NhdGlvbixcbiAgICAgICAgdGhpcy5ldmVudERhdGUgPSBkYXRlXG4gICAgfVxufVxuXG5jb25zdCBjcmVhdGVOZXdFdmVudD0oKT0+e1xuICAgIC8vdG9kbyB3aWxsIG5lZWQgdG8gZ2V0IHVzZXJJZCBmcm9tIGhpZGRlbiBmaWVsZFxuICAgIGNvbnN0IHVzZXJJZCA9IDE7XG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudE5hbWVJbnB1dFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50TG9jYXRpb25JbnB1dFwiKS52YWx1ZVxuICAgICAgICAgICAgY29uc3QgZGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnREYXRlSW5wdXRcIikudmFsdWVcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBFdmVudCh1c2VySWQsIG5hbWUsIGxvY2F0aW9uLCBkYXRlKTtcbiAgICAgICAgICAgIHJldHVybiBldmVudFxuXG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdFdmVudCIsImltcG9ydCBwcmludFRvRG9tIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiO1xuXG5mdW5jdGlvbiBmcmllbmRIVE1MKGZyaWVuZExpc3QpIHtcbiAgICBsZXQgZnJpZW5kSFRNTCA9IGBcbiAgICA8ZmllbGRzZXQgaWQ9XCJzZWFyY2hVc2Vyc1wiPlxuICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoVXNlcnNJbnB1dFwiIGNsYXNzPVwic2VhcmNoVXNlcnNJbnB1dFwiPlNlYXJjaCBGb3IgTmV3IFVzZXJzIFRvIEZvbGxvdzwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJzZWFyY2hVc2Vyc0lucHV0XCIgaWQ9XCJzZWFyY2hVc2Vyc0lucHV0XCI+XG4gICAgICAgIDxzZWN0aW9uIGlkPVwidXNlclNlYXJjaFJlc3VsdHNcIj48L3NlY3Rpb24+XG4gICAgICAgIDxidXR0b24gaWQ9XCJ1c2VyU2VhcmNoQnV0dG9uXCI+U2VhcmNoIEZvciBVc2VyczwvYnV0dG9uPlxuICAgIDwvZmllbGRzZXQ+XG4gICAgPGgxIGlkPSdGcmllbmRMaXN0Jz5GcmllbmRzPC9oMT5cbiAgICBgXG4gICAgZnJpZW5kTGlzdC5tYXAoKGZyaWVuZE9iaikgPT4ge1xuICAgICAgICBsZXQgY3VycmVudEhUTUwgPSBgXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZnJpZW5kLS0ke2ZyaWVuZE9ialswXS5pZH1cIlxuICAgICAgICA8ZGl2IGlkPVwiIyR7ZnJpZW5kT2JqWzBdLmlkfVwiPiR7ZnJpZW5kT2JqWzBdLnVzZXJOYW1lfTwvZGl2PlxuICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlLS0ke2ZyaWVuZE9ialswXS5pZH1cIj5VbmZvbGxvdzwvYnV0dG9uPlxuICAgICAgICBgXG4gICAgICAgIHJldHVybiBmcmllbmRIVE1MICs9IGN1cnJlbnRIVE1MXG4gICAgfSlcbiAgICBwcmludFRvRG9tKGZyaWVuZEhUTUwsXCIjZnJpZW5kc1wiKVxuICAgIHJldHVyblxufVxuXG5leHBvcnQgZGVmYXVsdCBmcmllbmRIVE1MIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBwb3B1bGF0ZVByb2ZpbGUgZnJvbSBcIi4vcG9wdWxhdGVQcm9maWxlXCJcbmNvbnN0IG1ha2VQcm9maWxlSFRNTCA9ICh1c2VySWQpID0+IHtcbiAgICBjb25zdCBodG1sID0gYCA8YXJ0aWNsZT5cbiAgICAgICAgICAgIDxpbWc+PC9pbWc+XG4gICAgICAgICAgICA8aW5wdXQgaWQgPSBcInVzZXJJZFwiIHR5cGUgPSBcIkhpZGRlblwiIHZhbHVlID0gJHt1c2VySWR9PlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRpdGxlXCI+IE51dFNoZWxsXG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZnJpZW5kc1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcIm5ld3NcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJldmVudHNcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJ0YXNrc1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImNoYXRzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgIDwvYXJ0aWNsZT5gXG4gICAgcHJpbnRUb0RPTShodG1sLCBcIi5vdXRwdXRcIilcbiAgICBwb3B1bGF0ZVByb2ZpbGUoKTtcbn1cbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9maWxlSFRNTCIsImltcG9ydCBjcmVhdGVFdmVudHMgZnJvbSBcIi4vY3JlYXRlRXZlbnRcIlxuaW1wb3J0IGNyZWF0ZUZyaWVuZHMgZnJvbSBcIi4vY3JlYXRlRnJpZW5kc1wiXG5cbmNvbnN0IHBvcHVsYXRlUHJvZmlsZSA9ICgpID0+IHtcbiAgICBjcmVhdGVGcmllbmRzKCk7XG4gICAgY3JlYXRlRXZlbnRzKCk7XG4gICAgLy8gY3JlYXRlTmV3cygpO1xuICAgIC8vIGNyZWF0ZVRhc2tzKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBvcHVsYXRlUHJvZmlsZVxuXG4iLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuXG5mdW5jdGlvbiBzZWFyY2hVc2VycyhpbnB1dCkge1xuICAgIGxldCB1c2VySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJJZFwiKS52YWx1ZVxuICAgIGxldCB1c2VycyA9IFtdXG4gICAgbGV0IGZyaWVuZHNJZHMgPSBbXVxuICAgIGxldCBub3RGcmllbmRzID0gW11cblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlclNlYXJjaFJlc3VsdHNcIikuaW5uZXJIVE1MID0gXCJcIlxuICAgIHJldHVybiBBUEkuR0VUKFwidXNlcnNcIilcbiAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXJzKSA9PiB7XG4gICAgICAgICAgICB1c2VycyA9IHBhcnNlZFVzZXJzXG4gICAgICAgICAgICByZXR1cm4gQVBJLkdFVChgdXNlcnMvJHt1c2VySWR9Lz9fZW1iZWQ9ZnJpZW5kc2hpcHNgKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocGFyc2VkRnJpZW5kRGF0YSkgPT4ge1xuICAgICAgICAgICAgZnJpZW5kc0lkcyA9IHBhcnNlZEZyaWVuZERhdGEuZnJpZW5kc2hpcHMubWFwKChmcmllbmRzaGlwKSA9PiBmcmllbmRzaGlwLmZyaWVuZElkKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7dXNlcnN9KVxuICAgICAgICAgICAgY29uc29sZS5sb2coe2ZyaWVuZHNJZHN9KVxuICAgICAgICAgICAgbm90RnJpZW5kcyA9IHVzZXJzLm1hcCgodXNlcikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGZyaWVuZHNJZHMuaW5jbHVkZXModXNlci5pZCkgPT09IGZhbHNlICYmIHVzZXIuaWQgIT09IHVzZXJJZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmZpbHRlcihlbGVtZW50ID0+IGVsZW1lbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vdEZyaWVuZHMpXG4gICAgICAgIH0pXG59XG5cbmV4cG9ydCBkZWZhdWx0IHNlYXJjaFVzZXJzIiwiY29uc3QgQVBJID0ge1xuICAgIEdFVDogKGRiQXJyYXlTdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5U3RyaW5nfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfSxcbiAgICBQT1NUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJBcnJheX1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfSxcbiAgICBFRElUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfSxcbiAgICBERUxFVEU6IChkYkFycmF5LCBvYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiZnVuY3Rpb24gcHJpbnRUb0RvbShIVE1MU3RyaW5nLCBET01Mb2NhdGlvbikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7RE9NTG9jYXRpb259YCkuaW5uZXJIVE1MID0gSFRNTFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRG9tIl19
