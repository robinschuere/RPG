import { For } from 'solid-js';
import { StateStore, useState } from '../providers/StateProvider';
import Character from '../components/Character';
import { useNavigate } from 'solid-app-router';

const Characters = () => {
  const navigate = useNavigate();
  const [state, { sendAction }] = useState() as StateStore;

  const handlePlay = (characterId: string) => {
    sendAction({ eventType: 'loginCharacter', characterId });
    navigate(`/characters/${characterId}`);
  };

  return (
    <div>
      <div>
        <p>Characters</p>
      </div>
      <For each={state.characters}>
        {(character: any) => (
          <Character character={character} onClick={handlePlay} />
        )}
      </For>
    </div>
  );
};

export default Characters;
