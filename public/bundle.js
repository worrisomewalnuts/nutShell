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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9mcmllbmRIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL21ha2VQcm9maWxlSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9wb3B1bGF0ZVByb2ZpbGUuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvc2VhcmNoVXNlcnMuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvcHJpbnRUb0RPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQSw4QkFBZ0IsQ0FBaEI7Ozs7Ozs7Ozs7QUNEQSxNQUFNLFlBQVksR0FBQyxNQUFJO0FBQ3ZCLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0MsQ0FGRDs7ZUFHZSxZOzs7Ozs7Ozs7OztBQ0hmOztBQUNBOztBQUNBOzs7O0FBRUEsU0FBUyxhQUFULEdBQXlCO0FBQ3JCLE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLEtBQS9DO0FBQ0EsTUFBSSxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJLFNBQVMsR0FBRyxFQUFoQjtBQUNBLE1BQUksVUFBVSxHQUFHLEVBQWpCOztBQUNBLHNCQUFJLEdBQUosQ0FBUyxTQUFRLE1BQU8sc0JBQXhCLEVBQ0ssSUFETCxDQUNXLGdCQUFELElBQXNCO0FBQ3hCLElBQUEsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLEdBQTdCLENBQWtDLFVBQUQsSUFBZ0IsVUFBVSxDQUFDLFFBQTVELENBQWQ7QUFDQSxXQUFPLG9CQUFJLEdBQUosQ0FBUSxP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RCxNQUFBLE1BQU0sRUFBRSxLQURrRDtBQUUxRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmlEO0FBSzFELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUxvRCxLQUFsRCxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSCxHQXhCTztBQXlCUixFQUFBLE1BQU0sRUFBRSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3pCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLElBQUcsTUFBTSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXHJcbm1ha2VQcm9maWxlSFRNTCgxKVxyXG4iLCJjb25zdCBjcmVhdGVFdmVudHM9KCk9PntcclxuY29uc29sZS5sb2coXCJoaVwiKVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUV2ZW50cyIsImltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcclxuaW1wb3J0IGZyaWVuZEhUTUwgZnJvbSBcIi4vZnJpZW5kSFRNTFwiXHJcbmltcG9ydCBzZWFyY2hVc2VycyBmcm9tIFwiLi9zZWFyY2hVc2Vyc1wiO1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlRnJpZW5kcygpIHtcclxuICAgIGxldCB1c2VySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJJZFwiKS52YWx1ZVxyXG4gICAgbGV0IGZyaWVuZEFycmF5ID0gW11cclxuICAgIGxldCB1c2VyQXJyYXkgPSBbXVxyXG4gICAgbGV0IGZyaWVuZExpc3QgPSBbXVxyXG4gICAgQVBJLkdFVChgdXNlcnMvJHt1c2VySWR9Lz9fZW1iZWQ9ZnJpZW5kc2hpcHNgKVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZEFycmF5ID0gcGFyc2VkRnJpZW5kRGF0YS5mcmllbmRzaGlwcy5tYXAoKGZyaWVuZHNoaXApID0+IGZyaWVuZHNoaXAuZnJpZW5kSWQpXHJcbiAgICAgICAgICAgIHJldHVybiBBUEkuR0VUKFwidXNlcnNcIilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyQXJyYXkgPSBwYXJzZWRVc2VyRGF0YVxyXG4gICAgICAgICAgICBmcmllbmRMaXN0ID0gZnJpZW5kQXJyYXkubWFwKChmcmllbmRJZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyaWVuZElkID0gdXNlckFycmF5LmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmlkID09PSBmcmllbmRJZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlci51c2VyTmFtZVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIHJldHVybiBmcmllbmRMaXN0XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbigoZnJpZW5kTGlzdCkgPT4gZnJpZW5kSFRNTChmcmllbmRMaXN0KSlcclxuICAgICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlclNlYXJjaEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hVc2Vyc0lucHV0XCIpLnZhbHVlXHJcbiAgICAgICAgICAgICAgICBzZWFyY2hVc2VycyhpbnB1dClcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGcmllbmRzIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcblxyXG5mdW5jdGlvbiBmcmllbmRIVE1MKGZyaWVuZExpc3QpIHtcclxuICAgIGxldCBmcmllbmRIVE1MID0gYFxyXG4gICAgPGZpZWxkc2V0IGlkPVwic2VhcmNoVXNlcnNcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoVXNlcnNJbnB1dFwiIGNsYXNzPVwic2VhcmNoVXNlcnNJbnB1dFwiPlNlYXJjaCBGb3IgTmV3IFVzZXJzIFRvIEZvbGxvdzwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFVzZXJzSW5wdXRcIiBpZD1cInNlYXJjaFVzZXJzSW5wdXRcIj5cclxuICAgICAgICA8c2VjdGlvbiBpZD1cInVzZXJTZWFyY2hSZXN1bHRzXCI+PC9zZWN0aW9uPlxyXG4gICAgICAgIDxidXR0b24gaWQ9XCJ1c2VyU2VhcmNoQnV0dG9uXCI+U2VhcmNoIEZvciBVc2VyczwvYnV0dG9uPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgIDxoMSBpZD0nRnJpZW5kTGlzdCc+RnJpZW5kczwvaDE+XHJcbiAgICBgXHJcbiAgICBmcmllbmRMaXN0Lm1hcCgoZnJpZW5kT2JqKSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIVE1MID0gYFxyXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZnJpZW5kLS0ke2ZyaWVuZE9ialswXS5pZH1cIlxyXG4gICAgICAgIDxkaXYgaWQ9XCIjJHtmcmllbmRPYmpbMF0uaWR9XCI+JHtmcmllbmRPYmpbMF0udXNlck5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtmcmllbmRPYmpbMF0uaWR9XCI+VW5mb2xsb3c8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGZyaWVuZEhUTUwgKz0gY3VycmVudEhUTUxcclxuICAgIH0pXHJcbiAgICBwcmludFRvRG9tKGZyaWVuZEhUTUwsXCIjZnJpZW5kc1wiKVxyXG4gICAgcmV0dXJuXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZyaWVuZEhUTUwiLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxyXG5pbXBvcnQgcG9wdWxhdGVQcm9maWxlIGZyb20gXCIuL3BvcHVsYXRlUHJvZmlsZVwiXHJcbmNvbnN0IG1ha2VQcm9maWxlSFRNTCA9ICh1c2VySWQpID0+IHtcclxuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxyXG4gICAgICAgICAgICA8aW1nPjwvaW1nPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQgPSBcInVzZXJJZFwiIHR5cGUgPSBcIkhpZGRlblwiIHZhbHVlID0gJHt1c2VySWR9PlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZnJpZW5kc1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJuZXdzXCI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImV2ZW50c1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJ0YXNrc1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJjaGF0c1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9hcnRpY2xlPmBcclxuICAgIHByaW50VG9ET00oaHRtbCwgXCIub3V0cHV0XCIpXHJcbiAgICBwb3B1bGF0ZVByb2ZpbGUoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2ZpbGVIVE1MIiwiaW1wb3J0IGNyZWF0ZUV2ZW50cyBmcm9tIFwiLi9jcmVhdGVFdmVudFwiXHJcbmltcG9ydCBjcmVhdGVGcmllbmRzIGZyb20gXCIuL2NyZWF0ZUZyaWVuZHNcIlxyXG5cclxuY29uc3QgcG9wdWxhdGVQcm9maWxlID0gKCkgPT4ge1xyXG4gICAgY3JlYXRlRnJpZW5kcygpO1xyXG4gICAgLy8gY3JlYXRlRXZlbnRzKCk7XHJcbiAgICAvLyBjcmVhdGVOZXdzKCk7XHJcbiAgICAvLyBjcmVhdGVUYXNrcygpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcclxuXHJcbiIsImltcG9ydCBwcmludFRvRE9NIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiXHJcbmltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcclxuXHJcbmZ1bmN0aW9uIHNlYXJjaFVzZXJzKGlucHV0KSB7XHJcbiAgICBsZXQgdXNlcklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VySWRcIikudmFsdWVcclxuICAgIGxldCB1c2VycyA9IFtdXHJcbiAgICBsZXQgZnJpZW5kc0lkcyA9IFtdXHJcbiAgICBsZXQgbm90RnJpZW5kcyA9IFtdXHJcblxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyU2VhcmNoUmVzdWx0c1wiKS5pbm5lckhUTUwgPSBcIlwiXHJcbiAgICByZXR1cm4gQVBJLkdFVChcInVzZXJzXCIpXHJcbiAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXJzKSA9PiB7XHJcbiAgICAgICAgICAgIHVzZXJzID0gcGFyc2VkVXNlcnNcclxuICAgICAgICAgICAgcmV0dXJuIEFQSS5HRVQoYHVzZXJzLyR7dXNlcklkfS8/X2VtYmVkPWZyaWVuZHNoaXBzYClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNJZHMgPSBwYXJzZWRGcmllbmREYXRhLmZyaWVuZHNoaXBzLm1hcCgoZnJpZW5kc2hpcCkgPT4gZnJpZW5kc2hpcC5mcmllbmRJZClcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coe3VzZXJzfSlcclxuICAgICAgICAgICAgY29uc29sZS5sb2coe2ZyaWVuZHNJZHN9KVxyXG4gICAgICAgICAgICBub3RGcmllbmRzID0gdXNlcnMubWFwKCh1c2VyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZihmcmllbmRzSWRzLmluY2x1ZGVzKHVzZXIuaWQpID09PSBmYWxzZSAmJiB1c2VyLmlkICE9PSB1c2VySWQpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXNlclxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5maWx0ZXIoZWxlbWVudCA9PiBlbGVtZW50ICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG5vdEZyaWVuZHMpXHJcbiAgICAgICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgc2VhcmNoVXNlcnMiLCJjb25zdCBBUEkgPSB7XHJcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5U3RyaW5nfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBQT1NUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIEVESVQ6IChkYkFycmF5LCBvYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJmdW5jdGlvbiBwcmludFRvRG9tKEhUTUxTdHJpbmcsIERPTUxvY2F0aW9uKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
