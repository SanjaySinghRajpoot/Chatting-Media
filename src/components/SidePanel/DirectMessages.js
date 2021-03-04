import React from 'react';
import firebase from '../../firebase';
import { Menu, Icon, MenuItem } from 'semantic-ui-react';

class DirectMessages extends React.Component{
    state={
        user: this.props.currentUser,
        users: [],
        usersRef: firebase.database().ref('user'),
        connectRef: firebase.database().ref('.info/connected'),
        presenceRef: firebase.database().ref('presence')
    }

    addListeners = currentUser => {
        let loadedUsers = [];
        this.state.usersRef.on('child_added', snap=> {
            if(currentUserUid !== snap.key){
                let user = snap.wal();
                user['uid'] = snap.key;
                user['status'] = 'offline';
                loadedUsers.push(user);
                this.setState({ users: loadedUsers});

            }
        })

        this.state.connectRef.on('value', snap => {
           if(snap.val() === true){
             const ref = this.state.presenceRef.child(currentUserUid);
             ref.set(true);
             ref.onDisconnect().remove(err => {
                 if(err !== null){
                     console.error(err);
                 }
             })
           }
        });
    }

    componentDidMount() {
        if(this.state.user){
            this.addListeners(this.state.user.uid);
        }
    }


    addListeners = currentUserUid => {

    }
  
    render(){
        const { users } = this.state;

        return(
          <Menu.Menu className="menu">
              <Menu.Item>
                  <span>
                      <Icon name="mail"/> DIRECT MESSAGE
                  </span>
                  ({ users.length })
              </Menu.Item>

          </Menu.Menu>
        )
    }
}

export default DirectMessages;