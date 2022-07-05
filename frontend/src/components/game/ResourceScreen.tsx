import { Button, Col, Form, Row, Stack } from 'solid-bootstrap';
import { createSignal, For } from 'solid-js';
import { TrackResourceStageValues } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';

const ResourceScreen = () => {
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

  const handleAcceptFind = () => {
    if (!state.characterState) {
      return;
    }
    if (Object.keys(getSelectedDrops()).length > 0) {
      sendAction({
        eventType: 'characterAcceptsFind',
        characterId: state.characterState.characterId,
        values: {
          drops: Object.keys(getSelectedDrops()),
        },
      });
    } else {
      sendAction({
        eventType: 'characterDeclinesFind',
        characterId: state.characterState.characterId,
      });
    }
  };

  const getStageValues = () => {
    return state.characterState?.stageValues as TrackResourceStageValues;
  };
  return (
    <Stack>
      {getStageValues().drops.length > 0 && (
        <>
          <Row>
            <Col />
            <Col>In the midst of your travel you find:</Col>
            <Col />
          </Row>
          <For each={getStageValues().drops}>
            {(drop: any) => (
              <Row>
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
              </Row>
            )}
          </For>
        </>
      )}
      <Row>
        <Col />
        <Col />
        <Col>
          <Button onClick={handleAcceptFind}>continue</Button>
        </Col>
      </Row>
    </Stack>
  );
};
export default ResourceScreen;
