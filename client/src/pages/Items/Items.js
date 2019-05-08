import React from 'react';
import {Button} from '@material-ui/core'

const Items = ({ classes }) => {
  return (
    <div>
      <p>
        This is the items page located at <code>/items</code>.
      </p>
      <ItemButton />
    </div>
  );
};
class ItemButton extends React.Component {
  render() {
    return <Button>Click me</Button>;
  }
}

export default Items;

