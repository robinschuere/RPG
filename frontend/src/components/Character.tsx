import { Card, Button } from 'solid-bootstrap';

type CharacterProps = {
  character: any;
  onClick: Function;
};

const Character = (props: CharacterProps) => {
  const { character, onClick } = props;

  // return ;

  return (
    <Card class="text-center mt-4" style={{ width: '18rem' }}>
      <Card.Img variant="top"></Card.Img>
      <Card.Body>
        <Card.Title>{character.name}</Card.Title>
        <Card.Text>{character.level}</Card.Text>
        <Button onClick={() => onClick(character.id)}>Play</Button>
      </Card.Body>
    </Card>
  );
};

export default Character;
