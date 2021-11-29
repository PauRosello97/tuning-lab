import React, { useState } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
    children: React.ReactNode,
    onClick: Function
}

function Button(props: ButtonProps) {
    return (
        <div className={styles.Button} onClick={() => props.onClick()}>
            {props.children}
        </div>
    );
}

export default Button;