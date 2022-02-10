// Constructor
function Chronometer () {
  const self = this;
  self.currentTime = 0;
  self.intervalId = null;
}

Chronometer.prototype.startClick = function () {
  const self = this;
  self.intervalId = setInterval( () => {
    self.currentTime += 10;
    self.setTime();
  }, 10);
};

Chronometer.prototype.setTenthsOfSecond = function () {
  const self = this;
  return parseInt(self.currentTime / 10) % 100;
};

Chronometer.prototype.setSeconds = function () {
  const self = this;
  return parseInt(self.currentTime / 1000) % 60;
};

Chronometer.prototype.setMinutes = function () {
  const self = this;
  return parseInt(self.currentTime / 60000);
};

Chronometer.prototype.twoDigitsNumber = function (value) {
  return value < 10 ? '0' + value : value.toString();
};

Chronometer.prototype.setTime = function () {
  const self = this;
  self.tenthsOfSecond = self.twoDigitsNumber(self.setTenthsOfSecond());
  self.seconds = self.twoDigitsNumber(self.setSeconds());
  self.minutes = self.twoDigitsNumber(self.setMinutes());
};

Chronometer.prototype.stopClick = function () {
  const self = this;
  clearInterval(self.intervalId);
};

Chronometer.prototype.resetClick = function () {
  const self = this;
  self.currentTime = 0;
  self.minutes = '00';
  self.seconds = '00';
  self.tenthsOfSecond = '00';
};

Chronometer.prototype.splitClick = function () {
  const self = this;
  return `${self.minutes}:${self.seconds}:${self.tenthsOfSecond}`;
};
