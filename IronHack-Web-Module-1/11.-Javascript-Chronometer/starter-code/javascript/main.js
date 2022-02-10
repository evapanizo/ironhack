let chronometer = new Chronometer();
const btnLeft     = document.getElementById('btnLeft');
const btnRight    = document.getElementById('btnRight');
const minDec      = document.getElementById('minDec');
const minUni      = document.getElementById('minUni');
const secDec      = document.getElementById('secDec');
const secUni      = document.getElementById('secUni');
const tenDec      = document.getElementById('tenDec');
const tenUni      = document.getElementById('tenUni');
const splitsList  = document.getElementById('splits');
let intervalId    = null;

function printTime () {
  intervalId = setInterval( () => {
    if(chronometer.currentTime === 6000000) {
      setBtnStyle();
      setStopBtn();
    } else {
      printMinutes();
      printSeconds();
      printTenthsOfSecond();
    }
  }, 10);
}

function printMinutes () {
  minDec.innerText = chronometer.minutes[0];
  minUni.innerText = chronometer.minutes[1];
}

function printSeconds () {
  secDec.innerText = chronometer.seconds[0];
  secUni.innerText = chronometer.seconds[1];
}

function printTenthsOfSecond () {
  tenDec.innerText = chronometer.tenthsOfSecond[0];
  tenUni.innerText = chronometer.tenthsOfSecond[1];
}

function clearSplits () {
  splits.innerHTML = '';
}

function setStopBtn () {
  btnLeft.innerText = 'START';
  btnRight.innerText = 'RESET';
  clearInterval(intervalId);
  intervalId  = null;
  chronometer.stopClick();
}

function setSplitBtn () {
  const newSplit = document.createElement('li');
  newSplit.innerText = chronometer.splitClick();
  splitsList.appendChild(newSplit);
}

function setStartBtn () {
  btnLeft.innerText = 'STOP';
  btnRight.innerText = 'SPLIT';
  chronometer.startClick();
  printTime();
}

function setResetBtn () {
  chronometer.resetClick();
  printMinutes();
  printSeconds();
  printTenthsOfSecond();
  clearSplits();
}

function setBtnStyle () {
  btnLeft.classList.toggle('start');
  btnLeft.classList.toggle('stop');
  btnRight.classList.toggle('reset');
  btnRight.classList.toggle('split');
}

// Start/Stop Button
btnLeft.addEventListener('click', function () {
  // CSS Styles
  setBtnStyle();
  // TAG Text
  if(btnLeft.innerText === 'START') {
    setStartBtn();
  } else {
    setStopBtn();
  }
});

// Reset/Split Button
btnRight.addEventListener('click', function () {
  if(btnRight.innerText === 'SPLIT') {
    setSplitBtn();
  } else {
    setResetBtn();
  }
});
