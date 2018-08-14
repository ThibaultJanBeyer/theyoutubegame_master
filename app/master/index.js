class Index {
  constructor() {
    this.nodes = {};
    this.nodes.app = document.querySelector('.app');
    this.nodes.info = document.querySelector('#info');
  }

  init() {
    this.connect();
    return this;
  }

  connect() {
    this.channel = location.pathname.split('/m/')[1];
    this.ws = new WebSocket(`ws://localhost:40510/?channel=${this.channel}&type='master'`);
    this.ws.onopen = this.onOpen.bind(this);
    this.ws.onmessage = this.onMessage.bind(this);
  }

  // event emmited when connected
  onOpen() {
    console.log('websocket is connected ...');
    this.nodes.info.innerHTML += `connected with ${this.channel}<br>`;

    // sending a send event to websocket server
    this.ws.send(JSON.stringify({
      type: 'setup',
      channel: this.channel
    }));
  }

  // event emmited when receiving message 
  onMessage(ev) {
    console.log('message', ev.data);
    this.nodes.info.innerHTML += 'Message: connected<br>';
  }
}

  

}

const webSocketHandler = new WebSocketHandler();


const index = new Index().init();
