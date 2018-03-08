import data from "./data.js";

const map = {
  mymap: L.map('map').setView([52.37, 4.89], 13),
  newLayer: null,
  oldLayer: null,
  init() {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: '<a href="https://casburggraaf.com/">Cas Burggraaf&copy</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiaGFta2Fhc3Rvc3RpIiwiYSI6ImNqZWgyYTl3dTJsdnIzM2xpN2l0MXBsNGYifQ.C2VXaN0XiPlMwmCS1wCsVg'
    }).addTo(this.mymap);
  },
  renderStreats() {
    let newLines = [];
    let myOldLines = [];

    data.dataFiltert.forEach(function (el) {
      let tempCordi = el.wkt.value;
      tempCordi = tempCordi.replace("MULTILINESTRING((", "");
      tempCordi = tempCordi.replace("LINESTRING(", "");
      tempCordi = tempCordi.replace(/\(/g, "");
      tempCordi = tempCordi.replace(/\)/g, "");
      tempCordi = tempCordi.replace(/POINT/g, "");
      tempCordi = tempCordi.split(",");
      tempCordi = tempCordi.map(function (obj) {
        obj = obj.split(" ");
        return obj;
      })

      let tempObject = {
        "type": "LineString",
        "coordinates": tempCordi
      };
      newLines.push(tempObject)
    });

    var myNewStyle = {
      "color": "#ff7800",
      "weight": 5,
      "opacity": 0.65
    };

    var myOldStyle = {
      "color": "#A8A8A8",
      "weight": 4,
      "opacity": 0.35
    };

    if (this.mymap.hasLayer(this.newLayer)){
      this.mymap.removeLayer(this.newLayer)
    }

    this.oldLayer = L.geoJSON(myOldLines, {
      style: myNewStyle
    }).addTo(this.mymap);

    this.newLayer = L.geoJSON(newLines, {
      style: myNewStyle
    }).addTo(this.mymap);
  }
};

export default map;
