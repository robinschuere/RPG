import { StateStore, useState } from '../../providers/StateProvider';
import { Button, Container } from 'solid-bootstrap';
import { stageTypes } from '../../../../shared/constants';
import CombatScreen from './CombatScreen';
import TrackCombatScreen from './TrackCombatScreen';
import FleeScreen from './FleeScreen';
import WinScreen from './WinScreen';
import DeathScreen from './DeathScreen';
import IdleScreen from './IdleScreen';
import LootScreen from './LootScreen';
import ResourceScreen from './ResourceScreen';
import TrackScreen from './TrackScreen';
import ShopScreen from './ShopScreen';

const GameWorld = () => {
  const [state] = useState() as StateStore;

  return (
    <Container>
      {state.characterState?.stageType === stageTypes.IDLE && <IdleScreen />}
      {state.characterState?.stageType === stageTypes.COMBAT && (
        <CombatScreen />
      )}
      {state.characterState?.stageType === stageTypes.COMBAT_WIN && (
        <WinScreen />
      )}
      {state.characterState?.stageType === stageTypes.COMBAT_WIN_DROP && (
        <LootScreen />
      )}
      {state.characterState?.stageType === stageTypes.COMBAT_DEATH && (
        <DeathScreen />
      )}
      {state.characterState?.stageType === stageTypes.COMBAT_FLEE && (
        <FleeScreen />
      )}
      {state.characterState?.stageType === stageTypes.TRACK_COMBAT && (
        <TrackCombatScreen />
      )}
      {state.characterState?.stageType === stageTypes.TRACK_RESOURCE && (
        <ResourceScreen />
      )}
      {state.characterState?.stageType === stageTypes.SHOP && <ShopScreen />}
      {state.characterState?.stageType === stageTypes.TRACK && <TrackScreen />}
    </Container>
  );
};

export default GameWorld;
