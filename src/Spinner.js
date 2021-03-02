import React from "react";

import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => (
  <Dimmer>
    <Loader size="huge " content={"Loading Chat"} />
  </Dimmer>
);

export default Spinner;
