import React from 'react';
import mime from 'mime-types';   //to check the file format    
import {Modal, Input, Button, Icon} from 'semantic-ui-react';


class FileModal extends React.Component{    // to open new tab to add images and media
    state = {
        file : null,
        authorized: ['image/jpeg', 'image/png']
 
    }
    
    addFile = event => {
        const file = event.target.files[0];
        if(file){
          this.setState({file});

        }
    }

    sendFile = () => {
        const { file } = this.state;
        if(file !== null){
            if(this.isAuthorized(file.name)){
              const metadata = {contentType: mime.lookup(file.name)};
            }
        }
    }

    isAuthorized = filename => this.state.authorized.includes(mime.lookup(filename));
    
    render() {
        const { modal, closeModal } = this.props;

        return(   // control input
           <Modal basic open={modal} onClose={closeModal}>  
              <Modal.Header>Select an Image File</Modal.Header>
           <Modal.Content>
             <Input 
              onChange={this.addFile}
              fluid label="File types: jpg,png"
              name="file"
              type="file"
             />
           </Modal.Content>
           <Modal.Actions>
               <Button
                 onClick={this.sendFile}
                 color="green"
                 inverted
               >
               <Icon name="checkmark" />Send     

               </Button>
               <Button
                 color="red"
                 inverted
                 onClick={closeModal}
               >
               <Icon name="remove" />Cancel

               </Button>
           </Modal.Actions>
           
           </Modal>
        )
    }
}


export default FileModal;