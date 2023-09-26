export default () => {
  self.onmessage = function (e) {

    function fb(n) {
      if (n <= 2) {
        return 1;
      }
      return fb(n - 1) + fb(n - 2);
    }
    self.postMessage(fb(e.data));
  };
};
