
const data = {
  data: null,
  dataFiltert: null,
  filter(date) {
    console.log(this.data);
    let array = this.data.results.bindings.filter(function (el) {
      return el.start.value === date
    });
    console.log(array);

    const list = document.querySelector("#straten");

    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    array.forEach(function (el) {
      let entry = document.createElement('li');
      entry.appendChild(document.createTextNode(el.naam.value));
      list.appendChild(entry);
    });

  }
}

export default data;
