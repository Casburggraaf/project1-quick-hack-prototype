import data from "./data.js";

const map = {
  mymap: L.map('map').setView([52.37, 4.89], 13),
  layers: {},
  init() {
    L.tileLayer(`https://api.mapbox.com/styles/v1/hamkaastosti/cjeigw5bw7lz02rp1bjtz0w1z/tiles/256/{z}/{x}/{y}?access_token=`, {
      attribution: '<a href="https://casburggraaf.com/">Cas Burggraaf&copy</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiaGFta2Fhc3Rvc3RpIiwiYSI6ImNqZWgyYTl3dTJsdnIzM2xpN2l0MXBsNGYifQ.C2VXaN0XiPlMwmCS1wCsVg'
    }).addTo(this.mymap);
    this.mapWorker();
  },
  mapWorker() {
    let _this = this;

    console.log(data.data);
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
      //console.log(el);
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
    console.log(_this.layers);
    
    this.render();
    // if (this.mymap.hasLayer(this.newLayer)){
    //   this.mymap.removeLayer(this.newLayer)
    // }


  },
  render() {
    const date = document.querySelector("#myRange").value;
    console.log(date);
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

    this.newLayer = L.geoJSON(this.layers[date] , {
      style: myNewStyle
    }).addTo(this.mymap);
  }
};

export default map;
