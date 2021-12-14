import React, { useState } from 'react';
import styles from './App.module.css';
import Interval from './models/Interval';
import Button from './components/Button/Button';
import IntervalList from './components/IntervalList/IntervalList';

function App() {

  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
  const coordDistances = [1, 1.58496, 2.32193, 2.80735, 3.45943, 3.70044, 4.08746, 4.24793, 4.52356, 4.85798, 4.95420, 5.20945, 5.35755, 5.42626, 5.55459, 5.72792, 5.88264, 5.93074, 6.06609, 6.14975, 6.18982, 6.30378, 6.37504, 6.47573, 6.59991];

  const calcGCD = (a: number, b: number): number => {
    return b ? calcGCD(b, a % b) : a;
  };

  const findFactors = (num: number): number[] => {
    let factors: number[] = [];

    for (let i = 0; i <= num; i++) {
      if (num % primes[i] == 0) {
        factors.push(primes[i]);
        num /= primes[i];
        i = -1;
      }
    }
    return factors;
  }

  const reduce = (numerator: number, denominator: number): number[] => {

    let gcd = calcGCD(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }

  const LCM = (x: number, y: number): number => {
    return (!x || !y) ? 0 : Math.abs((x * y) / calcGCD(x, y));
  }

  const getCoordinates = (ratio: number[]): number[] => {
    let num = ratio[0];
    let denom = ratio[1];
    let commonLimit = getLimit(ratio[0], ratio[1]);
    let nDimensions = primes.indexOf(commonLimit) + 1;
    let coordinates: number[] = [];
    for (let j = 0; j < nDimensions; j++) coordinates[j] = 0;

    let i: number = 0;
    while ((num != 1 || denom != 1) && i < 10) {
      console.log(i);
      i++;
      let numLimit = getSingleLimit(num);
      let denomLimit = getSingleLimit(denom);
      console.log("Entra :" + num + ", " + denom);
      if (numLimit > denomLimit) {
        num /= numLimit;
        //denom /= (numLimit - 1);
        coordinates[primes.indexOf(numLimit)]++;
      } else {
        //num /= (denomLimit - 1);
        denom /= denomLimit;
        coordinates[primes.indexOf(denomLimit)]--;
      }
      console.log("Mid :" + num + ", " + denom);
      while (!Number.isInteger(num)) {
        num *= 2;
        coordinates[0]--;
      }
      while (!Number.isInteger(denom)) {
        denom *= 2;
        coordinates[0]++;
      }
      console.log("Surt :" + num + ", " + denom);
    }
    return coordinates;
  }

  const getLimit = (num: number, denom: number): number => {
    let limit: number = 0;
    let numFactors: number[] = findFactors(num);
    let denomFactors: number[] = findFactors(denom);
    numFactors.forEach(factor => { if (factor > limit) limit = factor });
    denomFactors.forEach(factor => { if (factor > limit) limit = factor });
    return limit;
  }

  const getSingleLimit = (n: number): number => {
    let limit: number = 0;

    let factors: number[] = findFactors(n);
    factors.forEach(factor => { if (factor > limit) limit = factor });
    return limit;
  }

  const getDistanceCoordinates = (coordinates: number[]): number[] => {
    let distCoords: number[] = [];
    coordinates.forEach((value: number, i: number) => {
      distCoords[i] = Math.abs(value * coordDistances[i]);
    });
    return distCoords;
  }

  const handleAddInterval = () => {
    let splittedInput: string[] = inputValue.split("/");
    if (splittedInput.length == 2) {
      let num = parseInt(splittedInput[0]);
      let denom = parseInt(splittedInput[1]);

      if (Number.isInteger(num) && Number.isInteger(denom)) {
        let ratio: number[] = reduce(num, denom);
        num = ratio[0];
        denom = ratio[1];

        let limit: number = getLimit(num, denom);
        let coordinates = getCoordinates(ratio);
        let distanceCoordinates = getDistanceCoordinates(coordinates);

        let interval: Interval = {
          num,
          denom,
          ratio: num / denom,
          distance: Math.log2(LCM(num, denom)),
          cents: 1200 * Math.log2(num / denom),
          limit,
          coordinates,
          distanceCoordinates
        }
        intervals.push(interval);
        intervals.sort((a: Interval, b: Interval) => a.ratio - b.ratio);
        setIntervals(intervals);
      }

    }
    setInputValue('');
  }

  return (
    <div className={styles.App}>
      <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      <Button onClick={handleAddInterval}>Add Interval</Button>
      <IntervalList intervals={intervals} setter={setIntervals} />
    </div>
  );
}

export default App;
