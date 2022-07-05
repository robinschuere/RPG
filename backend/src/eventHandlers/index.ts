import { loginCharacter } from './loginCharacter';
import { logoutCharacter } from './logoutCharacter';
import { characterNavigates } from './characterNavigates';
import { characterGoesTracking } from './characterGoesTracking';
import { characterAcceptsFind } from './characterAcceptsFind';
import { characterAcceptsFight } from './characterAcceptsFight';
import { characterGoesIdle } from './characterGoesIdle';
import { setScreen } from './setScreen';
import { characterDoesFightingAction } from './characterDoesFightingAction';
import { characterFleesFromAction } from './characterFleesFromAction';
import { characterFled } from './characterFled';
import { characterWins } from './characterWins';
import { characterAttainsLoot } from './characterAttainsLoot';
import { characterDeclinesLoot } from './characterDeclinesLoot';
import { characterDeclinesFind } from './characterDeclinesFind';
import { characterRaisesStats } from './characterRaisesStats';

export default {
  loginCharacter,
  logoutCharacter,
  characterNavigates,
  characterGoesIdle,
  characterGoesTracking,
  setScreen,
  characterAcceptsFind,
  characterDeclinesFind,
  characterAcceptsFight,
  characterDoesFightingAction,
  characterFleesFromAction,
  characterFled,
  characterWins,
  characterAttainsLoot,
  characterDeclinesLoot,
  characterRaisesStats,
};
