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

var _taskManager = _interopRequireDefault(require("./taskManager"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createTasks = () => {
  const $ = document.querySelector.bind(document);
  (0, _printToDOM.default)((0, _taskHTML.default)(), "#tasks");
  const id = $("#userId").value;
  debugger;

  _apiManager.default.GET(`tasks?userId=${id}&completionStatus=false`).then(tasks => (0, _taskList.default)(tasks));

  _taskManager.default.EL();
};

var _default = createTasks;
exports.default = _default;

},{"../utilities/apiManager":8,"../utilities/printToDOM":9,"./taskHTML":5,"./taskList":6,"./taskManager":7}],3:[function(require,module,exports){
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

},{"../utilities/printToDOM":9,"./populateProfile":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createTasks = _interopRequireDefault(require("./createTasks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import createEvents from "./createEvent"
//import createFriends from "./createFriends"
const populateProfile = () => {
  //createFriends();
  // createEvents();
  // createNews();
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

const listHtml = task => `<div id = "task--${task.id}"> ${task.taskName} ${task.completionDate}</div>
    <input type="checkbox" name="completed" value=false> completed? <br>
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

},{"../utilities/printToDOM":9}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const taskManager = {
  EL: () => {
    debugger;
    document.querySelector("#taskList").addEventListener("click", event => {
      console.log(event.target.id);
      debugger;

      if (event.target.id.startsWith("task--")) {
        const id = event.target.id.split("--");
        (void 0).complete(id);
      }
    });
  },
  complete: id => {
    console.log(id);
  }
};
var _default = taskManager;
exports.default = _default;

},{}],8:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvY3JlYXRlVGFza3MuanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MLmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL3BvcHVsYXRlUHJvZmlsZS5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS90YXNrSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS90YXNrTGlzdC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS90YXNrTWFuYWdlci5qcyIsIi4uL3NjcmlwdHMvdXRpbGl0aWVzL2FwaU1hbmFnZXIuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUVBLDhCQUFnQixDQUFoQjs7Ozs7Ozs7OztBQ0ZBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBR0EsTUFBTSxXQUFXLEdBQUcsTUFBTTtBQUN0QixRQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBVCxDQUF1QixJQUF2QixDQUE0QixRQUE1QixDQUFWO0FBRUEsMkJBQVcsd0JBQVgsRUFBc0IsUUFBdEI7QUFDQSxRQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsU0FBRCxDQUFELENBQWEsS0FBeEI7QUFDQTs7QUFDQSxzQkFBSSxHQUFKLENBQVMsZ0JBQWUsRUFBRyx5QkFBM0IsRUFDSyxJQURMLENBQ1csS0FBSyxJQUFJLHVCQUFTLEtBQVQsQ0FEcEI7O0FBRUEsdUJBQVksRUFBWjtBQUNILENBVEQ7O2VBV2UsVzs7Ozs7Ozs7Ozs7QUNsQmY7O0FBQ0E7Ozs7QUFDQSxNQUFNLGVBQWUsR0FBSSxNQUFELElBQVk7QUFDaEMsUUFBTSxJQUFJLEdBQUk7OzJEQUV5QyxNQUFPOzs7Ozs7Ozs7Ozs7O21CQUY5RDtBQWlCQSwyQkFBVyxJQUFYLEVBQWlCLFNB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QixPQUFRLElBQUcsTUFBTSxDQUFDLEVBQUcsRUFBL0MsRUFBa0Q7QUFDMUQsTUFBQSxNQUFNLEVBQUU7QUFEa0QsS0FBbEQsQ0FBTCxDQUdOLElBSE0sQ0FHRCxRQUFRLElBQUksUUFBUSxDQUFDLElBQVQsRUFIWCxDQUFQO0FBSUg7QUE5Qk8sQ0FBWjtlQWlDZSxHOzs7Ozs7Ozs7OztBQ2pDZixTQUFTLFVBQVQsQ0FBb0IsVUFBcEIsRUFBZ0MsV0FBaEMsRUFBNkM7QUFDekMsRUFBQSxRQUFRLENBQUMsYUFBVCxDQUF3QixHQUFFLFdBQVksRUFBdEMsRUFBeUMsU0FBekMsR0FBcUQsVUFBckQ7QUFDSDs7ZUFFYyxVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IG1ha2VQcm9maWxlSFRNTCBmcm9tIFwiLi9wcm9maWxlL21ha2VQcm9maWxlSFRNTFwiXHJcblxyXG5tYWtlUHJvZmlsZUhUTUwoMSlcclxuIiwiaW1wb3J0IHByaW50VG9Eb20gZnJvbSBcIi4uL3V0aWxpdGllcy9wcmludFRvRE9NXCI7XHJcbmltcG9ydCB0YXNrSFRNTCBmcm9tIFwiLi90YXNrSFRNTFwiO1xyXG5pbXBvcnQgQVBJIGZyb20gXCIuLi91dGlsaXRpZXMvYXBpTWFuYWdlclwiO1xyXG5pbXBvcnQgdGFza0xpc3QgZnJvbSBcIi4vdGFza0xpc3RcIjtcclxuaW1wb3J0IHRhc2tNYW5hZ2VyIGZyb20gXCIuL3Rhc2tNYW5hZ2VyXCI7XHJcblxyXG5cclxuY29uc3QgY3JlYXRlVGFza3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCAkID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvci5iaW5kKGRvY3VtZW50KVxyXG5cclxuICAgIHByaW50VG9Eb20odGFza0hUTUwoKSxcIiN0YXNrc1wiKVxyXG4gICAgY29uc3QgaWQgPSAkKFwiI3VzZXJJZFwiKS52YWx1ZVxyXG4gICAgZGVidWdnZXJcclxuICAgIEFQSS5HRVQoYHRhc2tzP3VzZXJJZD0ke2lkfSZjb21wbGV0aW9uU3RhdHVzPWZhbHNlYClcclxuICAgICAgICAudGhlbiAodGFza3MgPT4gdGFza0xpc3QodGFza3MpKVxyXG4gICAgdGFza01hbmFnZXIuRUwoKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjcmVhdGVUYXNrc1xyXG4iLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxyXG5pbXBvcnQgcG9wdWxhdGVQcm9maWxlIGZyb20gXCIuL3BvcHVsYXRlUHJvZmlsZVwiXHJcbmNvbnN0IG1ha2VQcm9maWxlSFRNTCA9ICh1c2VySWQpID0+IHtcclxuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxyXG4gICAgICAgICAgICA8aW1nPjwvaW1nPlxyXG4gICAgICAgICAgICA8aW5wdXQgaWQgPSBcInVzZXJJZFwiIHR5cGUgPSBcIkhpZGRlblwiIHZhbHVlID0gJHt1c2VySWR9PlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcclxuICAgICAgICAgICAgPC9zZWN0aW9uPlxyXG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZnJpZW5kc1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJuZXdzXCI+XHJcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cclxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImV2ZW50c1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJ0YXNrc1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJjaGF0c1wiPlxyXG4gICAgICAgICAgICA8L3NlY3Rpb24+XHJcbiAgICAgICAgPC9hcnRpY2xlPmBcclxuXHJcbiAgICBwcmludFRvRE9NKGh0bWwsIFwiLm91dHB1dFwiKVxyXG4gICAgcG9wdWxhdGVQcm9maWxlKCk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG1ha2VQcm9maWxlSFRNTCIsIi8vaW1wb3J0IGNyZWF0ZUV2ZW50cyBmcm9tIFwiLi9jcmVhdGVFdmVudFwiXHJcbi8vaW1wb3J0IGNyZWF0ZUZyaWVuZHMgZnJvbSBcIi4vY3JlYXRlRnJpZW5kc1wiXHJcbmltcG9ydCBjcmVhdGVUYXNrcyBmcm9tIFwiLi9jcmVhdGVUYXNrc1wiO1xyXG5cclxuY29uc3QgcG9wdWxhdGVQcm9maWxlID0gKCkgPT4ge1xyXG4gICAgLy9jcmVhdGVGcmllbmRzKCk7XHJcbiAgICAvLyBjcmVhdGVFdmVudHMoKTtcclxuICAgIC8vIGNyZWF0ZU5ld3MoKTtcclxuICAgICBjcmVhdGVUYXNrcygpO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwb3B1bGF0ZVByb2ZpbGVcclxuXHJcbiIsImNvbnN0IHRhc2tIVE1MID0gKCkgPT4gYCA8c2VjdGlvbiBpZCA9IFwidGFza0xpc3RcIj5cclxuPC9zZWN0aW9uPlxyXG48YnV0dG9uIGlkID0gXCJhZGROZXdUYXNrXCI+QWRkIE5ldyBUYXNrIDwvYnV0dG9uPlxyXG5gXHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrSFRNTFxyXG4iLCJpbXBvcnQgcHJpbnRUb0RvbSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIjtcclxuXHJcbmNvbnN0IGxpc3RIdG1sID0gKHRhc2spID0+XHJcbiAgICBgPGRpdiBpZCA9IFwidGFzay0tJHt0YXNrLmlkfVwiPiAke3Rhc2sudGFza05hbWV9ICR7dGFzay5jb21wbGV0aW9uRGF0ZX08L2Rpdj5cclxuICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiY29tcGxldGVkXCIgdmFsdWU9ZmFsc2U+IGNvbXBsZXRlZD8gPGJyPlxyXG5gXHJcbmNvbnN0IHRhc2tMaXN0ID0gKHRhc2tzKSA9PiB7XHJcbiAgICBsZXQgaHRtbFN0ciA9IFwiXCJcclxuICAgIHRhc2tzLmZvckVhY2godGFzayA9PiB7XHJcbiAgICAgICAgaHRtbFN0ciArPSBsaXN0SHRtbCh0YXNrKVxyXG4gICAgfSk7XHJcbiAgICBwcmludFRvRG9tKGh0bWxTdHIsIFwiI3Rhc2tMaXN0XCIpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhc2tMaXN0IiwiY29uc3QgdGFza01hbmFnZXIgPSB7XHJcbiAgICBFTDogKCkgPT4ge1xyXG4gICAgICAgIGRlYnVnZ2VyXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0YXNrTGlzdFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIixcclxuICAgICAgICAgICAgKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQuaWQpXHJcbiAgICAgICAgICAgICAgICBkZWJ1Z2dlclxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5pZC5zdGFydHNXaXRoKFwidGFzay0tXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGUoaWQpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICApXHJcbiAgICB9LFxyXG4gICAgY29tcGxldGU6IChpZCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YXNrTWFuYWdlciIsImNvbnN0IEFQSSA9IHtcclxuICAgIEdFVDogKGRiQXJyYXlTdHJpbmcpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXlTdHJpbmd9YClcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgfSxcclxuICAgIFBPU1Q6IChkYkFycmF5LCBvYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly9sb2NhbGhvc3Q6ODA4OC8ke2RiQXJyYXl9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeShvYmplY3QpXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9LFxyXG4gICAgRURJVDogKGRiQXJyYXksIG9iamVjdCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovLzEyNy4wLjAuMTo4MDg4LyR7ZGJBcnJheX0vJHtvYmplY3QuaWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUFVUXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KG9iamVjdClcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgIH0sXHJcbiAgICBERUxFVEU6IChkYkFycmF5LCBvYmplY3QpID0+IHtcclxuICAgICAgICByZXR1cm4gZmV0Y2goYGh0dHA6Ly8xMjcuMC4wLjE6ODA4OC8ke2RiQXJyYXl9LyR7b2JqZWN0LmlkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIkRFTEVURVwiXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFQSSIsImZ1bmN0aW9uIHByaW50VG9Eb20oSFRNTFN0cmluZywgRE9NTG9jYXRpb24pIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCR7RE9NTG9jYXRpb259YCkuaW5uZXJIVE1MID0gSFRNTFN0cmluZ1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcmludFRvRG9tIl19
