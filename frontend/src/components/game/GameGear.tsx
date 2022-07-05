import { Col, Container, Row, Stack } from 'solid-bootstrap';
import { slotTypes } from '../../../../shared/constants';
import { StateStore, useState } from '../../providers/StateProvider';

const GameGear = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const ItemCol = ({ name, itemName }: { name: string; itemName?: string }) => (
    <Col xs={2} style={{ border: '1px solid grey' }}>
      <div>
        <u>{name}</u>
      </div>
      <div>{itemName}</div>
    </Col>
  );

  const getSlotItem = (slotType: string) => {
    const slotItem = state.characterState?.gear.find(
      (s) => s.slot === slotType,
    );
    if (!slotItem) {
      return <ItemCol name={slotType} />;
    }
    const item = state.items.find((s) => s.id === slotItem.itemId);
    return <ItemCol name={slotType} itemName={item!.name} />;
  };

  return (
    <Container>
      <Stack gap={2}>
        <Row>
          <Col />
          <Col>
            <u>Gear</u>
          </Col>
          <Col />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={5} />
          {getSlotItem(slotTypes.HAT)}
          <Col xs={5} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={2} />
          {getSlotItem(slotTypes.LEFT_EAR)}
          <Col xs={1} />
          {getSlotItem(slotTypes.HEAD)}
          <Col xs={1} />
          {getSlotItem(slotTypes.RIGHT_EAR)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={5} />
          {getSlotItem(slotTypes.CAPE)}
          <Col xs={1} />
          {getSlotItem(slotTypes.QUIVER)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={2} />
          {getSlotItem(slotTypes.LEFT_SHOULDER)}
          <Col xs={1} />
          {getSlotItem(slotTypes.NECK)}
          <Col xs={1} />
          {getSlotItem(slotTypes.RIGHT_SHOULDER)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={2} />
          {getSlotItem(slotTypes.LEFT_ARM)}
          <Col xs={1} />
          {getSlotItem(slotTypes.BODY)}
          <Col xs={1} />
          {getSlotItem(slotTypes.RIGHT_ARM)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={2} />
          {getSlotItem(slotTypes.WEAPON_HAND)}
          <Col xs={1} />
          {getSlotItem(slotTypes.BELT)}
          <Col xs={1} />
          {getSlotItem(slotTypes.SHIELD_HAND)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={2} />
          {getSlotItem(slotTypes.LEFT_LEG)}
          <Col xs={1} />
          {getSlotItem(slotTypes.PANTS)}
          <Col xs={1} />
          {getSlotItem(slotTypes.RIGHT_LEG)}
          <Col xs={2} />
        </Row>
        <Row style={{ 'margin-bottom': '15px' }}>
          <Col xs={5} />
          {getSlotItem(slotTypes.FEET)}
          <Col xs={5} />
        </Row>
      </Stack>
    </Container>
  );
};

export default GameGear;
