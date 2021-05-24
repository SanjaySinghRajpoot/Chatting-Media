import React from "react";
import {Header, Accordion, Icon, Segment } from "semantic-ui-react"

class MetaPanel extends React.Component {
 
   state  = {
     activeIndex : 0,
     

   }
 
 
  render() {
    return (
      <Segment>
        <Header as="h3" attached="top">
           About # Channel
        </Header>
        <Accordion styled attached="true">
          <Accordion.Title 
           active={activeIndex === 0}
           index = {0} 
           >
           </Accordion.Title>

        </Accordion>
      </Segment>
    );
  }
}

export default MetaPanel;
