import { Button, Col, Form, Row, Stack, ThemeProvider } from 'solid-bootstrap';
import { createSignal, For } from 'solid-js';
import { CombatWinDropStageValues } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';

const LootScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;
  const [getSelectedDrops, setSelectedDrops] = createSignal({} as any);

  const handleToggle = (tempId: string) => {
    setSelectedDrops((oldValues) => {
      if (oldValues[tempId]) {
        return { ...oldValues, [tempId]: undefined };
      }
      return { ...oldValues, [tempId]: tempId };
    });
  };

  const handleContinue = () => {
    if (state.characterState) {
      if (Object.keys(getSelectedDrops()).length > 0) {
        sendAction({
          characterId: state.characterState.characterId,
          eventType: 'characterAttainsLoot',
          values: {
            drops: Object.keys(getSelectedDrops()),
          },
        });
      } else {
        sendAction({
          characterId: state.characterState.characterId,
          eventType: 'characterDeclinesLoot',
        });
      }
    }
  };

  const getStageValues = () => {
    return state.characterState?.stageValues as CombatWinDropStageValues;
  };

  return (
    <Stack gap={1}>
      <Row>
        <Col>
          {`Congratulations, you defeated ${
            getStageValues().monsterCombatState.name
          }`}
        </Col>
      </Row>
      <Row>
        <Col />
        <Col>Experience received:</Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col>{getStageValues().monsterCombatState.experience}</Col>
        <Col />
      </Row>
      {getStageValues().oldLevel < getStageValues().newLevel && (
        <>
          <Row>
            <Col />
            <Col>YOU RAISED A LEVEL!!!</Col>
            <Col />
          </Row>
          <Row />
          <Row>
            <Col />
            <Col>{`You are now level ${getStageValues().newLevel}`}</Col>
            <Col />
          </Row>
        </>
      )}
      {getStageValues().drops && getStageValues().drops?.length > 0 && (
        <>
          <Row style={{ 'margin-top': '25px' }}>
            <Col />
            <Col>Your reward:</Col>
            <Col />
          </Row>
          <For each={getStageValues().drops}>
            {(drop: any) => (
              <Row style={{ 'margin-top': '25px' }}>
                <Col />
                <Col>
                  <Form>
                    <Form.Check
                      checked={!!getSelectedDrops()[drop.tempId]}
                      type="switch"
                      id="custom-switch"
                      label={`${drop.amount} ${drop.item.name}${
                        drop.amount > 1 ? 's' : ''
                      }`}
                      onchange={() => handleToggle(drop.tempId)}
                    />
                  </Form>
                </Col>
                <Col />
              </Row>
            )}
          </For>
        </>
      )}
      <Row style={{ 'margin-top': '25px' }}>
        <Col />
        <Col />
        <Col>
          <Button onClick={handleContinue}>Continue</Button>
        </Col>
      </Row>
    </Stack>
  );
};
export default LootScreen;
