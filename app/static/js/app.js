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
        map.init();
      } else {
        document.body.style.setProperty('--loader-status', 'block');
        api.request().then(function () {
          map.init();
        });
      }
      this.sliderPLayer();
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
      let playerSpeed = 1000;
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
      }, playerSpeed);
      document.querySelector("#play").addEventListener("click", function () {
        console.log("sadfjlhisk");
        player = !player;
        //this.classList.toggle("fa-play");
        //this.classList.toggle("fa-pause");
      });

      document.querySelector("#forward").addEventListener("click", function () {
        console.log("jhklasahsdfkl");
        playerSpeed = playerSpeed * 20;
      });

      document.body.onkeyup = function(e){
        if(e.keyCode == 32){
          player = !player;
        } else if(e.keyCode == 37){
          if (player === false) {
            document.querySelector("#myRange").value = parseInt(document.querySelector("#myRange").value)  - 1;
            data.filter(document.querySelector("#myRange").value)
            document.getElementById("demo").innerHTML = document.querySelector("#myRange").value;
            map.render();
          }
        } else if(e.keyCode == 39){
          if (player === false) {
            document.querySelector("#myRange").value = parseInt(document.querySelector("#myRange").value)  + 1;
            data.filter(document.querySelector("#myRange").value)
            document.getElementById("demo").innerHTML = document.querySelector("#myRange").value;
            map.render();
          }
        }
      };
    }
  };
  // Start the Aplication
  app.init();
})();
