import data from "./data.js";

const map = {
  mymap: L.map('map').setView([52.37, 4.89], 13),
  layers: {},
  geoLayers: {},
  init() {
    L.tileLayer(`https://api.mapbox.com/styles/v1/hamkaastosti/cjeigw5bw7lz02rp1bjtz0w1z/tiles/256/{z}/{x}/{y}?access_token={accessToken}`, {
      attribution: '<a href="https://casburggraaf.com/">Cas Burggraaf&copy</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiaGFta2Fhc3Rvc3RpIiwiYSI6ImNqZWgyYTl3dTJsdnIzM2xpN2l0MXBsNGYifQ.C2VXaN0XiPlMwmCS1wCsVg'
    }).addTo(this.mymap);
    this.mapWorker();
  },
  mapWorker() {
    let _this = this;

    data.data.results.bindings.forEach(function (el) {
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
      el.wkt.value = tempCordi;
      if (!data.dataParsed[el.start.value]) {
        data.dataParsed[el.start.value] = [];
      }
      data.dataParsed[el.start.value].push(el);
    });

    Object.keys(data.dataParsed).forEach(function(key) {
      var value = data.dataParsed[key];
      if (!_this.layers[key]) {
        _this.layers[key] = [];
      }

      Object.keys(value).forEach(function(index) {
        let cordi = value[index].wkt.value
        let tempObject = {
          "type": "LineString",
          "coordinates": cordi
        };
        _this.layers[key].push(tempObject)
      });

    });

    Object.keys(this.layers).forEach(function(key) {
      let style = {
          "color": "#ff7800",
          "weight": 5,
          "opacity": 0
        };

        _this.geoLayers[key] = L.geoJSON(_this.layers[key] , {
          style: style
        }).addTo(_this.mymap);

    });
  },
  render() {
    const _this = this;
    const date = document.querySelector("#myRange").value;

    Object.keys(this.geoLayers).forEach(function(key) {
      if (_this.geoLayers[key]) {
        if (key < date) {
          _this.geoLayers[key].setStyle({
            "opacity": 0.3,
            "color": "#A8A8A8",
          });
        } else if (key > date) {
          _this.geoLayers[key].setStyle({
            "opacity": 0
          });
        }
      }
    });

    if (this.geoLayers[date]) {
      this.geoLayers[date].setStyle({
        "opacity": 0.65,
        "color": "#ff7800"
      });
    }
  }
};

export default map;
