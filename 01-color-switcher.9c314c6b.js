!function(){var t=null,e={stopBtn:document.querySelector("[data-stop]"),startBtn:document.querySelector("[data-start]"),bodyChangeColor:document.querySelector("body")};e.stopBtn.setAttribute("disabled",!0),e.startBtn.addEventListener("click",(function(){e.startBtn.setAttribute("disabled",!0),e.stopBtn.removeAttribute("disabled"),t=setInterval((function(){e.bodyChangeColor.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3)})),e.stopBtn.addEventListener("click",(function(){e.startBtn.removeAttribute("disabled"),e.stopBtn.setAttribute("disabled",!0),clearInterval(t)}))}();
//# sourceMappingURL=01-color-switcher.9c314c6b.js.map
