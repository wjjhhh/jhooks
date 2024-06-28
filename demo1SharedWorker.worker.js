const set = new Set();

self.onconnect = (event) => {
  const port = event.ports[0];
  set.add(port);
  port.onmessage = (ev) => {
    set.forEach((p) => {
      p.postMessage(Date.now());
    });
  };
  port.onmessageerror = (error) => {
    console.log('error', error);
  };
  port.start();
};
