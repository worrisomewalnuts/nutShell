(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":4}],2:[function(require,module,exports){
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

var _default = createNews; //   // Check IF userId on news objects matches friend of active user
//   let friendsArray = user.friendships
//   let friendIds = []
//   friendsArray.forEach(friend => {
//       friendIds.push(friend.friendId)
//       console.log(friendIds)
//   })
//   friendIds.forEach(friendId => {
//       if (friendId === user.id || activeUser === user.id) {
//           let userName = user.userName
//           let newsArray = user.news
//           // Turn each matching news object into HTML
//           newsArray.forEach(newsObject => {
//               let newsItemHTML = newsHTML(newsObject, userName)
//               // Print HTML news to DOM
//               printToDom(newsItemHTML, "#news")
//           })
//       }
//   })
// friendIds.forEach(friendId => {
//     if (friendId === user.id) {
//         let userName = user.userName
//         let newsArray = user.news
//         console.log(newsArray)
//         // Turn each matching news object into HTML
//         newsArray.forEach(newsObject => {
//             let newsItemHTML = newsHTML(newsObject, userName)
//             // Print HTML news to DOM
//             printToDom(newsItemHTML, "#news")
//         })
// }

exports.default = _default;

},{"../profile/newsHTML":5,"../utilities/apiManager":7,"../utilities/printToDOM":8}],4:[function(require,module,exports){
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

},{"../utilities/printToDOM":8,"./populateProfile":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createEvent = _interopRequireDefault(require("./createEvent"));

var _createNews = _interopRequireDefault(require("./createNews"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  // createFriends()
  (0, _createEvent.default)();
  (0, _createNews.default)(); // createTasks()
};

var _default = populateProfile;
exports.default = _default;

},{"./createEvent":2,"./createNews":3}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlRXZlbnQuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlTmV3cy5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9tYWtlUHJvZmlsZUhUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbmV3c0hUTUwuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvcG9wdWxhdGVQcm9maWxlLmpzIiwiLi4vc2NyaXB0cy91dGlsaXRpZXMvYXBpTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL3ByaW50VG9ET00uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQ0FBOzs7O0FBQ0EsOEJBQWdCLENBQWhCOzs7Ozs7Ozs7O0FDREEsTUFBTSxZQUFZLEdBQUMsTUFBSTtBQUN2QixFQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksSUFBWjtBQUNDLENBRkQ7O2VBR2UsWTs7Ozs7Ozs7Ozs7QUNIZjs7QUFDQTs7QUFDQTs7OztBQUVBLE1BQU0sVUFBVSxHQUFHLE1BQU07QUFDckI7QUFDQSxzQkFBSSxHQUFKLENBQVEsc0NBQVIsRUFDSyxJQURMLENBQ1csU0FBRCxJQUFlO0FBQ2pCO0FBQ0EsUUFBSSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxhQUFULENBQXVCLFNBQXZCLEVBQWtDLEtBQW5DLENBQXpCO0FBQ0EsSUFBQSxTQUFTLENBQUMsT0FBVixDQUFtQixJQUFJLElBQUk7QUFDdkIsVUFBSSxVQUFVLEtBQUssSUFBSSxDQUFDLEVBQXhCLEVBQTRCO0FBQ3hCLFlBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFwQjtBQUNBLFlBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFyQixDQUZ3QixDQUd4Qjs7QUFDQSxRQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLFVBQVUsSUFBSTtBQUM1QixjQUFJLFlBQVksR0FBRyx1QkFBUyxVQUFULEVBQXFCLFFBQXJCLElBQWlDLDZDQUFwRCxDQUQ0QixDQUU1Qjs7QUFDQSxtQ0FBVyxZQUFYLEVBQXlCLE9BQXpCO0FBQ0gsU0FKRDtBQUtIO0FBQ0osS0FYRDtBQVlILEdBaEJMLEVBRnFCLENBb0JqQjs7QUFDUCxDQXJCRDs7ZUEwQmUsVSxFQU1mO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyRUE7O0FBQ0E7Ozs7QUFDQSxNQUFNLGVBQWUsR0FBSSxNQUFELElBQVk7QUFDaEMsUUFBTSxJQUFJLEdBQUk7OzJEQUV5QyxNQUFPOzs7Ozs7OzttQkFGOUQ7QUFXQSwyQkFBVyxJQUFYLEVBQWlCLFNBQWpCO0FBQ0E7QUFDSCxDQWREOztlQWdCZSxlOzs7Ozs7Ozs7OztBQ2xCZixNQUFNLFFBQVEsR0FBRyxDQUFDLFVBQUQsRUFBYSxRQUFiLEtBQTBCO0FBQ3ZDLFNBQVE7aUNBQ3FCLFVBQVUsQ0FBQyxFQUFHLDJCQUEwQixVQUFVLENBQUMsTUFBTztrQkFDekUsVUFBVSxDQUFDLElBQUs7bUJBQ2YsVUFBVSxDQUFDLElBQUs7bUJBQ2hCLFVBQVUsQ0FBQyxZQUFhO3VCQUNwQixVQUFVLENBQUMsT0FBUTs4QkFDWixRQUFTO3NDQUNELFVBQVUsQ0FBQyxFQUFHO29DQUNoQixVQUFVLENBQUMsRUFBRzs7S0FSOUM7QUFXSCxDQVpEOztlQWNlLFE7Ozs7Ozs7Ozs7O0FDZGY7O0FBQ0E7Ozs7QUFDQSxNQUFNLGVBQWUsR0FBRyxNQUFNO0FBQzNCO0FBQ0E7QUFDQSw2QkFIMkIsQ0FJM0I7QUFDRixDQUxEOztlQU9lLGU7Ozs7Ozs7Ozs7QUNUZixNQUFNLEdBQUcsR0FBRztBQUNSLEVBQUEsR0FBRyxFQUFHLGFBQUQsSUFBbUI7QUFDcEIsV0FBTyxLQUFLLENBQUUseUJBQXdCLGFBQWMsRUFBeEMsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FKTztBQUtSLEVBQUEsSUFBSSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDdkIsV0FBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsRUFBbEMsRUFBcUM7QUFDN0MsTUFBQSxNQUFNLEVBQUUsTUFEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7QUFMdUMsS0FBckMsQ0FBTCxDQU9OLElBUE0sQ0FPRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFQWCxDQUFQO0FBUUgsR0FkTztBQWVSLEVBQUEsSUFBSSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDdkIsV0FBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsSUFBRyxNQUFNLENBQUMsRUFBRyxFQUEvQyxFQUFrRDtBQUMxRCxNQUFBLE1BQU0sRUFBRSxLQURrRDtBQUUxRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmlEO0FBSzFELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUxvRCxLQUFsRCxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSCxHQXhCTztBQXlCUixFQUFBLE1BQU0sRUFBRSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3pCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLElBQUcsTUFBTSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXG5tYWtlUHJvZmlsZUhUTUwoMSlcbiIsImNvbnN0IGNyZWF0ZUV2ZW50cz0oKT0+e1xuY29uc29sZS5sb2coXCJoaVwiKVxufVxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlRXZlbnRzIiwiaW1wb3J0IEFQSSBmcm9tIFwiLi4vdXRpbGl0aWVzL2FwaU1hbmFnZXJcIlxuaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcbmltcG9ydCBuZXdzSFRNTCBmcm9tIFwiLi4vcHJvZmlsZS9uZXdzSFRNTFwiXG5cbmNvbnN0IGNyZWF0ZU5ld3MgPSAoKSA9PiB7XG4gICAgLy8gR2V0IG5ld3Mgb2JqZWN0cyBmcm9tIEFQSVxuICAgIEFQSS5HRVQoXCJ1c2Vycz9fZW1iZWQ9ZnJpZW5kc2hpcHMmX2VtYmVkPW5ld3NcIilcbiAgICAgICAgLnRoZW4oKHVzZXJBcnJheSkgPT4ge1xuICAgICAgICAgICAgLy8gQ2hlY2sgSUYgdXNlcklkIG9uIG5ld3Mgb2JqZWN0cyBtYXRjaGVzIGFjdGl2ZSB1c2VyXG4gICAgICAgICAgICBsZXQgYWN0aXZlVXNlciA9IHBhcnNlSW50KGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdXNlcklkXCIpLnZhbHVlKVxuICAgICAgICAgICAgdXNlckFycmF5LmZvckVhY2ggKHVzZXIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVVc2VyID09PSB1c2VyLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCB1c2VyTmFtZSA9IHVzZXIudXNlck5hbWVcbiAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3NBcnJheSA9IHVzZXIubmV3c1xuICAgICAgICAgICAgICAgICAgICAvLyBUdXJuIGVhY2ggbWF0Y2hpbmcgbmV3cyBvYmplY3QgaW50byBIVE1MXG4gICAgICAgICAgICAgICAgICAgIG5ld3NBcnJheS5mb3JFYWNoKG5ld3NPYmplY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld3NJdGVtSFRNTCA9IG5ld3NIVE1MKG5ld3NPYmplY3QsIHVzZXJOYW1lKSArIFwiPGJ1dHRvbiBpZD0nYWRkTmV3cyc+QWRkIE5ld3MgSXRlbTwvYnV0dG9uPlwiXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmludCBIVE1MIG5ld3MgdG8gRE9NXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmludFRvRG9tKG5ld3NJdGVtSFRNTCwgXCIjbmV3c1wiKVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGxpc3RlbmVyIG9uICNuZXdzIChidWJibGVzISEpXG59XG5cblxuXG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZU5ld3NcblxuXG5cblxuXG4vLyAgIC8vIENoZWNrIElGIHVzZXJJZCBvbiBuZXdzIG9iamVjdHMgbWF0Y2hlcyBmcmllbmQgb2YgYWN0aXZlIHVzZXJcbi8vICAgbGV0IGZyaWVuZHNBcnJheSA9IHVzZXIuZnJpZW5kc2hpcHNcbi8vICAgbGV0IGZyaWVuZElkcyA9IFtdXG4vLyAgIGZyaWVuZHNBcnJheS5mb3JFYWNoKGZyaWVuZCA9PiB7XG4vLyAgICAgICBmcmllbmRJZHMucHVzaChmcmllbmQuZnJpZW5kSWQpXG4vLyAgICAgICBjb25zb2xlLmxvZyhmcmllbmRJZHMpXG4vLyAgIH0pXG5cbi8vICAgZnJpZW5kSWRzLmZvckVhY2goZnJpZW5kSWQgPT4ge1xuLy8gICAgICAgaWYgKGZyaWVuZElkID09PSB1c2VyLmlkIHx8IGFjdGl2ZVVzZXIgPT09IHVzZXIuaWQpIHtcbi8vICAgICAgICAgICBsZXQgdXNlck5hbWUgPSB1c2VyLnVzZXJOYW1lXG4vLyAgICAgICAgICAgbGV0IG5ld3NBcnJheSA9IHVzZXIubmV3c1xuLy8gICAgICAgICAgIC8vIFR1cm4gZWFjaCBtYXRjaGluZyBuZXdzIG9iamVjdCBpbnRvIEhUTUxcbi8vICAgICAgICAgICBuZXdzQXJyYXkuZm9yRWFjaChuZXdzT2JqZWN0ID0+IHtcbi8vICAgICAgICAgICAgICAgbGV0IG5ld3NJdGVtSFRNTCA9IG5ld3NIVE1MKG5ld3NPYmplY3QsIHVzZXJOYW1lKVxuLy8gICAgICAgICAgICAgICAvLyBQcmludCBIVE1MIG5ld3MgdG8gRE9NXG4vLyAgICAgICAgICAgICAgIHByaW50VG9Eb20obmV3c0l0ZW1IVE1MLCBcIiNuZXdzXCIpXG4vLyAgICAgICAgICAgfSlcbi8vICAgICAgIH1cbi8vICAgfSlcblxuXG4vLyBmcmllbmRJZHMuZm9yRWFjaChmcmllbmRJZCA9PiB7XG4vLyAgICAgaWYgKGZyaWVuZElkID09PSB1c2VyLmlkKSB7XG4vLyAgICAgICAgIGxldCB1c2VyTmFtZSA9IHVzZXIudXNlck5hbWVcbi8vICAgICAgICAgbGV0IG5ld3NBcnJheSA9IHVzZXIubmV3c1xuLy8gICAgICAgICBjb25zb2xlLmxvZyhuZXdzQXJyYXkpXG4vLyAgICAgICAgIC8vIFR1cm4gZWFjaCBtYXRjaGluZyBuZXdzIG9iamVjdCBpbnRvIEhUTUxcbi8vICAgICAgICAgbmV3c0FycmF5LmZvckVhY2gobmV3c09iamVjdCA9PiB7XG4vLyAgICAgICAgICAgICBsZXQgbmV3c0l0ZW1IVE1MID0gbmV3c0hUTUwobmV3c09iamVjdCwgdXNlck5hbWUpXG4vLyAgICAgICAgICAgICAvLyBQcmludCBIVE1MIG5ld3MgdG8gRE9NXG4vLyAgICAgICAgICAgICBwcmludFRvRG9tKG5ld3NJdGVtSFRNTCwgXCIjbmV3c1wiKVxuLy8gICAgICAgICB9KVxuLy8gfSIsImltcG9ydCBwcmludFRvRE9NIGZyb20gXCIuLi91dGlsaXRpZXMvcHJpbnRUb0RPTVwiXG5pbXBvcnQgcG9wdWxhdGVQcm9maWxlIGZyb20gXCIuL3BvcHVsYXRlUHJvZmlsZVwiXG5jb25zdCBtYWtlUHJvZmlsZUhUTUwgPSAodXNlcklkKSA9PiB7XG4gICAgY29uc3QgaHRtbCA9IGAgPGFydGljbGU+XG4gICAgICAgICAgICA8aW1nPjwvaW1nPlxuICAgICAgICAgICAgPGlucHV0IGlkID0gXCJ1c2VySWRcIiB0eXBlID0gXCJIaWRkZW5cIiB2YWx1ZSA9ICR7dXNlcklkfT5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJ0aXRsZVwiPiBOdXRTaGVsbFxuICAgICAgICAgICAgPC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImZyaWVuZHNcIj48L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwibmV3c1wiPjwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJldmVudHNcIj48L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGFza3NcIj48L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiY2hhdHNcIj48L3NlY3Rpb24+XG4gICAgICAgIDwvYXJ0aWNsZT5gXG4gICAgcHJpbnRUb0RPTShodG1sLCBcIi5vdXRwdXRcIilcbiAgICBwb3B1bGF0ZVByb2ZpbGUoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBtYWtlUHJvZmlsZUhUTUwiLCJjb25zdCBuZXdzSFRNTCA9IChuZXdzT2JqZWN0LCB1c2VyTmFtZSkgPT4ge1xuICAgIHJldHVybiBgXG4gICAgICAgIDxhcnRpY2xlIGlkPVwibmV3c0l0ZW0tLSR7bmV3c09iamVjdC5pZH1cIiBjbGFzcz1cIm5ld3NJdGVtIHVzZXItLSR7bmV3c09iamVjdC51c2VySWR9XCI+XG4gICAgICAgICAgICA8aDM+JHtuZXdzT2JqZWN0Lm5ld3N9PC9oMz5cbiAgICAgICAgICAgIDxkaXY+JHtuZXdzT2JqZWN0LmRhdGV9PC9kaXY+XG4gICAgICAgICAgICA8ZGl2PiR7bmV3c09iamVjdC5uZXdzU3lub3BzaXN9PC9kaXY+XG4gICAgICAgICAgICA8YSBocmVmPVwiJHtuZXdzT2JqZWN0Lm5ld3NVUkx9XCI+UmVhZCBBcnRpY2xlPC9hPlxuICAgICAgICAgICAgPGRpdj5Qb3N0ZWQgQnk6ICR7dXNlck5hbWV9PC9kaXY+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwiZGVsZXRlTmV3cy0tJHtuZXdzT2JqZWN0LmlkfVwiPkRlbGV0ZTwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImVkaXROZXdzLS0ke25ld3NPYmplY3QuaWR9XCI+RWRpdDwvYnV0dG9uPlxuICAgICAgICA8L2FydGljbGU+XG4gICAgYFxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXdzSFRNTCIsImltcG9ydCBjcmVhdGVFdmVudHMgZnJvbSBcIi4vY3JlYXRlRXZlbnRcIlxuaW1wb3J0IGNyZWF0ZU5ld3MgZnJvbSBcIi4vY3JlYXRlTmV3c1wiXG5jb25zdCBwb3B1bGF0ZVByb2ZpbGUgPSAoKSA9PiB7XG4gICAvLyBjcmVhdGVGcmllbmRzKClcbiAgIGNyZWF0ZUV2ZW50cygpXG4gICBjcmVhdGVOZXdzKClcbiAgIC8vIGNyZWF0ZVRhc2tzKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVQcm9maWxlXG5cbiIsImNvbnN0IEFQSSA9IHtcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4LyR7ZGJBcnJheVN0cmluZ31gKVxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgUE9TVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXl9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgIH0sXG4gICAgRURJVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcbiAgICAgICAgICAgIG1ldGhvZDogXCJQVVRcIixcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxuICAgIH0sXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFQSSIsImZ1bmN0aW9uIHByaW50VG9Eb20oSFRNTFN0cmluZywgRE9NTG9jYXRpb24pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
