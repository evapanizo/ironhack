'use strict';

// Turn duration of the movies from hours to minutes.
const turnHoursToMinutes = movies => {
  if(!movies.length) { return []; }
  const minuteDuration = movies.map( movie => {
    const isHours = movie.duration.indexOf('h') !== -1;
    const isMinutes = movie.duration.indexOf('m') !== -1;
    let time;
    if (isHours && isMinutes) {
      time = movie.duration.replace(/[^0-9 ]/g,"").split(" ");
    } else if (isHours) {
      time = [ movie.duration.replace(/[^0-9]/g,""), 0 ];
    } else if (isMinutes) {
      time = [ 0 , movie.duration.replace(/[^0-9]/g,"") ];
    }
    return { "duration" : parseInt(time[0]) * 60 + parseInt(time[1]) }
  });
  return minuteDuration;
}

// Get the average of all rates with 2 decimals.
const ratesAverage = movies => {
  if (!movies.length) { return 0; }
  const sum = movies.reduce( (accumulator, currentValue) => {
    if(currentValue.rate === '') { currentValue.rate = 0; }
    return accumulator + parseFloat(currentValue.rate);
  }, 0);
  return Math.round(sum / movies.length * 100) / 100;
}

// Get the average of Drama Movies.
const dramaMoviesRate = movies => {
  if (!movies.length) { return 0; }
  const dramaMovies = movies.filter( movie => {
    return movie.genre.indexOf('Drama') !== -1;
  })
  if(!dramaMovies.length) { return ; }
  return ratesAverage(dramaMovies);
}

// Order by time duration, in growing order.
const orderByDuration = movies => {
  return movies.sort( (a,b) => {
    if (a.duration === b.duration) {
      if (a.title > b.title) { return 1; }  
      if (a.title < b.title) { return -1; }
      return 0;
    }
    return a.duration - b.duration;
  });
}

// How many movies did Steven Spielberg.
const howManyMovies = movies => {
  if (!movies.length) { return ; }
  const stevenDramaMovies = movies.filter( movie => {
    return movie.genre.indexOf('Drama') !== -1 && movie.director === 'Steven Spielberg';
  })
  return `Steven Spielberg directed ${stevenDramaMovies.length} drama movies!`;
}

// Order by title and print the first 20 titles.
const orderAlphabetically = movies => {
  if (!movies.length) { return []; }
  const titlesArray = movies.map( movie => movie.title );
  titlesArray.sort().splice(20);
  return titlesArray;
}

// Best yearly rate average.
const listOfYearRates = movies => {
  return movies.reduce( (accumulator, currentValue) => {
    if (!accumulator[currentValue.year]) {
      accumulator[currentValue.year] = [currentValue];
    } else {
      accumulator[currentValue.year].push(currentValue);
    }
    return accumulator;
  }, {} );
}

const findBestYear = yearRates => {
  let bestYear = [null, 0];
  for (let key in yearRates) {
    const rate = ratesAverage(yearRates[key]);
    if(rate > bestYear[1]) { 
      bestYear = [key, rate]; 
    } else if (rate === bestYear[1]) {
      bestYear[0] > key ? bestYear[0] = key : null;
    }
  }
  return bestYear;
}

const bestYearAvg = movies => {
  if (!movies.length) { return ; }
  const yearRates = listOfYearRates(movies);
  const bestYear = findBestYear(yearRates);
  return `The best year was ${bestYear[0]} with an average rate of ${bestYear[1]}`;
}