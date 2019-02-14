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

const createEvents = () => {
  console.log("hi");
};

var _default = createEvents;
exports.default = _default;

},{}],3:[function(require,module,exports){
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

},{"../utilities/apiManager":8,"./friendHTML":4,"./searchUsers":7}],4:[function(require,module,exports){
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

},{"../utilities/printToDOM":9}],5:[function(require,module,exports){
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

},{"../utilities/printToDOM":9,"./populateProfile":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEvent = _interopRequireDefault(require("./createEvent"));

var _createFriends = _interopRequireDefault(require("./createFriends"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  (0, _createFriends.default)(); // createEvents();
  // createNews();
  // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2,"./createFriends":3}],7:[function(require,module,exports){
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

},{"../utilities/apiManager":8,"../utilities/printToDOM":9}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9mcmllbmRIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL21ha2VQcm9maWxlSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9wb3B1bGF0ZVByb2ZpbGUuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvc2VhcmNoVXNlcnMuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvcHJpbnRUb0RPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQSw4QkFBZ0IsQ0FBaEI7Ozs7Ozs7Ozs7QUNEQSxNQUFNLFlBQVksR0FBQyxNQUFJO0FBQ3ZCLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0MsQ0FGRDs7ZUFHZSxZOzs7Ozs7Ozs7OztBQ0hmOztBQUNBOztBQUNBOzs7O0FBRUEsU0FBUyxhQUFULEdBQXlCO0FBQ3JCLE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLEtBQS9DO0FBQ0EsTUFBSSxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJLFNBQVMsR0FBRyxFQUFoQjtBQUNBLE1BQUksVUFBVSxHQUFHLEVBQWpCOztBQUNBLHNCQUFJLEdBQUosQ0FBUyxTQUFRLE1BQU8sc0JBQXhCLEVBQ0ssSUFETCxDQUNXLGdCQUFELElBQXNCO0FBQ3hCLElBQUEsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLEdBQTdCLENBQWtDLFVBQUQsSUFBZ0IsVUFBVSxDQUFDLFFBQTVELENBQWQ7QUFDQSxXQUFPLG9CQUFJLEdBQUosQ0FBUSxP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RCxNQUFBLE1BQU0sRUFBRSxLQURrRDtBQUUxRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmlEO0FBSzFELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUxvRCxLQUFsRCxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSCxHQXhCTztBQXlCUixFQUFBLE1BQU0sRUFBRSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3pCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLElBQUcsTUFBTSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXG5tYWtlUHJvZmlsZUhUTUwoMSlcbiIsImNvbnN0IGNyZWF0ZUV2ZW50cz0oKT0+e1xuY29uc29sZS5sb2coXCJoaVwiKVxufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXZlbnRzIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuaW1wb3J0IGZyaWVuZEhUTUwgZnJvbSBcIi4vZnJpZW5kSFRNTFwiXG5pbXBvcnQgc2VhcmNoVXNlcnMgZnJvbSBcIi4vc2VhcmNoVXNlcnNcIjtcblxuZnVuY3Rpb24gY3JlYXRlRnJpZW5kcygpIHtcbiAgICBsZXQgdXNlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VySWRcIikudmFsdWVcbiAgICBsZXQgZnJpZW5kQXJyYXkgPSBbXVxuICAgIGxldCB1c2VyQXJyYXkgPSBbXVxuICAgIGxldCBmcmllbmRMaXN0ID0gW11cbiAgICBBUEkuR0VUKGB1c2Vycy8ke3VzZXJJZH0vP19lbWJlZD1mcmllbmRzaGlwc2ApXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XG4gICAgICAgICAgICBmcmllbmRBcnJheSA9IHBhcnNlZEZyaWVuZERhdGEuZnJpZW5kc2hpcHMubWFwKChmcmllbmRzaGlwKSA9PiBmcmllbmRzaGlwLmZyaWVuZElkKVxuICAgICAgICAgICAgcmV0dXJuIEFQSS5HRVQoXCJ1c2Vyc1wiKVxuICAgICAgICB9KVxuICAgICAgICAudGhlbigocGFyc2VkVXNlckRhdGEpID0+IHtcbiAgICAgICAgICAgIHVzZXJBcnJheSA9IHBhcnNlZFVzZXJEYXRhXG4gICAgICAgICAgICBmcmllbmRMaXN0ID0gZnJpZW5kQXJyYXkubWFwKChmcmllbmRJZCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcmllbmRJZCA9IHVzZXJBcnJheS5maWx0ZXIoKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZXIuaWQgPT09IGZyaWVuZElkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci51c2VyTmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gZnJpZW5kTGlzdFxuICAgICAgICB9KVxuICAgICAgICAudGhlbigoZnJpZW5kTGlzdCkgPT4gZnJpZW5kSFRNTChmcmllbmRMaXN0KSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyU2VhcmNoQnV0dG9uXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hVc2Vyc0lucHV0XCIpLnZhbHVlXG4gICAgICAgICAgICAgICAgc2VhcmNoVXNlcnMoaW5wdXQpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGcmllbmRzIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XG5cbmZ1bmN0aW9uIGZyaWVuZEhUTUwoZnJpZW5kTGlzdCkge1xuICAgIGxldCBmcmllbmRIVE1MID0gYFxuICAgIDxmaWVsZHNldCBpZD1cInNlYXJjaFVzZXJzXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hVc2Vyc0lucHV0XCIgY2xhc3M9XCJzZWFyY2hVc2Vyc0lucHV0XCI+U2VhcmNoIEZvciBOZXcgVXNlcnMgVG8gRm9sbG93PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFVzZXJzSW5wdXRcIiBpZD1cInNlYXJjaFVzZXJzSW5wdXRcIj5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJ1c2VyU2VhcmNoUmVzdWx0c1wiPjwvc2VjdGlvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cInVzZXJTZWFyY2hCdXR0b25cIj5TZWFyY2ggRm9yIFVzZXJzPC9idXR0b24+XG4gICAgPC9maWVsZHNldD5cbiAgICA8aDEgaWQ9J0ZyaWVuZExpc3QnPkZyaWVuZHM8L2gxPlxuICAgIGBcbiAgICBmcmllbmRMaXN0Lm1hcCgoZnJpZW5kT2JqKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50SFRNTCA9IGBcbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJmcmllbmQtLSR7ZnJpZW5kT2JqWzBdLmlkfVwiXG4gICAgICAgIDxkaXYgaWQ9XCIjJHtmcmllbmRPYmpbMF0uaWR9XCI+JHtmcmllbmRPYmpbMF0udXNlck5hbWV9PC9kaXY+XG4gICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGUtLSR7ZnJpZW5kT2JqWzBdLmlkfVwiPlVuZm9sbG93PC9idXR0b24+XG4gICAgICAgIGBcbiAgICAgICAgcmV0dXJuIGZyaWVuZEhUTUwgKz0gY3VycmVudEhUTUxcbiAgICB9KVxuICAgIHByaW50VG9Eb20oZnJpZW5kSFRNTCxcIiNmcmllbmRzXCIpXG4gICAgcmV0dXJuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZyaWVuZEhUTUwiLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxuY29uc3QgbWFrZVByb2ZpbGVIVE1MID0gKHVzZXJJZCkgPT4ge1xuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxuICAgICAgICAgICAgPGltZz48L2ltZz5cbiAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwidXNlcklkXCIgdHlwZSA9IFwiSGlkZGVuXCIgdmFsdWUgPSAke3VzZXJJZH0+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJmcmllbmRzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwibmV3c1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImV2ZW50c1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRhc2tzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiY2hhdHNcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9hcnRpY2xlPmBcbiAgICBwcmludFRvRE9NKGh0bWwsIFwiLm91dHB1dFwiKVxuICAgIHBvcHVsYXRlUHJvZmlsZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZmlsZUhUTUwiLCJpbXBvcnQgY3JlYXRlRXZlbnRzIGZyb20gXCIuL2NyZWF0ZUV2ZW50XCJcbmltcG9ydCBjcmVhdGVGcmllbmRzIGZyb20gXCIuL2NyZWF0ZUZyaWVuZHNcIlxuXG5jb25zdCBwb3B1bGF0ZVByb2ZpbGUgPSAoKSA9PiB7XG4gICAgY3JlYXRlRnJpZW5kcygpO1xuICAgIC8vIGNyZWF0ZUV2ZW50cygpO1xuICAgIC8vIGNyZWF0ZU5ld3MoKTtcbiAgICAvLyBjcmVhdGVUYXNrcygpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcblxuIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcblxuZnVuY3Rpb24gc2VhcmNoVXNlcnMoaW5wdXQpIHtcbiAgICBsZXQgdXNlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VySWRcIikudmFsdWVcbiAgICBsZXQgdXNlcnMgPSBbXVxuICAgIGxldCBmcmllbmRzSWRzID0gW11cbiAgICBsZXQgbm90RnJpZW5kcyA9IFtdXG5cbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJTZWFyY2hSZXN1bHRzXCIpLmlubmVySFRNTCA9IFwiXCJcbiAgICByZXR1cm4gQVBJLkdFVChcInVzZXJzXCIpXG4gICAgICAgIC50aGVuKChwYXJzZWRVc2VycykgPT4ge1xuICAgICAgICAgICAgdXNlcnMgPSBwYXJzZWRVc2Vyc1xuICAgICAgICAgICAgcmV0dXJuIEFQSS5HRVQoYHVzZXJzLyR7dXNlcklkfS8/X2VtYmVkPWZyaWVuZHNoaXBzYClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHBhcnNlZEZyaWVuZERhdGEpID0+IHtcbiAgICAgICAgICAgIGZyaWVuZHNJZHMgPSBwYXJzZWRGcmllbmREYXRhLmZyaWVuZHNoaXBzLm1hcCgoZnJpZW5kc2hpcCkgPT4gZnJpZW5kc2hpcC5mcmllbmRJZClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coe3VzZXJzfSlcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHtmcmllbmRzSWRzfSlcbiAgICAgICAgICAgIG5vdEZyaWVuZHMgPSB1c2Vycy5tYXAoKHVzZXIpID0+IHtcbiAgICAgICAgICAgICAgICBpZihmcmllbmRzSWRzLmluY2x1ZGVzKHVzZXIuaWQpID09PSBmYWxzZSAmJiB1c2VyLmlkICE9PSB1c2VySWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhub3RGcmllbmRzKVxuICAgICAgICB9KVxufVxuXG5leHBvcnQgZGVmYXVsdCBzZWFyY2hVc2VycyIsImNvbnN0IEFQSSA9IHtcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJBcnJheVN0cmluZ31gKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgUE9TVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXl9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgRURJVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH0sXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImZ1bmN0aW9uIHByaW50VG9Eb20oSFRNTFN0cmluZywgRE9NTG9jYXRpb24pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
