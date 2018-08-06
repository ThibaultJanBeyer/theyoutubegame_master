class Index {
  constructor() {
    this.nodes = {};
    this.nodes.create = document.querySelector('.js-Create');
    this.nodes.join = document.querySelector('.js-Join');
  }

  init() {
    this.setupListeners();
    return this;
  }

  setupListeners() {
    this.nodes.create.addEventListener('submit', e => this.handleCreate(e));
    this.nodes.join.addEventListener('submit', e => this.handleJoin(e));
  }

  handleCreate(e) {
    e.preventDefault();
    location.href = `m/${this.generateUID()}`;
  }

  handleJoin(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    location.href = `s/${fd.get('code')}?name=${encodeURI(fd.get('name'))}`;
  }

  generateUID() {
    const firstPart = (Date.now() * Math.random()).toString(36).slice(-2);
    const secondPart = (Math.random() * Math.random()).toString(36).slice(-2);
    const thirdPart = (Date.now() * Math.random()).toString(36).slice(-2);
    return firstPart + secondPart + thirdPart;
  }
}

const index = new Index().init();
