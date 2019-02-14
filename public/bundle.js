(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":6}],2:[function(require,module,exports){
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

},{"../utilities/apiManager":10,"./friendHTML":5,"./searchUsers":9}],4:[function(require,module,exports){
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

},{"../profile/newsHTML":7,"../utilities/apiManager":10,"../utilities/printToDOM":11}],5:[function(require,module,exports){
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

},{"../utilities/printToDOM":11}],6:[function(require,module,exports){
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

},{"../utilities/printToDOM":11,"./populateProfile":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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
  (0, _createEvent.default)();
  (0, _createNews.default)(); // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2,"./createFriends":3,"./createNews":4}],9:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRnJpZW5kcy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9jcmVhdGVOZXdzLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL2ZyaWVuZEhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL25ld3NIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL3BvcHVsYXRlUHJvZmlsZS5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9zZWFyY2hVc2Vycy5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBLDhCQUFnQixDQUFoQjs7Ozs7Ozs7OztBQ0RBLE1BQU0sWUFBWSxHQUFDLE1BQUk7QUFDdkIsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQyxDQUZEOztlQUdlLFk7Ozs7Ozs7Ozs7O0FDSGY7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxTQUFTLGFBQVQsR0FBeUI7QUFDckIsTUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsU0FBdkIsRUFBa0MsS0FBL0M7QUFDQSxNQUFJLFdBQVcsR0FBRyxFQUFsQjtBQUNBLE1BQUksU0FBUyxHQUFHLEVBQWhCO0FBQ0EsTUFBSSxVQUFVLEdBQUcsRUFBakI7O0FBQ0Esc0JBQUksR0FBSixDQUFTLFNBQVEsTUFBTyxzQkFBeEIsRUFDSyxJQURMLENBQ1csZ0JBQUQsSUFBc0I7QUFDeEIsSUFBQSxXQUFXLEdBQUcsZ0JBQWdCLENBQUMsV0FBakIsQ0FBNkIsR0FB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QUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUUsS0FEa0Q7QUFFMUQsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZpRDtBQUsxRCxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7QUFMb0QsS0FBbEQsQ0FBTCxDQU9GLElBUEUsQ0FPRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUosRUFQVixDQUFQO0FBUUgsR0F4Qk87QUF5QlIsRUFBQSxNQUFNLEVBQUUsQ0FBQyxPQUFELEVBQVUsTUFBVixLQUFxQjtBQUN6QixXQUFPLEtBQUssQ0FBRSx5QkFBd0IsT0FBUSxJQUFHLE1BQU0sQ0FBQyxFQUFHLEVBQS9DLEVBQWtEO0FBQzFELE1BQUEsTUFBTSxFQUFFO0FBRGtELEtBQWxELENBQUwsQ0FHTixJQUhNLENBR0QsUUFBUSxJQUFJLFFBQVEsQ0FBQyxJQUFULEVBSFgsQ0FBUDtBQUlIO0FBOUJPLENBQVo7ZUFpQ2UsRzs7Ozs7Ozs7Ozs7QUNqQ2YsU0FBUyxVQUFULENBQW9CLFVBQXBCLEVBQWdDLFdBQWhDLEVBQTZDO0FBQ3pDLEVBQUEsUUFBUSxDQUFDLGFBQVQsQ0FBd0IsR0FBRSxXQUFZLEVBQXRDLEVBQXlDLFNBQXpDLEdBQXFELFVBQXJEO0FBQ0g7O2VBRWMsVSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBtYWtlUHJvZmlsZUhUTUwgZnJvbSBcIi4vcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUxcIlxubWFrZVByb2ZpbGVIVE1MKDEpXG4iLCJjb25zdCBjcmVhdGVFdmVudHM9KCk9PntcbmNvbnNvbGUubG9nKFwiaGlcIilcbn1cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUV2ZW50cyIsImltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcbmltcG9ydCBmcmllbmRIVE1MIGZyb20gXCIuL2ZyaWVuZEhUTUxcIlxuaW1wb3J0IHNlYXJjaFVzZXJzIGZyb20gXCIuL3NlYXJjaFVzZXJzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0ZUZyaWVuZHMoKSB7XG4gICAgbGV0IHVzZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcklkXCIpLnZhbHVlXG4gICAgbGV0IGZyaWVuZEFycmF5ID0gW11cbiAgICBsZXQgdXNlckFycmF5ID0gW11cbiAgICBsZXQgZnJpZW5kTGlzdCA9IFtdXG4gICAgQVBJLkdFVChgdXNlcnMvJHt1c2VySWR9Lz9fZW1iZWQ9ZnJpZW5kc2hpcHNgKVxuICAgICAgICAudGhlbigocGFyc2VkRnJpZW5kRGF0YSkgPT4ge1xuICAgICAgICAgICAgZnJpZW5kQXJyYXkgPSBwYXJzZWRGcmllbmREYXRhLmZyaWVuZHNoaXBzLm1hcCgoZnJpZW5kc2hpcCkgPT4gZnJpZW5kc2hpcC5mcmllbmRJZClcbiAgICAgICAgICAgIHJldHVybiBBUEkuR0VUKFwidXNlcnNcIilcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHBhcnNlZFVzZXJEYXRhKSA9PiB7XG4gICAgICAgICAgICB1c2VyQXJyYXkgPSBwYXJzZWRVc2VyRGF0YVxuICAgICAgICAgICAgZnJpZW5kTGlzdCA9IGZyaWVuZEFycmF5Lm1hcCgoZnJpZW5kSWQpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnJpZW5kSWQgPSB1c2VyQXJyYXkuZmlsdGVyKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh1c2VyLmlkID09PSBmcmllbmRJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVzZXIudXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIGZyaWVuZExpc3RcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKGZyaWVuZExpc3QpID0+IGZyaWVuZEhUTUwoZnJpZW5kTGlzdCkpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlclNlYXJjaEJ1dHRvblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoVXNlcnNJbnB1dFwiKS52YWx1ZVxuICAgICAgICAgICAgICAgIHNlYXJjaFVzZXJzKGlucHV0KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRnJpZW5kcyIsImltcG9ydCBBUEkgZnJvbSBcIi4uL3V0aWxpdGllcy9hcGlNYW5hZ2VyXCJcbmltcG9ydCBwcmludFRvRG9tIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiXG5pbXBvcnQgbmV3c0hUTUwgZnJvbSBcIi4uL3Byb2ZpbGUvbmV3c0hUTUxcIlxuXG5jb25zdCBjcmVhdGVOZXdzID0gKCkgPT4ge1xuICAgIC8vIEdldCBuZXdzIG9iamVjdHMgZnJvbSBBUElcbiAgICBBUEkuR0VUKFwidXNlcnM/X2VtYmVkPWZyaWVuZHNoaXBzJl9lbWJlZD1uZXdzXCIpXG4gICAgICAgIC50aGVuKCh1c2VyQXJyYXkpID0+IHtcbiAgICAgICAgICAgIC8vIENoZWNrIElGIHVzZXJJZCBvbiBuZXdzIG9iamVjdHMgbWF0Y2hlcyBhY3RpdmUgdXNlclxuICAgICAgICAgICAgbGV0IGFjdGl2ZVVzZXIgPSBwYXJzZUludChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3VzZXJJZFwiKS52YWx1ZSlcbiAgICAgICAgICAgIHVzZXJBcnJheS5mb3JFYWNoICh1c2VyID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoYWN0aXZlVXNlciA9PT0gdXNlci5pZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdXNlck5hbWUgPSB1c2VyLnVzZXJOYW1lXG4gICAgICAgICAgICAgICAgICAgIGxldCBuZXdzQXJyYXkgPSB1c2VyLm5ld3NcbiAgICAgICAgICAgICAgICAgICAgLy8gVHVybiBlYWNoIG1hdGNoaW5nIG5ld3Mgb2JqZWN0IGludG8gSFRNTFxuICAgICAgICAgICAgICAgICAgICBuZXdzQXJyYXkuZm9yRWFjaChuZXdzT2JqZWN0ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBuZXdzSXRlbUhUTUwgPSBuZXdzSFRNTChuZXdzT2JqZWN0LCB1c2VyTmFtZSkgKyBcIjxidXR0b24gaWQ9J2FkZE5ld3MnPkFkZCBOZXdzIEl0ZW08L2J1dHRvbj5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJpbnQgSFRNTCBuZXdzIHRvIERPTVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnRUb0RvbShuZXdzSXRlbUhUTUwsIFwiI25ld3NcIilcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lciBvbiAjbmV3cyAoYnViYmxlcyEhKVxufVxuXG5cblxuXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVOZXdzIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XG5cbmZ1bmN0aW9uIGZyaWVuZEhUTUwoZnJpZW5kTGlzdCkge1xuICAgIGxldCBmcmllbmRIVE1MID0gYFxuICAgIDxmaWVsZHNldCBpZD1cInNlYXJjaFVzZXJzXCI+XG4gICAgICAgIDxsYWJlbCBmb3I9XCJzZWFyY2hVc2Vyc0lucHV0XCIgY2xhc3M9XCJzZWFyY2hVc2Vyc0lucHV0XCI+U2VhcmNoIEZvciBOZXcgVXNlcnMgVG8gRm9sbG93PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cInNlYXJjaFVzZXJzSW5wdXRcIiBpZD1cInNlYXJjaFVzZXJzSW5wdXRcIj5cbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJ1c2VyU2VhcmNoUmVzdWx0c1wiPjwvc2VjdGlvbj5cbiAgICAgICAgPGJ1dHRvbiBpZD1cInVzZXJTZWFyY2hCdXR0b25cIj5TZWFyY2ggRm9yIFVzZXJzPC9idXR0b24+XG4gICAgPC9maWVsZHNldD5cbiAgICA8aDEgaWQ9J0ZyaWVuZExpc3QnPkZyaWVuZHM8L2gxPlxuICAgIGBcbiAgICBmcmllbmRMaXN0Lm1hcCgoZnJpZW5kT2JqKSA9PiB7XG4gICAgICAgIGxldCBjdXJyZW50SFRNTCA9IGBcbiAgICAgICAgPHNlY3Rpb24gaWQ9XCJmcmllbmQtLSR7ZnJpZW5kT2JqWzBdLmlkfVwiXG4gICAgICAgIDxkaXYgaWQ9XCIjJHtmcmllbmRPYmpbMF0uaWR9XCI+JHtmcmllbmRPYmpbMF0udXNlck5hbWV9PC9kaXY+XG4gICAgICAgIDxidXR0b24gaWQ9XCJkZWxldGUtLSR7ZnJpZW5kT2JqWzBdLmlkfVwiPlVuZm9sbG93PC9idXR0b24+XG4gICAgICAgIGBcbiAgICAgICAgcmV0dXJuIGZyaWVuZEhUTUwgKz0gY3VycmVudEhUTUxcbiAgICB9KVxuICAgIHByaW50VG9Eb20oZnJpZW5kSFRNTCxcIiNmcmllbmRzXCIpXG4gICAgcmV0dXJuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZyaWVuZEhUTUwiLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxuY29uc3QgbWFrZVByb2ZpbGVIVE1MID0gKHVzZXJJZCkgPT4ge1xuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxuICAgICAgICAgICAgPGltZz48L2ltZz5cbiAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwidXNlcklkXCIgdHlwZSA9IFwiSGlkZGVuXCIgdmFsdWUgPSAke3VzZXJJZH0+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJmcmllbmRzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwibmV3c1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImV2ZW50c1wiPlxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRhc2tzXCI+XG4gICAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiY2hhdHNcIj5cbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgPC9hcnRpY2xlPmBcbiAgICBwcmludFRvRE9NKGh0bWwsIFwiLm91dHB1dFwiKVxuICAgIHBvcHVsYXRlUHJvZmlsZSgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZmlsZUhUTUwiLCJjb25zdCBuZXdzSFRNTCA9IChuZXdzT2JqZWN0LCB1c2VyTmFtZSkgPT4ge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxhcnRpY2xlIGlkPVwibmV3c0l0ZW0tLSR7bmV3c09iamVjdC5pZH1cIiBjbGFzcz1cIm5ld3NJdGVtIHVzZXItLSR7bmV3c09iamVjdC51c2VySWR9XCI+XG4gICAgICAgICAgICA8aDM+JHtuZXdzT2JqZWN0Lm5ld3N9PC9oMz5cbiAgICAgICAgICAgIDxkaXY+JHtuZXdzT2JqZWN0LmRhdGV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PiR7bmV3c09iamVjdC5uZXdzU3lub3BzaXN9PC9kaXY+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtuZXdzT2JqZWN0Lm5ld3NVUkx9XCI+UmVhZCBBcnRpY2xlPC9hPlxuICAgICAgICAgICAgPGRpdj5Qb3N0ZWQgQnk6ICR7dXNlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlTmV3cy0tJHtuZXdzT2JqZWN0LmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImVkaXROZXdzLS0ke25ld3NPYmplY3QuaWR9XCI+RWRpdDwvYnV0dG9uPlxuICAgICAgICA8L2FydGljbGU+XG4gICAgYFxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXdzSFRNTCIsImltcG9ydCBjcmVhdGVFdmVudHMgZnJvbSBcIi4vY3JlYXRlRXZlbnRcIlxuaW1wb3J0IGNyZWF0ZUZyaWVuZHMgZnJvbSBcIi4vY3JlYXRlRnJpZW5kc1wiXG5pbXBvcnQgY3JlYXRlTmV3cyBmcm9tIFwiLi9jcmVhdGVOZXdzXCJcblxuY29uc3QgcG9wdWxhdGVQcm9maWxlID0gKCkgPT4ge1xuICAgIGNyZWF0ZUZyaWVuZHMoKTtcbiAgICBjcmVhdGVFdmVudHMoKTtcbiAgICBjcmVhdGVOZXdzKCk7XG4gICAgLy8gY3JlYXRlVGFza3MoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVQcm9maWxlXG5cbiIsImltcG9ydCBwcmludFRvRE9NIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiXG5pbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiXG5cbmZ1bmN0aW9uIHNlYXJjaFVzZXJzKGlucHV0KSB7XG4gICAgbGV0IHVzZXJJZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcklkXCIpLnZhbHVlXG4gICAgbGV0IHVzZXJzID0gW11cbiAgICBsZXQgZnJpZW5kc0lkcyA9IFtdXG4gICAgbGV0IG5vdEZyaWVuZHMgPSBbXVxuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN1c2VyU2VhcmNoUmVzdWx0c1wiKS5pbm5lckhUTUwgPSBcIlwiXG4gICAgcmV0dXJuIEFQSS5HRVQoXCJ1c2Vyc1wiKVxuICAgICAgICAudGhlbigocGFyc2VkVXNlcnMpID0+IHtcbiAgICAgICAgICAgIHVzZXJzID0gcGFyc2VkVXNlcnNcbiAgICAgICAgICAgIHJldHVybiBBUEkuR0VUKGB1c2Vycy8ke3VzZXJJZH0vP19lbWJlZD1mcmllbmRzaGlwc2ApXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKChwYXJzZWRGcmllbmREYXRhKSA9PiB7XG4gICAgICAgICAgICBmcmllbmRzSWRzID0gcGFyc2VkRnJpZW5kRGF0YS5mcmllbmRzaGlwcy5tYXAoKGZyaWVuZHNoaXApID0+IGZyaWVuZHNoaXAuZnJpZW5kSWQpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHt1c2Vyc30pXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh7ZnJpZW5kc0lkc30pXG4gICAgICAgICAgICBub3RGcmllbmRzID0gdXNlcnMubWFwKCh1c2VyKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoZnJpZW5kc0lkcy5pbmNsdWRlcyh1c2VyLmlkKSA9PT0gZmFsc2UgJiYgdXNlci5pZCAhPT0gdXNlcklkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1c2VyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZmlsdGVyKGVsZW1lbnQgPT4gZWxlbWVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgY29uc29sZS5sb2cobm90RnJpZW5kcylcbiAgICAgICAgfSlcbn1cblxuZXhwb3J0IGRlZmF1bHQgc2VhcmNoVXNlcnMiLCJjb25zdCBBUEkgPSB7XG4gICAgR0VUOiAoZGJBcnJheVN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXlTdHJpbmd9YClcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIFBPU1Q6IChkYkFycmF5LCBvYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5fWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9LFxuICAgIEVESVQ6IChkYkFycmF5LCBvYmplY3QpID0+IHtcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXG4gICAgICAgIH0pXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcbiAgICB9LFxuICAgIERFTEVURTogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxuICAgICAgICB9KVxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJmdW5jdGlvbiBwcmludFRvRG9tKEhUTUxTdHJpbmcsIERPTUxvY2F0aW9uKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgJHtET01Mb2NhdGlvbn1gKS5pbm5lckhUTUwgPSBIVE1MU3RyaW5nXG59XG5cbmV4cG9ydCBkZWZhdWx0IHByaW50VG9Eb20iXX0=
