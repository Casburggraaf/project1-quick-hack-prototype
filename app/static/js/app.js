import api from "./modules/api.js";
import data from "./modules/data.js";
import map from "./modules/map.js";

(function () {
  "use strict";
  // Init Aplication
  const app = {
    rootElement: document.body,
    data: null,
    dataFiltert: null,
    init() {
      this.slider()
      this.sliderPLayer();

      if(localStorage.getItem("allData")){
        data.data = JSON.parse(localStorage.getItem("allData"));
        map.init();
      } else {
        document.body.style.setProperty('--loader-status', 'block');
        api.request().then(function () {
          map.init();
        });
      }
    },
    slider() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      output.innerHTML = slider.value;

      slider.oninput = function() {
        output.innerHTML = this.value;
        data.filter(this.value)
        map.render();
      }
    },
    sliderPLayer() {
      let player = false;
      let interval = setInterval(function () {
        if (player === true) {
          if (document.querySelector("#myRange").value !== document.querySelector("#myRange").max) {
            document.querySelector("#myRange").value = parseInt(document.querySelector("#myRange").value)  + 1;
            data.filter(document.querySelector("#myRange").value)
            document.getElementById("demo").innerHTML = document.querySelector("#myRange").value;
            map.render();
          } else if (document.querySelector("#myRange").value === document.querySelector("#myRange").max) {
            document.querySelector("#myRange").value = document.querySelector("#myRange").min
          }
        }
      }, 50)
      document.querySelector("#play").addEventListener("click", function () {
        player = !player;
      });
    }
  };
  // Start the Aplication
  app.init();
})();
