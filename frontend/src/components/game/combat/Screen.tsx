import { Col, ListGroup, ProgressBar, Row } from 'solid-bootstrap';
import {
  CombatStageValues,
  CombatStatistics,
} from '../../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../../providers/StateProvider';

const Screen = () => {
  const [state] = useState() as StateStore;
  const getHpProgress = (combatState: CombatStatistics) => {
    return Math.floor((combatState.HP / combatState.MAXHP) * 100);
  };
  const getManaProgress = (combatState: CombatStatistics) => {
    return Math.floor((combatState.MANA / combatState.MAXMANA) * 100);
  };

  const getHpVariant = (combatState: CombatStatistics) => {
    const value = Math.floor((combatState.HP / combatState.MAXHP) * 100);
    if (value > 60) return 'success';
    if (value > 50) return 'info';
    if (value > 25) return 'warning';
    if (value > 0) return 'danger';
    return 'danger';
  };

  const getStageValues = () => {
    const stageValues = state.characterState?.stageValues as CombatStageValues;
    return stageValues;
  };
  return (
    <>
      <Row>
        <Col xs={4}>{getStageValues().monsterCombatState.name}</Col>
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          {`${getStageValues().monsterCombatState.HP} / ${
            getStageValues().monsterCombatState.MAXHP
          }`}
        </Col>
      </Row>
      <Row>
        <Col xs={4} />
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          <ProgressBar
            now={getHpProgress(getStageValues().monsterCombatState)}
            variant={getHpVariant(getStageValues().characterCombatState)}
          />
        </Col>
      </Row>
      <ListGroup style={{ height: '45vh', 'margin-top': '15px' }}>
        {getStageValues()
          .roundHistory.map(({ roundText }) => (
            <ListGroup.Item>{roundText}</ListGroup.Item>
          ))
          .slice(0, 10)}
      </ListGroup>
      <Row>
        <Col xs={4}>{getStageValues().characterCombatState?.name}</Col>
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          {`HP: ${getStageValues().characterCombatState?.HP} / ${
            getStageValues().characterCombatState?.MAXHP
          }`}
        </Col>
      </Row>
      <Row>
        <Col xs={4} />
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          <ProgressBar
            now={getHpProgress(getStageValues().characterCombatState!)}
            variant={getHpVariant(getStageValues().characterCombatState!)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={4} />
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          {`MANA: ${getStageValues().characterCombatState?.MANA} / ${
            getStageValues().characterCombatState?.MAXMANA
          }`}
        </Col>
      </Row>
      <Row>
        <Col xs={4} />
        <Col xs={2} />
        <Col xs={2} />
        <Col xs={4}>
          <ProgressBar
            now={getManaProgress(getStageValues().characterCombatState!)}
            variant="default"
          />
        </Col>
      </Row>
    </>
  );
};

export default Screen;
