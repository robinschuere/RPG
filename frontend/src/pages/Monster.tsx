import { useParams } from 'solid-app-router';
import { Col, Container, Row, Stack } from 'solid-bootstrap';
import { createResource } from 'solid-js';
import { Gender } from '../../../shared/types/Gender';
import { Profession } from '../../../shared/types/Profession';
import { Race } from '../../../shared/types/Race';
import NameValueColumn from '../components/NameValueColumn';
import StatisticColumn from '../components/StatisticColumn';
import { fetchResource, fetchResources } from '../services/adminRequests';

const Monster = () => {
  const params = useParams();
  const [locations] = createResource(fetchResources('locations'));
  const [monster] = createResource(() => params.id, fetchResource('monsters'));
  const [races] = createResource(fetchResources('races'));
  const [genders] = createResource(fetchResources('genders'));

  const mapStatistic = (name: string) => (
    <StatisticColumn name={name} getCharacter={monster} sm={4} />
  );

  return (
    <Container class="fullwidth text-start">
      <h1 class="text-center">Monster Detail card</h1>
      {monster() && (
        <Stack gap={2}>
          <Row class="text-center">
            <Col>
              <u>Statistics</u>
            </Col>
          </Row>
          <Row>
            <NameValueColumn name="NAME" value={monster().name} sm={12} />
          </Row>
          <Row>
            <NameValueColumn
              name="Race"
              value={races()?.find((g: Race) => g.id === monster().raceId).name}
              sm={6}
            />
            <NameValueColumn
              name="Gender"
              value={
                genders()?.find((g: Gender) => g.id === monster().genderId).name
              }
              sm={6}
            />
          </Row>
          <Row>
            <NameValueColumn name="Lvl" value={monster().level} sm={6} />
            <NameValueColumn
              name="Experience"
              value={monster().experience}
              sm={6}
            />
          </Row>
        </Stack>
      )}
      {JSON.stringify(monster())}
    </Container>
  );
};

export default Monster;
