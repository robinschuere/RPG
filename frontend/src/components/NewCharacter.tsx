import { Card, Button } from 'solid-bootstrap';
import { StateStore, useState } from '../providers/StateProvider';

type NewCharacterProps = {
  onClick: Function;
};

const NewCharacter = (props: NewCharacterProps) => {
  const { onClick } = props;
  return (
    <Card class="text-center">
      <Card.Img variant="top"></Card.Img>
      <Card.Body>
        <Card.Title>New character</Card.Title>
        <Card.Text>0</Card.Text>
        <Button onClick={() => onClick()}>+</Button>
      </Card.Body>
    </Card>
  );
};

export default NewCharacter;
