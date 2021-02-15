import React from 'react';
import firebase from '../../firebase';

import { Icon, Menu, Modal, Form, Input, Button } from 'semantic-ui-react';

class Channels extends React.Component {

    state = {
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        modal: false
    };

    addChannel = () => {
        const {channelsRef, channelDetails, channelName, user} = this.state;
        
        const key = channelsRef.push().key;
        
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name:   user.displayName,
                avatar: user.photoURL
            }
        };

        channelsRef
          .child(key)
          .update(newChannel)
          .then(() => {
            this.setState({channelName: '', channelDetails:''});
            this.closeModal();
             console.log('channel added');

          })
         .catch(err=>{
            console.error(err);
        }) 
    }

    handleSubmit = event => {
      event.preventDefault();
      if(this.isFormValid(this.state)){
          this.addChannel();
      }
    }

    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   isFormValid =    ({channelName, channelDetails}) => channelName && channelDetails;

    openModal = () => this.setState({ modal: true });        // open Modal tab
    closeModal = () => this.setState({ modal: false });      // close

    render() {
        const { channels, modal } = this.state;

        return (
            <React.Fragment>
                <Menu.Menu style={{ padding: '1em' }}>
                    <Menu.Item>
                        <span>
                            <Icon name="exchange" />CHANNELS
                        </span>{" "}
                    ({channels.length})<Icon name=" add " onClick={this.openModal} />
                    </Menu.Item>

                    <Modal basic open={modal} onClose={this.closeModal}>
                        <Modal.Header> Add a Channel </Modal.Header>
                        <Modal.Content>
                            <Form onSubmit ={this.handleSubmit}>
                                <Form.Field>
                                    <Input
                                        fluid
                                        label="Name of channel"
                                        name="channelName"
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        fluid
                                        label="About the Channels"
                                        name="channelsDetails"
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                            </Form>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button color="green" inverted onClick={this.handleSubmit}> 
                                <Icon name="checkmark" /> Add
                            </Button>
                            <Button color="red" inverted onClick={this.closeModal}>
                                <Icon name="remove" /> Cancel
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </Menu.Menu>
            </React.Fragment>
        );
    }
}

export default Channels;