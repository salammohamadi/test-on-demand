import React from 'react';
import { Form, Button, OverlayTrigger, Popover } from 'react-bootstrap';

const SummaryForm = () => {
  const [checked, setChecked] = React.useState(false);

  const popover = (
    <Popover id='termsandconditions-popover'>
      <Popover.Content>No ice cream will actually be delivered</Popover.Content>
    </Popover>
  );

  const checkboxLabel = (
    <span>
      I agree to
      <OverlayTrigger overlay={popover} placement='right'>
        <span style={{ color: 'blue' }}> Terms and Conditions</span>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <Form.Group controlId='terms-and-conditions'>
        <Form.Check
          type='checkbox'
          checked={checked}
          onChange={e => setChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant='primary' type='submit' disabled={!checked}>
        Confirm order
      </Button>
    </Form>
  );
};

export default SummaryForm;
