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
};

(0, _populateProfile.default)();
var _default = makeProfileHTML;
exports.default = _default;

},{"../utilities/printToDOM":5,"./populateProfile":4}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eventList = _interopRequireDefault(require("./eventList"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const populateProfile = () => {
  // createFriends();
  (0, _eventList.default)(); // createNews();
  // createTasks();
};

var _default = populateProfile;
exports.default = _default;

},{"./eventList":2}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL21haW4uanMiLCIuLi9zY3JpcHRzL3Byb2ZpbGUvZXZlbnRMaXN0LmpzIiwiLi4vc2NyaXB0cy9wcm9maWxlL21ha2VQcm9maWxlSFRNTC5qcyIsIi4uL3NjcmlwdHMvcHJvZmlsZS9wb3B1bGF0ZVByb2ZpbGUuanMiLCIuLi9zY3JpcHRzL3V0aWxpdGllcy9wcmludFRvRE9NLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTs7OztBQUNBLDhCQUFnQixDQUFoQjs7Ozs7Ozs7OztBQ0RBLE1BQU0sWUFBWSxHQUFDLE1BQUk7QUFDdkIsRUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLElBQVo7QUFDQyxDQUZEOztlQUdlLFk7Ozs7Ozs7Ozs7O0FDSGY7O0FBQ0E7Ozs7QUFDQSxNQUFNLGVBQWUsR0FBSSxNQUFELElBQVk7QUFDaEMsUUFBTSxJQUFJLEdBQUk7OzJEQUV5QyxNQUFPOzs7Ozs7OzttQkFGOUQ7QUFXQSwyQkFBVyxJQUFYLEVBQWlCLFNBQWpCO0FBQ0gsQ0FiRDs7QUFjQTtlQUVlLGU7Ozs7Ozs7Ozs7O0FDbEJmOzs7O0FBQ0EsTUFBTSxlQUFlLEdBQUcsTUFBTTtBQUMzQjtBQUNDLDRCQUYwQixDQUczQjtBQUNBO0FBQ0YsQ0FMRDs7ZUFPZSxlOzs7Ozs7Ozs7OztBQ1JmLFNBQVMsVUFBVCxDQUFvQixVQUFwQixFQUFnQyxXQUFoQyxFQUE2QztBQUN6QyxFQUFBLFFBQVEsQ0FBQyxhQUFULENBQXdCLEdBQUUsV0FBWSxFQUF0QyxFQUF5QyxTQUF6QyxHQUFxRCxVQUFyRDtBQUNIOztlQUVjLFUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgbWFrZVByb2ZpbGVIVE1MIGZyb20gXCIuL3Byb2ZpbGUvbWFrZVByb2ZpbGVIVE1MXCJcbm1ha2VQcm9maWxlSFRNTCgxKVxuIiwiY29uc3QgY3JlYXRlRXZlbnRzPSgpPT57XG5jb25zb2xlLmxvZyhcImhpXCIpXG59XG5leHBvcnQgZGVmYXVsdCBjcmVhdGVFdmVudHMiLCJpbXBvcnQgcHJpbnRUb0RPTSBmcm9tIFwiLi4vdXRpbGl0aWVzL3ByaW50VG9ET01cIlxuaW1wb3J0IHBvcHVsYXRlUHJvZmlsZSBmcm9tIFwiLi9wb3B1bGF0ZVByb2ZpbGVcIlxuY29uc3QgbWFrZVByb2ZpbGVIVE1MID0gKHVzZXJJZCkgPT4ge1xuICAgIGNvbnN0IGh0bWwgPSBgIDxhcnRpY2xlPlxuICAgICAgICAgICAgPGltZz48L2ltZz5cbiAgICAgICAgICAgIDxpbnB1dCBpZCA9IFwidXNlcklkXCIgdHlwZSA9IFwiSGlkZGVuXCIgdmFsdWUgPSAke3VzZXJJZH0+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwidGl0bGVcIj4gTnV0U2hlbGxcbiAgICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgICAgIDxzZWN0aW9uIGlkID0gXCJmcmllbmRzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcIm5ld3NcIj48L3NlY3Rpb24+XG4gICAgICAgICAgICA8c2VjdGlvbiBpZCA9IFwiZXZlbnRzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcInRhc2tzXCI+PC9zZWN0aW9uPlxuICAgICAgICAgICAgPHNlY3Rpb24gaWQgPSBcImNoYXRzXCI+PC9zZWN0aW9uPlxuICAgICAgICA8L2FydGljbGU+YFxuICAgIHByaW50VG9ET00oaHRtbCwgXCIub3V0cHV0XCIpXG59XG5wb3B1bGF0ZVByb2ZpbGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgbWFrZVByb2ZpbGVIVE1MIiwiaW1wb3J0IGNyZWF0ZUV2ZW50cyBmcm9tIFwiLi9ldmVudExpc3RcIlxuY29uc3QgcG9wdWxhdGVQcm9maWxlID0gKCkgPT4ge1xuICAgLy8gY3JlYXRlRnJpZW5kcygpO1xuICAgIGNyZWF0ZUV2ZW50cygpO1xuICAgLy8gY3JlYXRlTmV3cygpO1xuICAgLy8gY3JlYXRlVGFza3MoKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgcG9wdWxhdGVQcm9maWxlXG5cbiIsImZ1bmN0aW9uIHByaW50VG9Eb20oSFRNTFN0cmluZywgRE9NTG9jYXRpb24pIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAke0RPTUxvY2F0aW9ufWApLmlubmVySFRNTCA9IEhUTUxTdHJpbmdcbn1cblxuZXhwb3J0IGRlZmF1bHQgcHJpbnRUb0RvbSJdfQ==
