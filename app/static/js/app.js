import api from "./modules/api.js";

(function () {
  "use strict";
  // Init Aplication
  const app = {
    rootElement: document.body,
    init() {
      if(localStorage.getItem("allData")){
        const temp = JSON.parse(localStorage.getItem("allData"));
        console.log(temp);
      } else {
        api.request();
      }
    }
  };
  // Start the Aplication
  app.init();
})();
