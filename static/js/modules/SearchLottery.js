export default class SearchLottery {
    constructor(fetch) {
        this.fetch = fetch
    }

    search(searching) {
        console.log(searching)
        fetch.feedModalWithAlllotteries(searching)
    }

    // NO USADO, BORRAR
    debounce(func, delay) {
        let debounceTimer;
        return function() {
          const context = this;
          const args = arguments;
          clearTimeout(debounceTimer);
          debounceTimer = setTimeout(() => func(context, args), delay);
        };
      }
}