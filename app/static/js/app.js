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
      if(localStorage.getItem("allData")){
        data.data = JSON.parse(localStorage.getItem("allData"));
        console.log(data.data);
      } else {
        document.body.style.setProperty('--loader-status', 'block');
        api.request();
      }
      map.init();
    },
    slider() {
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      output.innerHTML = slider.value;

      slider.oninput = function() {
        output.innerHTML = this.value;
        data.filter(this.value)
      }
    }
  };
  // Start the Aplication
  app.init();
})();
