import { useNavigate } from 'solid-app-router';
import { Button, Col, Container, Row } from 'solid-bootstrap';
import { Accessor, createResource, For } from 'solid-js';
import { Gender } from '../../../shared/types/Gender';
import { Monster } from '../../../shared/types/Monster';
import { Race } from '../../../shared/types/Race';
import { fetchResources } from '../services/adminRequests';

const Monsters = () => {
  const navigate = useNavigate();
  const [monsters] = createResource(fetchResources('monsters'));
  const [races] = createResource(fetchResources('races'));
  const [genders] = createResource(fetchResources('genders'));
  return (
    <Container>
      <h1 class="text-center">Monsters</h1>
      <Row>
        <Col>
          <h4>
            <u>NAME</u>
          </h4>
        </Col>
        <Col>
          <h4>
            <u>GENDER</u>
          </h4>
        </Col>
        <Col>
          <h4>
            <u>RACE</u>
          </h4>
        </Col>
        <Col>
          <h4>
            <u>LEVEL</u>
          </h4>
        </Col>
        <Col>
          <h4>
            <u>EXPERIENCE</u>
          </h4>
        </Col>
        <Col />
        <Col />
      </Row>
      <For each={monsters()}>
        {(monster: Monster, index: Accessor<number>) => (
          <Row
            style={{
              'border-bottom': '1px solid grey',
            }}
          >
            <Col>{monster.name}</Col>
            <Col>
              {
                genders()?.find(
                  (gender: Gender) => gender.id === monster.genderId,
                ).name
              }
            </Col>
            <Col>
              {races()?.find((race: Race) => race.id === monster.raceId).name}
            </Col>
            <Col>{monster.level}</Col>
            <Col>{monster.experience}</Col>
            <Col>
              <Button
                size="sm"
                variant="success"
                onClick={() => navigate(`/admin/monsters/${monster.id}`)}
              >
                CHANGE
              </Button>
            </Col>
          </Row>
        )}
      </For>
    </Container>
  );
};

export default Monsters;
