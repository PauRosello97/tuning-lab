import React, { useState } from 'react';
import styles from './App.module.css';
import Interval from './models/Interval';
import Button from './components/Button/Button';
import IntervalList from './components/IntervalList/IntervalList';

function App() {

  const [intervals, setIntervals] = useState<Interval[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const calcGCD = (a: number, b: number): number => {
    return b ? calcGCD(b, a % b) : a;
  };

  const findFactors = (num: number): number[] => {
    let factors: number[] = [];
    for (let i = 1; i <= num; i++) {
      if (num % i == 0) {
        factors.push(i);
        num /= i;
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

  const handleAddInterval = () => {
    let splittedInput: string[] = inputValue.split("/");
    if (splittedInput.length == 2) {
      let num = parseInt(splittedInput[0]);
      let denom = parseInt(splittedInput[1]);

      if (Number.isInteger(num) && Number.isInteger(denom)) {
        let ratio: number[] = reduce(num, denom);
        num = ratio[0];
        denom = ratio[1];
        let numFactors: number[] = findFactors(num);
        let denomFactors: number[] = findFactors(denom);
        let limit: number = 0;
        const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41];
        numFactors.forEach(factor => { if (factor > limit) limit = factor });
        denomFactors.forEach(factor => { if (factor > limit) limit = factor });

        let interval: Interval = {
          num,
          denom,
          ratio: num / denom,
          tenneyDistance: Math.log2(LCM(num, denom)),
          cents: 1200 * Math.log2(num / denom),
          numFactors,
          denomFactors,
          limit
        }
        setIntervals(intervals => [...intervals, interval]);
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
