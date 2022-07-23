class BitfinexWebSocket {
  ws: WebSocket | null;

  constructor() {
    this.ws = null;
  }

  connect(cb: Function) {
    this.ws = new WebSocket(`wss://api.bitfinex.com/ws/2`);

    this.ws.onmessage = (event) => {
      const json = JSON.parse(event.data);
      try {
        if ((json.event = 'data')) {
          const data = json[1];
          if (data.length === 3) {
            cb(data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };

    let msg = JSON.stringify({
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
    });

    this.ws.onopen = () => {
      if (this.ws) {
        this.ws.send(msg);
      }
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
  }
}

export default BitfinexWebSocket;
