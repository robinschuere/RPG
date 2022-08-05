import {
  Button,
  Col,
  Container,
  ProgressBar,
  Row,
  Stack,
} from 'solid-bootstrap';
import { createEffect, createSignal } from 'solid-js';
import { stageTypes } from '../../../../shared/constants';
import { Character } from '../../../../shared/types/Character';
import { CombatStatistics } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';
import NameValueColumn from '../NameValueColumn';
import StatisticColumn from '../StatisticColumn';

const GameStats = () => {
  const [state, { sendAction }] = useState() as StateStore;
  const [getPoints, setPoints] = createSignal({
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

  createEffect(() => {
    if (
      state.characterState?.character?.points === 0 &&
      getSelectedPoints().length > 0
    ) {
      setPoints({
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
    }
  });

  const getCharacter = () => {
    const character = state.characterState?.character as Character;
    return character;
  };

  const getCharacterCombatState = () => {
    const characterCombatState = state.characterState
      ?.characterCombatState as CombatStatistics;
    return characterCombatState;
  };

  const getRemainingPoints = () => {
    const character = getCharacter();
    let points = 0;
    Object.values(getPoints()).forEach((value: number) => (points += value));
    return character.points - points;
  };

  const handleAddPoint = (name: string) => {
    const oldPoints = getPoints();
    const points = { ...oldPoints } as any;
    points[name] = points[name] + 1;
    setPoints(points);
  };

  const handleRemovePoint = (name: string) => {
    const oldPoints = getPoints();
    const points = { ...oldPoints } as any;
    points[name] = points[name] - 1;
    setPoints(points);
  };

  const getSelectedPoints = () => {
    return Object.entries(getPoints()).filter((s) => s[1] > 0);
  };

  const mapStatistic = (name: string) => (
    <StatisticColumn
      hasPointsToSpend={getRemainingPoints() > 0}
      getPoints={getPoints}
      onPointAdd={
        state.characterState?.stageType === stageTypes.IDLE
          ? handleAddPoint
          : undefined
      }
      onPointRemove={
        state.characterState?.stageType === stageTypes.IDLE
          ? handleRemovePoint
          : undefined
      }
      name={name}
      getCharacter={getCharacter}
      sm={4}
    />
  );

  const handleRaisePoints = () => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterRaisesStats',
        values: {
          points: getPoints(),
        },
      });
    }
  };

  const getHpProgress = () => {
    const characterCombatState = state.characterState
      ?.characterCombatState as CombatStatistics;
    return Math.floor(
      (characterCombatState.HP / characterCombatState.MAXHP) * 100,
    );
  };

  const getHpVariant = () => {
    const characterCombatState = state.characterState
      ?.characterCombatState as CombatStatistics;
    const value = Math.floor(
      (characterCombatState.HP / characterCombatState.MAXHP) * 100,
    );
    if (value > 60) return 'success';
    if (value > 50) return 'info';
    if (value > 25) return 'warning';
    if (value > 0) return 'danger';
    return 'danger';
  };

  const getManaProgress = () => {
    const characterCombatState = state.characterState
      ?.characterCombatState as CombatStatistics;
    return Math.floor(
      (characterCombatState.MANA / characterCombatState.MAXMANA) * 100,
    );
  };

  const getManaVariant = () => {
    const characterCombatState = state.characterState
      ?.characterCombatState as CombatStatistics;
    const value = Math.floor(
      (characterCombatState.MANA / characterCombatState.MAXMANA) * 100,
    );
    if (value > 60) return 'success';
    if (value > 50) return 'info';
    if (value > 25) return 'warning';
    if (value > 0) return 'danger';
    return 'danger';
  };

  const getExpProgress = () => {
    const character = state.characterState?.character as Character;
    const nextLvl = state.characterState?.nextLevelExperience as number;
    return Math.floor((character.experience / nextLvl) * 100);
  };

  const getExpVariant = () => {
    const character = state.characterState?.character as Character;
    const nextLvl = state.characterState?.nextLevelExperience as number;
    const value = Math.floor((character.experience / nextLvl) * 100);
    if (value > 60) return 'success';
    if (value > 50) return 'info';
    if (value > 25) return 'warning';
    if (value > 0) return 'danger';
    return 'danger';
  };

  return (
    <Container class="fullwidth text-start">
      <Stack gap={2}>
        <Row class="text-center">
          <Col>
            <u>Statistics</u>
          </Col>
        </Row>
        <Row>
          <NameValueColumn name="NAME" value={getCharacter().name} sm={12} />
        </Row>
        <Row>
          <NameValueColumn
            name="Race"
            value={getCharacter()?.race?.name}
            sm={6}
          />
          <NameValueColumn
            name="Gender"
            value={getCharacter().gender?.name}
            sm={6}
          />
        </Row>
        <Row>
          <Col xs={6} style={{ border: '1px solid grey' }} />
          <Col xs={6} style={{ border: '1px solid grey' }}>
            <Col xs={12}>
              {`HP: ${getCharacterCombatState().HP} / ${
                getCharacterCombatState().MAXHP
              }`}
            </Col>
            <Col xs={12}>
              <ProgressBar now={getHpProgress()} variant={getHpVariant()} />
            </Col>
          </Col>
        </Row>
        <Row>
          <Col xs={6} style={{ border: '1px solid grey' }} />
          <Col xs={6} style={{ border: '1px solid grey' }}>
            <Col xs={12}>
              {`MANA: ${getCharacterCombatState().MANA} / ${
                getCharacterCombatState().MAXMANA
              }`}
            </Col>
            <Col xs={12}>
              <ProgressBar now={getManaProgress()} variant={getManaVariant()} />
            </Col>
          </Col>
        </Row>
        <Row>
          <NameValueColumn name="LVL" value={getCharacter().level} xs={3} />
          <NameValueColumn
            name="TOTAL EXP"
            value={getCharacter().totalExperience}
            xs={3}
          />
          <Col xs={6} style={{ border: '1px solid grey' }}>
            <Col xs={12}>
              {`EXP: ${getCharacter().experience} / ${
                state.characterState?.nextLevelExperience
              }`}
            </Col>
            <Col xs={12}>
              <ProgressBar now={getExpProgress()} variant={getExpVariant()} />
            </Col>
          </Col>
        </Row>
        <Row>
          <NameValueColumn
            name="Professions"
            value={getCharacter()
              .professions?.map((profession) => profession.name)
              .join(', ')}
            sm={12}
          />
        </Row>
        <Row>
          <NameValueColumn
            name="Points to spend"
            value={`${getRemainingPoints()} / ${getCharacter().points}`}
            sm={12}
          />
        </Row>
        <Row>{['health', 'strength', 'defence'].map(mapStatistic)}</Row>
        <Row>{['wisdom', 'accuracy', 'intelligence'].map(mapStatistic)}</Row>
        <Row>{['dexterity', 'speed', 'luck'].map(mapStatistic)}</Row>
        <Row class="text-center">
          <Col>
            <u>Combat Statistics</u>
          </Col>
        </Row>
        <Row>
          <NameValueColumn
            name="OFFENCETYPE"
            value={getCharacterCombatState().offenceType}
            sm={3}
          />
          <NameValueColumn
            name="ACCURACY"
            value={getCharacterCombatState().accuracy}
            sm={3}
          />
          <NameValueColumn
            name="PHYSICAL"
            value={getCharacterCombatState().physicalOffence}
            sm={3}
          />
          <NameValueColumn
            name="ARCANE"
            value={getCharacterCombatState().arcaneOffence}
            sm={3}
          />
        </Row>
        <Row>
          <NameValueColumn
            name="PHYSICAL DEFENCE"
            value={getCharacterCombatState().arcaneDefence}
            sm={3}
          />
          <NameValueColumn
            name="ARCANE DEFENCE"
            value={getCharacterCombatState().physicalDefence}
            sm={3}
          />
          <NameValueColumn
            name="BLOCK"
            value={getCharacterCombatState().blockChance}
            sm={3}
          />
          <NameValueColumn
            name="DODGE"
            value={getCharacterCombatState().dodgeChance}
            sm={3}
          />
        </Row>
        {getRemainingPoints() !== getCharacter().points && (
          <>
            <Row class="text-center">
              <Col>
                <u>Raising Statistics</u>
              </Col>
            </Row>
            <Row>
              <Col>Are you sure you wish to spend some points on:</Col>
            </Row>
            {getSelectedPoints().map((value) => (
              <Row>
                <Col>{`${value[0]} by ${value[1]}`}</Col>
              </Row>
            ))}
            <Row>
              <Col>
                <Button onClick={handleRaisePoints}>Raise points</Button>
              </Col>
            </Row>
          </>
        )}
      </Stack>
    </Container>
  );
};

export default GameStats;
