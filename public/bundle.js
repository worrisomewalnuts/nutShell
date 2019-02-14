(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":5}],2:[function(require,module,exports){
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
    document.querySelector("#eventContainer").addEventListener("click", function () {
      console.log(event.target.id); //if(event.target.id)
    });
  });
};

var _default = createEvents;
exports.default = _default;

},{"../utilities/apiManager":7,"../utilities/printToDOM":8,"./eventHTML":3,"./eventManager":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
            <section id = "friends"></section>
            <section id = "news"></section>
            <section id = "events"></section>
            <section id = "tasks"></section>
            <section id = "chats"></section>
        </article>`;
  (0, _printToDOM.default)(html, ".output");
  (0, _populateProfile.default)();
};

var _default = makeProfileHTML;
exports.default = _default;

},{"../utilities/printToDOM":8,"./populateProfile":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEvent = _interopRequireDefault(require("./createEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  // createFriends();
  (0, _createEvent.default)(); // createNews();
  // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvZXZlbnRIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL2V2ZW50TWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvcG9wdWxhdGVQcm9maWxlLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL3ByaW50VG9ET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0EsOEJBQWdCLENBQWhCOzs7Ozs7Ozs7O0FDREE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFDQSxNQUFNLFlBQVksR0FBRyxNQUFNO0FBQ3ZCLE1BQUksSUFBSSxHQUFHLEVBQVgsQ0FEdUIsQ0FFdkI7O0FBQ0EsRUFBQSxJQUFJLElBQUksb0NBQVIsQ0FIdUIsQ0FLdkI7O0FBQ0EsRUFBQSxJQUFJLElBQUs7O0NBQVQsQ0FOdUIsQ0FTdkI7O0FBQ0Esc0JBQUksR0FBSixDQUFRLGlCQUFSLEVBQTJCLElBQTNCLENBQWdDLFdBQVcsSUFBSTtBQUMzQyxJQUFBLFdBQVcsQ0FBQyxPQUFaLENBQW9CLEtBQUssSUFBSTtBQUN6QixNQUFBLElBQUksSUFBSSwwQkFBVSxLQUFWLENBQVI7QUFDSCxLQUZEO0FBR0EsSUFBQSxJQUFJLElBQUs7O1NBQVQ7QUFHQSw2QkFBVyxJQUFYLEVBQWlCLFNBQWpCO0FBRUEsSUFBQSxRQUFRLENBQUMsYUFBVCxDQUF1QixjQUF2QixFQUF1QyxnQkFBdkMsQ0FBd0QsT0FBeEQsRUFBaUUsWUFBWTtBQUN6RSwwQkFBSSxJQUFKLENBQVMsUUFBVCxFQUFtQiw0QkFBbkIsRUFBcUMsSUFB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QjtBQUN2QixXQUFPLEtBQUssQ0FBRSx5QkFBd0IsT0FBUSxJQUFHLE1BQU0sQ0FBQyxFQUFHLEVBQS9DLEVBQWtEO0FBQzFELE1BQUEsTUFBTSxFQUFFLEtBRGtEO0FBRTFELE1BQUEsT0FBTyxFQUFFO0FBQ0wsd0JBQWdCO0FBRFgsT0FGaUQ7QUFLMUQsTUFBQSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQUwsQ0FBZSxNQUFmO0FBTG9ELEtBQWxELENBQUwsQ0FPRixJQVBFLENBT0csR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFKLEVBUFYsQ0FBUDtBQVFILEdBeEJPO0FBeUJSLEVBQUEsTUFBTSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDekIsV0FBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsSUFBRyxNQUFNLENBQUMsRUFBRyxFQUEvQyxFQUFrRDtBQUMxRCxNQUFBLE1BQU0sRUFBRTtBQURrRCxLQUFsRCxDQUFMLENBR04sSUFITSxDQUdELFFBQVEsSUFBSSxRQUFRLENBQUMsSUFBVCxFQUhYLENBQVA7QUFJSDtBQTlCTyxDQUFaO2VBaUNlLEc7Ozs7Ozs7Ozs7O0FDakNmLFNBQVMsVUFBVCxDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxFQUE2QztBQUN6QyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXdCLEdBQUUsV0FBWSxFQUF0QyxFQUF5QyxTQUF6QyxHQUFxRCxVQUFyRDtBQUNIOztlQUVjLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbWFrZVByb2ZpbGVIVE1MIGZyb20gXCIuL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MXCJcbm1ha2VQcm9maWxlSFRNTCgxKVxuIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCB7IGV2ZW50SHRtbCwgY3JlYXRlQWRkRXZlbnRIdG1sIH0gZnJvbSBcIi4vZXZlbnRIVE1MXCJcbmltcG9ydCBjcmVhdGVOZXdFdmVudCBmcm9tIFwiLi9ldmVudE1hbmFnZXJcIlxuY29uc3QgY3JlYXRlRXZlbnRzID0gKCkgPT4ge1xuICAgIGxldCBodG1sID0gXCJcIlxuICAgIC8vY3JlYXRlcyBIdG1sIHRvIHRoYXQgaXMgdXNlZCB0byBhZGQgYSBuZXcgZXZlbnRcbiAgICBodG1sICs9IGNyZWF0ZUFkZEV2ZW50SHRtbCgpXG5cbiAgICAvL21ha2UgYSBzZWN0aW9uIGNvbnRhaW5lciBmb3IgYWxsIGV2ZW50c1xuICAgIGh0bWwgKz0gYFxuPHNlY3Rpb24gaWQ9XCJldmVudHNDb250YWluZXJcIj5cbmBcbiAgICAvL3RvZG8gd2Ugd2lsbCBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBhcmUgdXNpbmcgb3VyIGhpZGRlbiBmaWVsZCB1c2VyIGlkIGhlcmVcbiAgICBBUEkuR0VUKFwiZXZlbnRzP3VzZXJJZD0xXCIpLnRoZW4ocGFyc2VkRXZlbnQgPT4ge1xuICAgICAgICBwYXJzZWRFdmVudC5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGh0bWwgKz0gZXZlbnRIdG1sKGV2ZW50KVxuICAgICAgICB9KVxuICAgICAgICBodG1sICs9IGBcbiAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICBgXG4gICAgICAgIHByaW50VG9Eb20oaHRtbCwgXCIjZXZlbnRzXCIpXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdWJtaXRFdmVudFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgQVBJLlBPU1QoXCJldmVudHNcIiwgY3JlYXRlTmV3RXZlbnQoKSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgY3JlYXRlRXZlbnRzKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudENvbnRhaW5lclwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcblxuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQpXG4gICAgICAgICAgICAvL2lmKGV2ZW50LnRhcmdldC5pZClcbiAgICAgICAgfSlcbiAgICB9KVxufVxuXG5cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXZlbnRzIiwiXG5jb25zdCBldmVudEh0bWwgPSAoZXZlbnQpID0+e1xuICAgIHJldHVybiBgXG4gICAgPHA+LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tPC9wPlxuICAgIDxzZWN0aW9uIGlkPVwic2VjdGlvbi0tJHtldmVudC5pZH1cIj5cbiAgICA8cD4ke2V2ZW50LmV2ZW50TmFtZX08L3A+XG4gICAgPHA+JHtldmVudC5ldmVudExvY2F0aW9ufTwvcD5cbiAgICA8cD4ke2V2ZW50LmV2ZW50RGF0ZX08L3A+XG4gICAgPGJ1dHRvbiBpZD1cImVkaXQtLSR7ZXZlbnQuaWR9XCI+RWRpdDwvYnV0dG9uPlxuICAgIDxidXR0b24gaWQ9XCJkZWxldGUtLSR7ZXZlbnQuaWR9XCI+RGVsZXRlPC9idXR0b24+XG4gICAgPC9zZWN0aW9uPlxuICAgIDxwPi0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLTwvcD5cbiAgICBgXG59XG5cbmNvbnN0IGNyZWF0ZUFkZEV2ZW50SHRtbD0oKT0+e1xuICAgIHJldHVybiBgXG4gICAgPHNlY3Rpb24gaWQ9XCJhZGRFdmVudFNlY3Rpb25cIj5cbiAgICA8bGFiZWw+RXZlbnQgTmFtZTogPC9sYWJlbD5cbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImV2ZW50TmFtZUlucHV0XCI+PC9pbnB1dD5cbiAgICA8bGFiZWw+RXZlbnQgTG9jYXRpb246IDwvbGFiZWw+XG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJldmVudExvY2F0aW9uSW5wdXRcIj48L2lucHV0PlxuICAgIDxsYWJlbD5FdmVudCBEYXRlOiA8L2xhYmVsPlxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGlkPVwiZXZlbnREYXRlSW5wdXRcIj48L2lucHV0PlxuICAgIDxidXR0b24gaWQ9XCJzdWJtaXRFdmVudFwiPnN1Ym1pdDwvYnV0dG9uPlxuICAgIDwvc2VjdGlvbj5cbiAgICBgXG59XG5leHBvcnQge2V2ZW50SHRtbCwgY3JlYXRlQWRkRXZlbnRIdG1sfSIsImNsYXNzIEV2ZW50IHtcbiAgICBjb25zdHJ1Y3Rvcih1c2VySWQsIG5hbWUsIGxvY2F0aW9uLCBkYXRlKSB7XG4gICAgICAgIHRoaXMudXNlcklkID0gdXNlcklkXG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gbmFtZSxcbiAgICAgICAgdGhpcy5ldmVudExvY2F0aW9uID0gbG9jYXRpb24sXG4gICAgICAgIHRoaXMuZXZlbnREYXRlID0gZGF0ZVxuICAgIH1cbn1cblxuY29uc3QgY3JlYXRlTmV3RXZlbnQ9KCk9PntcbiAgICAvL3RvZG8gd2lsbCBuZWVkIHRvIGdldCB1c2VySWQgZnJvbSBoaWRkZW4gZmllbGRcbiAgICBjb25zdCB1c2VySWQgPSAxO1xuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZXZlbnROYW1lSW5wdXRcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNldmVudExvY2F0aW9uSW5wdXRcIikudmFsdWVcbiAgICAgICAgICAgIGNvbnN0IGRhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2V2ZW50RGF0ZUlucHV0XCIpLnZhbHVlXG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgRXZlbnQodXNlcklkLCBuYW1lLCBsb2NhdGlvbiwgZGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gZXZlbnRcblxufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTmV3RXZlbnQiLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxuY29uc3QgbWFrZVByb2ZpbGVIVE1MID0gKHVzZXJJZCkgPT4ge1xuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxuICAgICAgICAgICAgPGltZz48L2ltZz5cbiAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwidXNlcklkXCIgdHlwZSA9IFwiSGlkZGVuXCIgdmFsdWUgPSAke3VzZXJJZH0+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJmcmllbmRzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcIm5ld3NcIj48L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZXZlbnRzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRhc2tzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImNoYXRzXCI+PC9zZWN0aW9uPlxuICAgICAgICA8L2FydGljbGU+YFxuICAgIHByaW50VG9ET00oaHRtbCwgXCIub3V0cHV0XCIpXG4gICAgcG9wdWxhdGVQcm9maWxlKCk7XG59XG5cblxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2ZpbGVIVE1MIiwiaW1wb3J0IGNyZWF0ZUV2ZW50cyBmcm9tIFwiLi9jcmVhdGVFdmVudFwiXG5jb25zdCBwb3B1bGF0ZVByb2ZpbGUgPSAoKSA9PiB7XG4gICAvLyBjcmVhdGVGcmllbmRzKCk7XG4gICAgY3JlYXRlRXZlbnRzKCk7XG4gICAvLyBjcmVhdGVOZXdzKCk7XG4gICAvLyBjcmVhdGVUYXNrcygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcblxuIiwiY29uc3QgQVBJID0ge1xuICAgIEdFVDogKGRiQXJyYXlTdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5U3RyaW5nfWApXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfSxcbiAgICBQT1NUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJBcnJheX1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfSxcbiAgICBFRElUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxuICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXG4gICAgfSxcbiAgICBERUxFVEU6IChkYkFycmF5LCBvYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiREVMRVRFXCJcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQVBJIiwiZnVuY3Rpb24gcHJpbnRUb0RvbShIVE1MU3RyaW5nLCBET01Mb2NhdGlvbikge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7RE9NTG9jYXRpb259YCkuaW5uZXJIVE1MID0gSFRNTFN0cmluZ1xufVxuXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRG9tIl19
