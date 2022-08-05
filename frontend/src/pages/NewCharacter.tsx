import { useNavigate } from 'solid-app-router';
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Row,
} from 'solid-bootstrap';
import { createSignal, For } from 'solid-js';
import { NewCharacterProps } from '../../../shared/types/Character';
import { StateStore, useState } from '../providers/StateProvider';
import { createCharacter } from '../services/gameRequests';

type KeyValue = {
  [key: string]: number;
};

const NewCharacter = () => {
  const navigate = useNavigate();
  const [state, { recaptureCharacters }] = useState() as StateStore;
  const [getName, setName] = createSignal('');
  const [getGender, setGender] = createSignal(0);
  const [getRace, setRace] = createSignal(0);
  const [getPointsToUse, setPointsToUse] = createSignal(
    state.newCharacters.startingPoints,
  );
  const [getTraits, setTraits] = createSignal({
    health: 0,
    strength: 0,
    defence: 0,
    wisdom: 0,
    dexterity: 0,
    intelligence: 0,
    accuracy: 0,
    speed: 0,
    luck: 0,
  } as KeyValue);

  const addTrait = (traitName: string) => {
    if (getPointsToUse() === 0) {
      return;
    }
    setTraits((curr) => ({
      ...curr,
      [traitName]: curr[traitName] + 1,
    }));
    setPointsToUse((curr) => (curr -= 1));
  };

  const removeTrait = (traitName: string) => {
    if (getTraits()[traitName] === 0) {
      return;
    }
    setTraits((curr) => ({
      ...curr,
      [traitName]: curr[traitName] - 1,
    }));
    setPointsToUse((curr) => (curr += 1));
  };

  const handleReset = () => {
    setPointsToUse(state.newCharacters.startingPoints);
    setTraits({
      health: 0,
      strength: 0,
      defence: 0,
      wisdom: 0,
      dexterity: 0,
      intelligence: 0,
      accuracy: 0,
      speed: 0,
      luck: 0,
    });
  };

  const handleSave = async () => {
    if (getName() && getGender() && getRace()) {
      const character: NewCharacterProps = {
        name: getName(),
        raceId: getRace(),
        genderId: getGender(),
        traits: getTraits(),
      };
      await createCharacter(character);
      await recaptureCharacters();
      navigate('/characters');
    }
  };

  return (
    <Container>
      <Row>
        <Col class="text-center">
          <h1>Create a new character</h1>
        </Col>
      </Row>
      <Row style={{ 'margin-top': '25px' }}>
        <Col class="text-center">
          <u>General information</u>
        </Col>
      </Row>
      <Row>
        <Col xs={2} />
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={getName()}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                value={getGender()}
                onChange={(e) => setGender(parseInt(e.currentTarget.value, 10))}
              >
                <option value={0}>Choose an option</option>
                <For each={state.genders}>
                  {(gender) => <option value={gender.id}>{gender.name}</option>}
                </For>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Race</Form.Label>
              <Form.Select
                value={getRace()}
                onChange={(e) => setRace(parseInt(e.currentTarget.value, 10))}
              >
                <option value={0}>Choose an option</option>
                <For each={state.races}>
                  {(race) => <option value={race.id}>{race.name}</option>}
                </For>
              </Form.Select>
            </Form.Group>
            <p>Traits</p>
            {Object.keys(getTraits()).map((traitName) => (
              <Form.Group>
                <Row>
                  <Col xs={6}>
                    <FormControl readOnly value={traitName} />
                  </Col>
                  <Col xs={3}>
                    <ButtonGroup>
                      <Button onClick={() => addTrait(traitName)}>+</Button>
                      <Button onClick={() => removeTrait(traitName)}>-</Button>
                    </ButtonGroup>
                  </Col>
                  <Col xs={3}>
                    <FormControl readOnly value={getTraits()[traitName]} />
                  </Col>
                </Row>
              </Form.Group>
            ))}
            <Row>
              <Col xs={6}></Col>
              <Col xs={3}>
                <Button onClick={handleReset}>Reset</Button>
              </Col>
              <Col xs={3}></Col>
            </Row>
            <Row>
              <Col xs={3}></Col>
              <Col xs={6}>
                <Button onClick={handleSave}>Save</Button>
              </Col>
              <Col xs={3}></Col>
            </Row>
          </Form>
        </Col>
        <Col xs={2} />
      </Row>
    </Container>
  );
};

export default NewCharacter;
