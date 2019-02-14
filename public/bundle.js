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
  }).then(friendList => (0, _friendHTML.default)(friendList));
}

var _default = createFriends;
exports.default = _default;

},{"../utilities/apiManager":7,"./friendHTML":4}],4:[function(require,module,exports){
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
}

var _default = friendHTML;
exports.default = _default;

},{"../utilities/printToDOM":8}],5:[function(require,module,exports){
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

},{"../utilities/printToDOM":8,"./populateProfile":6}],6:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9mcmllbmRIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL21ha2VQcm9maWxlSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9wb3B1bGF0ZVByb2ZpbGUuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9hcGlNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvcHJpbnRUb0RPTS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7QUFDQSw4QkFBZ0IsQ0FBaEI7Ozs7Ozs7Ozs7QUNEQSxNQUFNLFlBQVksR0FBQyxNQUFJO0FBQ3ZCLEVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0MsQ0FGRDs7ZUFHZSxZOzs7Ozs7Ozs7OztBQ0hmOztBQUNBOzs7O0FBRUEsU0FBUyxhQUFULEdBQXlCO0FBQ3JCLE1BQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLEtBQS9DO0FBQ0EsTUFBSSxXQUFXLEdBQUcsRUFBbEI7QUFDQSxNQUFJLFNBQVMsR0FBRyxFQUFoQjtBQUNBLE1BQUksVUFBVSxHQUFHLEVBQWpCOztBQUNBLHNCQUFJLEdBQUosQ0FBUyxTQUFRLE1BQU8sc0JBQXhCLEVBQ0ssSUFETCxDQUNXLGdCQUFELElBQXNCO0FBQ3hCLElBQUEsV0FBVyxHQUFHLGdCQUFnQixDQUFDLFdBQWpCLENBQTZCLEdBQTdCLENBQWtDLFVBQUQsSUFBZ0IsVUFBVSxDQUFDLFFBQTVELENBQWQ7QUFDQSxXQUFPLG9CQUFJLEdBQUosQ0FBUSxPQUFSLENBQVA7QUFDSCxHQUpMLEVBS0ssSUFMTCxDQUtXLGNBQUQsSUFB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QU0sQ0FBQyxFQUFHLEVBQS9DLEVBQWtEO0FBQzFELE1BQUEsTUFBTSxFQUFFO0FBRGtELEtBQWxELENBQUwsQ0FHTixJQUhNLENBR0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBSFgsQ0FBUDtBQUlIO0FBOUJPLENBQVo7ZUFpQ2UsRzs7Ozs7Ozs7Ozs7QUNqQ2YsU0FBUyxVQUFULENBQW9CLFVBQXBCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQ3pDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsR0FBRSxXQUFZLEVBQXRDLEVBQXlDLFNBQXpDLEdBQXFELFVBQXJEO0FBQ0g7O2VBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBtYWtlUHJvZmlsZUhUTUwgZnJvbSBcIi4vcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUxcIlxyXG5tYWtlUHJvZmlsZUhUTUwoMSlcclxuIiwiY29uc3QgY3JlYXRlRXZlbnRzPSgpPT57XHJcbmNvbnNvbGUubG9nKFwiaGlcIilcclxufVxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudHMiLCJpbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiXHJcbmltcG9ydCBmcmllbmRIVE1MIGZyb20gXCIuL2ZyaWVuZEhUTUxcIlxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRnJpZW5kcygpIHtcclxuICAgIGxldCB1c2VySWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJJZFwiKS52YWx1ZVxyXG4gICAgbGV0IGZyaWVuZEFycmF5ID0gW11cclxuICAgIGxldCB1c2VyQXJyYXkgPSBbXVxyXG4gICAgbGV0IGZyaWVuZExpc3QgPSBbXVxyXG4gICAgQVBJLkdFVChgdXNlcnMvJHt1c2VySWR9Lz9fZW1iZWQ9ZnJpZW5kc2hpcHNgKVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZEFycmF5ID0gcGFyc2VkRnJpZW5kRGF0YS5mcmllbmRzaGlwcy5tYXAoKGZyaWVuZHNoaXApID0+IGZyaWVuZHNoaXAuZnJpZW5kSWQpXHJcbiAgICAgICAgICAgIHJldHVybiBBUEkuR0VUKFwidXNlcnNcIilcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChwYXJzZWRVc2VyRGF0YSkgPT4ge1xyXG4gICAgICAgICAgICB1c2VyQXJyYXkgPSBwYXJzZWRVc2VyRGF0YVxyXG4gICAgICAgICAgICBmcmllbmRMaXN0ID0gZnJpZW5kQXJyYXkubWFwKChmcmllbmRJZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyaWVuZElkID0gdXNlckFycmF5LmZpbHRlcigodXNlcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVzZXIuaWQgPT09IGZyaWVuZElkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyLnVzZXJOYW1lXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgcmV0dXJuIGZyaWVuZExpc3RcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKChmcmllbmRMaXN0KSA9PiBmcmllbmRIVE1MKGZyaWVuZExpc3QpKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVGcmllbmRzIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcblxyXG5mdW5jdGlvbiBmcmllbmRIVE1MKGZyaWVuZExpc3QpIHtcclxuICAgIGxldCBmcmllbmRIVE1MID0gYFxyXG4gICAgPGZpZWxkc2V0IGlkPVwic2VhcmNoVXNlcnNcIj5cclxuICAgICAgICA8bGFiZWwgZm9yPVwic2VhcmNoVXNlcnNJbnB1dFwiIGNsYXNzPVwic2VhcmNoVXNlcnNJbnB1dFwiPlNlYXJjaCBGb3IgTmV3IFVzZXJzIFRvIEZvbGxvdzwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFVzZXJzSW5wdXRcIiBpZD1cInNlYXJjaFVzZXJzSW5wdXRcIj5cclxuICAgICAgICA8c2VjdGlvbiBpZD1cInVzZXJTZWFyY2hSZXN1bHRzXCI+PC9zZWN0aW9uPlxyXG4gICAgPC9maWVsZHNldD5cclxuICAgIDxoMSBpZD0nRnJpZW5kTGlzdCc+RnJpZW5kczwvaDE+XHJcbiAgICBgXHJcbiAgICBmcmllbmRMaXN0Lm1hcCgoZnJpZW5kT2JqKSA9PiB7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIVE1MID0gYFxyXG4gICAgICAgIDxzZWN0aW9uIGlkPVwiZnJpZW5kLS0ke2ZyaWVuZE9ialswXS5pZH1cIlxyXG4gICAgICAgIDxkaXYgaWQ9XCIjJHtmcmllbmRPYmpbMF0uaWR9XCI+JHtmcmllbmRPYmpbMF0udXNlck5hbWV9PC9kaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZS0tJHtmcmllbmRPYmpbMF0uaWR9XCI+VW5mb2xsb3c8L2J1dHRvbj5cclxuICAgICAgICBgXHJcbiAgICAgICAgcmV0dXJuIGZyaWVuZEhUTUwgKz0gY3VycmVudEhUTUxcclxuICAgIH0pXHJcbiAgICBwcmludFRvRG9tKGZyaWVuZEhUTUwsXCIjZnJpZW5kc1wiKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmcmllbmRIVE1MIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcclxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxyXG5jb25zdCBtYWtlUHJvZmlsZUhUTUwgPSAodXNlcklkKSA9PiB7XHJcbiAgICBjb25zdCBodG1sID0gYCA8YXJ0aWNsZT5cclxuICAgICAgICAgICAgPGltZz48L2ltZz5cclxuICAgICAgICAgICAgPGlucHV0IGlkID0gXCJ1c2VySWRcIiB0eXBlID0gXCJIaWRkZW5cIiB2YWx1ZSA9ICR7dXNlcklkfT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRpdGxlXCI+IE51dFNoZWxsXHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImZyaWVuZHNcIj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwibmV3c1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJldmVudHNcIj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGFza3NcIj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiY2hhdHNcIj5cclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgIDwvYXJ0aWNsZT5gXHJcbiAgICBwcmludFRvRE9NKGh0bWwsIFwiLm91dHB1dFwiKVxyXG4gICAgcG9wdWxhdGVQcm9maWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9maWxlSFRNTCIsImltcG9ydCBjcmVhdGVFdmVudHMgZnJvbSBcIi4vY3JlYXRlRXZlbnRcIlxyXG5pbXBvcnQgY3JlYXRlRnJpZW5kcyBmcm9tIFwiLi9jcmVhdGVGcmllbmRzXCJcclxuXHJcbmNvbnN0IHBvcHVsYXRlUHJvZmlsZSA9ICgpID0+IHtcclxuICAgIGNyZWF0ZUZyaWVuZHMoKTtcclxuICAgIC8vIGNyZWF0ZUV2ZW50cygpO1xyXG4gICAgLy8gY3JlYXRlTmV3cygpO1xyXG4gICAgLy8gY3JlYXRlVGFza3MoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVQcm9maWxlXHJcblxyXG4iLCJjb25zdCBBUEkgPSB7XHJcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5U3RyaW5nfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBQT1NUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIEVESVQ6IChkYkFycmF5LCBvYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJmdW5jdGlvbiBwcmludFRvRG9tKEhUTUxTdHJpbmcsIERPTUxvY2F0aW9uKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
