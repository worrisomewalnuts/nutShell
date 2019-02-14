(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _makeProfileHTML = _interopRequireDefault(require("./profile/makeProfileHTML"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _makeProfileHTML.default)(1);

},{"./profile/makeProfileHTML":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

var _taskHTML = _interopRequireDefault(require("./taskHTML"));

var _apiManager = _interopRequireDefault(require("../utilities/apiManager"));

var _taskList = _interopRequireDefault(require("./taskList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createTasks = () => {
  debugger;
  const $ = document.querySelector.bind(document);
  (0, _printToDOM.default)((0, _taskHTML.default)(), "#tasks");
  const id = $("#userId").value;

  _apiManager.default.GET(`tasks?userId=${id}&completionStatus=false`).then(tasks => (0, _taskList.default)(tasks));
};

var _default = createTasks;
exports.default = _default;

},{"../utilities/apiManager":7,"../utilities/printToDOM":8,"./taskHTML":5,"./taskList":6}],3:[function(require,module,exports){
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

},{"../utilities/printToDOM":8,"./populateProfile":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTasks = _interopRequireDefault(require("./createTasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  //createFriends();
  //createEvents();
  //createNews();
  (0, _createTasks.default)();
};

var _default = populateProfile;
exports.default = _default;

},{"./createTasks":2}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const taskHTML = () => ` <section id = "taskList">
</section>
<button id = "addNewTask">Add New Task </button>
`;

var _default = taskHTML;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _printToDOM = _interopRequireDefault(require("../utilities/printToDOM"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listHtml = task => `
    ${task.taskName} ${task.completionDate}
    <input type="checkbox" name="completed" value="true"> completed? <br>
`;

const taskList = tasks => {
  let htmlStr = "";
  tasks.forEach(task => {
    htmlStr += listHtml(task);
  });
  (0, _printToDOM.default)(htmlStr, "#taskList");
};

var _default = taskList;
exports.default = _default;

},{"../utilities/printToDOM":8}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlVGFza3MuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL3BvcHVsYXRlUHJvZmlsZS5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS90YXNrSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS90YXNrTGlzdC5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUVBLDhCQUFnQixDQUFoQjs7Ozs7Ozs7OztBQ0ZBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxXQUFXLEdBQUcsTUFBTTtBQUN0QjtBQUNBLFFBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFULENBQXVCLElBQXZCLENBQTRCLFFBQTVCLENBQVY7QUFDQSwyQkFBVyx3QkFBWCxFQUFzQixRQUF0QjtBQUNBLFFBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxTQUFELENBQUQsQ0FBYSxLQUF4Qjs7QUFDQSxzQkFBSSxHQUFKLENBQVMsZ0JBQWUsRUFBRyx5QkFBM0IsRUFBcUQsSUFBckQsQ0FBMkQsS0FBSyxJQUFJLHVCQUFTLEtBQVQsQ0FBcEU7QUFDSCxDQU5EOztlQVFlLFc7Ozs7Ozs7Ozs7O0FDZGY7O0FBQ0E7Ozs7QUFDQSxNQUFNLGVBQWUsR0FBSSxNQUFELElBQVk7QUFDaEMsUUFBTSxJQUFJLEdBQUk7OzJEQUV5QyxNQUFPOzs7Ozs7OzttQkFGOUQ7QUFZQSwyQkFBVyxJQUFYLEVBQWlCLFNBQWpCO0FBQ0E7QUFDSCxDQWZEOztlQWlCZSxlOzs7Ozs7Ozs7OztBQ25CZjs7OztBQUNBLE1BQU0sZUFBZSxHQUFHLE1BQU07QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDSCxDQUxEOztlQU9lLGU7Ozs7Ozs7Ozs7O0FDUmYsTUFBTSxRQUFRLEdBQUcsTUFBTzs7O0NBQXhCOztlQUtlLFE7Ozs7Ozs7Ozs7O0FDTGY7Ozs7QUFFQSxNQUFNLFFBQVEsR0FBSSxJQUFELElBQVc7TUFDdEIsSUFBSSxDQUFDLFFBQVMsSUFBRyxJQUFJLENBQUMsY0FBZTs7Q0FEM0M7O0FBSUEsTUFBTSxRQUFRLEdBQUksS0FBRCxJQUFXO0FBQ3hCLE1BQUksT0FBTyxHQUFHLEVBQWQ7QUFDQSxFQUFBLEtBQUssQ0FBQyxPQUFOLENBQWMsSUFBSSxJQUFJO0FBQ2xCLElBQUEsT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFELENBQW5CO0FBQ0gsR0FGRDtBQUdBLDJCQUFXLE9BQVgsRUFBb0IsV0FBcEI7QUFDSCxDQU5EOztlQVFlLFE7Ozs7Ozs7Ozs7QUNkZixNQUFNLEdBQUcsR0FBRztBQUNSLEVBQUEsR0FBRyxFQUFHLGFBQUQsSUFBbUI7QUFDcEIsV0FBTyxLQUFLLENBQUUseUJBQXdCLGFBQWMsRUFBeEMsQ0FBTCxDQUNGLElBREUsQ0FDRyxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFEZixDQUFQO0FBRUgsR0FKTztBQUtSLEVBQUEsSUFBSSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDdkIsV0FBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsRUFBbEMsRUFBcUM7QUFDN0MsTUFBQSxNQUFNLEVBQUUsTUFEcUM7QUFFN0MsTUFBQSxPQUFPLEVBQUU7QUFDTCx3QkFBZ0I7QUFEWCxPQUZvQztBQUs3QyxNQUFBLElBQUksRUFBRSxJQUFJLENBQUMsU0FBTCxDQUFlLE1BQWY7QUFMdUMsS0FBckMsQ0FBTCxDQU9OLElBUE0sQ0FPRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFQWCxDQUFQO0FBUUgsR0FkTztBQWVSLEVBQUEsSUFBSSxFQUFFLENBQUMsT0FBRCxFQUFVLE1BQVYsS0FBcUI7QUFDdkIsV0FBTyxLQUFLLENBQUUseUJBQXdCLE9BQVEsSUFBRyxNQUFNLENBQUMsRUFBRyxFQUEvQyxFQUFrRDtBQUMxRCxNQUFBLE1BQU0sRUFBRSxLQURrRDtBQUUxRCxNQUFBLE9BQU8sRUFBRTtBQUNMLHdCQUFnQjtBQURYLE9BRmlEO0FBSzFELE1BQUEsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFMLENBQWUsTUFBZjtBQUxvRCxLQUFsRCxDQUFMLENBT0YsSUFQRSxDQU9HLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSixFQVBWLENBQVA7QUFRSCxHQXhCTztBQXlCUixFQUFBLE1BQU0sRUFBRSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3pCLFdBQU8sS0FBSyxDQUFFLHlCQUF3QixPQUFRLElBQUcsTUFBTSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXHJcblxyXG5tYWtlUHJvZmlsZUhUTUwoMSlcclxuIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcbmltcG9ydCB0YXNrSFRNTCBmcm9tIFwiLi90YXNrSFRNTFwiO1xyXG5pbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiO1xyXG5pbXBvcnQgdGFza0xpc3QgZnJvbSBcIi4vdGFza0xpc3RcIjtcclxuXHJcblxyXG5jb25zdCBjcmVhdGVUYXNrcyA9ICgpID0+IHtcclxuICAgIGRlYnVnZ2VyXHJcbiAgICBjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG4gICAgcHJpbnRUb0RvbSh0YXNrSFRNTCgpLFwiI3Rhc2tzXCIpXHJcbiAgICBjb25zdCBpZCA9ICQoXCIjdXNlcklkXCIpLnZhbHVlXHJcbiAgICBBUEkuR0VUKGB0YXNrcz91c2VySWQ9JHtpZH0mY29tcGxldGlvblN0YXR1cz1mYWxzZWApLnRoZW4gKHRhc2tzID0+IHRhc2tMaXN0KHRhc2tzKSlcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlVGFza3NcclxuIiwiaW1wb3J0IHByaW50VG9ET00gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCJcclxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxyXG5jb25zdCBtYWtlUHJvZmlsZUhUTUwgPSAodXNlcklkKSA9PiB7XHJcbiAgICBjb25zdCBodG1sID0gYCA8YXJ0aWNsZT5cclxuICAgICAgICAgICAgPGltZz48L2ltZz5cclxuICAgICAgICAgICAgPGlucHV0IGlkID0gXCJ1c2VySWRcIiB0eXBlID0gXCJIaWRkZW5cIiB2YWx1ZSA9ICR7dXNlcklkfT5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRpdGxlXCI+IE51dFNoZWxsXHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImZyaWVuZHNcIj48L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJuZXdzXCI+PC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZXZlbnRzXCI+PC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGFza3NcIj48L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJjaGF0c1wiPjwvc2VjdGlvbj5cclxuICAgICAgICA8L2FydGljbGU+YFxyXG5cclxuICAgIHByaW50VG9ET00oaHRtbCwgXCIub3V0cHV0XCIpXHJcbiAgICBwb3B1bGF0ZVByb2ZpbGUoKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2ZpbGVIVE1MIiwiaW1wb3J0IGNyZWF0ZVRhc2tzIGZyb20gXCIuL2NyZWF0ZVRhc2tzXCJcclxuY29uc3QgcG9wdWxhdGVQcm9maWxlID0gKCkgPT4ge1xyXG4gICAgLy9jcmVhdGVGcmllbmRzKCk7XHJcbiAgICAvL2NyZWF0ZUV2ZW50cygpO1xyXG4gICAgLy9jcmVhdGVOZXdzKCk7XHJcbiAgICBjcmVhdGVUYXNrcygpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcclxuXHJcbiIsImNvbnN0IHRhc2tIVE1MID0gKCkgPT4gYCA8c2VjdGlvbiBpZCA9IFwidGFza0xpc3RcIj5cclxuPC9zZWN0aW9uPlxyXG48YnV0dG9uIGlkID0gXCJhZGROZXdUYXNrXCI+QWRkIE5ldyBUYXNrIDwvYnV0dG9uPlxyXG5gXHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrSFRNTFxyXG4iLCJpbXBvcnQgcHJpbnRUb0RvbSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIjtcclxuXHJcbmNvbnN0IGxpc3RIdG1sID0gKHRhc2spID0+IGBcclxuICAgICR7dGFzay50YXNrTmFtZX0gJHt0YXNrLmNvbXBsZXRpb25EYXRlfVxyXG4gICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJjb21wbGV0ZWRcIiB2YWx1ZT1cInRydWVcIj4gY29tcGxldGVkPyA8YnI+XHJcbmBcclxuY29uc3QgdGFza0xpc3QgPSAodGFza3MpID0+IHtcclxuICAgIGxldCBodG1sU3RyID0gXCJcIlxyXG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcclxuICAgICAgICBodG1sU3RyICs9IGxpc3RIdG1sKHRhc2spXHJcbiAgICB9KTtcclxuICAgIHByaW50VG9Eb20oaHRtbFN0ciwgXCIjdGFza0xpc3RcIilcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFza0xpc3QiLCJjb25zdCBBUEkgPSB7XHJcbiAgICBHRVQ6IChkYkFycmF5U3RyaW5nKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5U3RyaW5nfWApXHJcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBQT1NUOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vbG9jYWxob3N0OjgwODgvJHtkYkFycmF5fWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkob2JqZWN0KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIEVESVQ6IChkYkFycmF5LCBvYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBVVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgREVMRVRFOiAoZGJBcnJheSwgb2JqZWN0KSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIGZldGNoKGBodHRwOi8vMTI3LjAuMC4xOjgwODgvJHtkYkFycmF5fS8ke29iamVjdC5pZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIlxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBUEkiLCJmdW5jdGlvbiBwcmludFRvRG9tKEhUTUxTdHJpbmcsIERPTUxvY2F0aW9uKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
