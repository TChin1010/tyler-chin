import React from 'react';
import Div from '../components/html/Div';
import Spinner from '../components/html/Spinner';

interface LoadingScreenProps {
    color?: string;
}
/**
 * 
 * @returns Creates and returns a loading screen
 */
export default function LoadingScreen({color}: LoadingScreenProps) {
    return (
        <Div style={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            <h1>Loading</h1>
            <Spinner color={color}></Spinner>
        </Div>
    )
}