import map from "./map.js";

const data = {
  data: null,
  dataPrevious: null,
  dataFiltert: null,
  filter(date) {
    let newStreats = this.data.results.bindings.filter(function (el) {
      return el.start.value === date
    });
    this.dataFiltert = newStreats;

    let oldStreats = this.data.results.bindings.filter(function (el) {
      return el.start.value < date
    });
    oldStreats.sort(function (a, b) {
      return parseInt(a.start.value) - parseInt(b.start.value)
    });
    this.dataPrevious = oldStreats;

    // const oldList = document.querySelector("#oldStraten");
    //
    // while (oldList.firstChild) {
    //   oldList.removeChild(oldList.firstChild);
    // }
    //
    // oldStreats.forEach(function (el) {
    //   let entry = document.createElement('li');
    //   entry.appendChild(document.createTextNode(el.naam.value));
    //   oldList.appendChild(entry);
    // });

    const list = document.querySelector("#straten");

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    newStreats.forEach(function (el) {
      let entry = document.createElement('li');
      entry.appendChild(document.createTextNode(el.naam.value));
      list.appendChild(entry);
    });
    console.log(newStreats);
    map.renderStreats();
  }
}

export default data;
