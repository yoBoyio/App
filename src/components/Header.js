import React, { useCallback } from 'react';
import "./Header.css"
import firebase from "../firebase"
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Header = props => {

    const clearChat = useCallback(() => {
        props.setMessages(m => m.map(msg => {return {...msg, deleted: true}}))
    }, [props])

    const clearTwitch = useCallback(() => {
        props.setMessages(messages => messages.map(msg => {return {...msg, deleted: msg.platform === "twitch"}}))
    }, [props])
    
    const clearDiscord = useCallback(() => {
        props.setMessages(messages => messages.map(msg => {return {...msg, deleted: msg.platform === "discord"}}))
    }, [props])

    const signout = useCallback(async () => {
        await firebase.logout()
        localStorage.removeItem("userId")
        localStorage.removeItem("messages")
        props.history.push("/")
    }, [props.history]) 

    return (
        <header className="header">
            <nav className="nav">
                <Button variant="contained" onClick={clearChat}>Clear Chat</Button>
                <Button variant="contained" onClick={clearTwitch}>Clear Twitch Chat</Button>
                <Button variant="contained" onClick={clearDiscord}>Clear Discord Chat</Button>
                <Button variant="contained" color="primary" onClick={signout}>Sign Out</Button>
            </nav>
        </header>
    );
} 

export default withRouter(Header); 
