import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessagesForm";
import Message from "./Message";

class Messages extends React.Component {
  state = {
    messagesRef: firebase.database().ref("messages"),  //DATA is sent to firebase From MessageForm
    messages: [],
    messagesLoading: true,
    channel: this.props.currentChannel,
    user: this.props.currentUser,       //set the value of current user
    progressBar: false
  };

  componentDidMount() {        //core of messages
    const { channel, user } = this.state;    //get the user and the channel value 

    if (channel && user) {      //check wheather they are empty or not
      this.addListeners(channel.id);
    }
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);   
  };

  addMessageListener = channelId => {
    let loadedMessages = [];
    this.state.messagesRef.child(channelId).on("child_added", snap => {
      loadedMessages.push(snap.val());      //pushing messages
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
      this.countUniqueUsers(loadedMessages);
    });
  };

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {    //reduce is doing to take a unique user and add it to the list 
      if(!acc.includes(message.user.name)){
           acc.push(message.user.name);
      }
      return acc;
    }, []);

    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ?  "s": ""}`;        //singular user 
    this.setState({ numUniqueUsers });

  }

  displayMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp} 
        message={message}
        user={this.state.user}
      />
    ));

    isProgressBarVisible = percent => {
      if(percent>0){
        this.setState({progressBar: true});
      }
    }

    displayChannelName = channel => channel ? `#${channel.name}`:'';

    render() {
      const { messagesRef, messages, channel, user, progressBar, numUniqueUsers } = this.state;
  
      return (
        <React.Fragment>
          <MessagesHeader 
            channelName={this.displayChannelName(channel)}
            numUniqueUsers= {numUniqueUsers}
          />
  
          <Segment>
            <Comment.Group className={progressBar ? 'messages_progress' : 'messages'}>
              {this.displayMessages(messages)}
            </Comment.Group>
          </Segment> 
  
          <MessageForm                  //passing values to function
            messagesRef={messagesRef}
            currentChannel={channel}
            currentUser={user}
            isProgressBarVisible={this.isProgressBarVisible}
          />
        </React.Fragment>
      );
    }
  }
  
  export default Messages;
  
