import BadgerLoginStatusContext from '../contexts/BadgerLoginStatusContext';
import React, { useEffect, useContext } from 'react';

export default function BadgerLogout() {

    const [ loginStatus, setLoginStatus ] = useContext(BadgerLoginStatusContext);

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw6/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setLoginStatus({
                loggedIn: false,
                username: '', 
            });
            alert('You have been logged out!')
            sessionStorage.removeItem('loginStatus');
        })
    }, [setLoginStatus]);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}
