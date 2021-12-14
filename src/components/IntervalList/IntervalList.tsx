import React, { useState } from 'react';
import styles from './IntervalList.module.css';
import Interval from '../../models/Interval';

interface IntervalListProps {
    intervals: Interval[],
    setter: Function
}

function IntervalList(props: IntervalListProps) {

    const handleRemove = (n: number) => {
        let newArray: Interval[] = [];
        props.intervals.forEach((interval: Interval, i: number) => {
            if (i != n) newArray.push(interval);
        })
        props.setter(newArray);
    }

    return (
        <table className={styles.IntervalList}>
            <thead>
                <tr>
                    <th>Ratio</th>
                    <th></th>
                    <th>Distance</th>
                    <th>Cents</th>
                    <th>Limit</th>
                    <th>Coordinates</th>
                    <th>Distance Coordinates</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                {props.intervals.map((interval, i) => {
                    return <tr key={i}>
                        <td>{interval.num} / {interval.denom}</td>
                        <td>{interval.ratio.toFixed(5)}</td>
                        <td>{interval.distance.toFixed(5)}</td>
                        <td>{Math.round(interval.cents)}</td>
                        <td>{interval.limit}-limit</td>
                        <td>[{interval.coordinates.join(", ")}]</td>
                        <td>[{interval.distanceCoordinates.join(", ")}]</td>
                        <td onClick={() => handleRemove(i)}>X</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}

export default IntervalList;