export default class SearchLottery {
  constructor(fetch) {
    console.log("Esto es de SearchLottery class")

    this.fetch = fetch
  }

  search(searching) {
    console.log(searching)
    this.fetch.feedModalWithAlllotteries(searching)
  }

  /***** NO USADO, BORRAR *****/
  debounce(func, delay) {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func(context, args), delay);
    };
  }
}