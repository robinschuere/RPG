import { useNavigate } from 'solid-app-router';
import config from '../../config';
import { createContext, useContext, JSX, createSignal } from 'solid-js';
import {
  getCharacters,
  getGameEntity,
  getMe,
  isAlive,
  logout,
  updateMe,
} from '../services/rpgApi';
import { Event } from '../../../shared/types/Event';
import { CharacterState } from '../../../shared/types/CharacterState';
import { Character } from '../../../shared/types/Character';
import { User } from '../../../shared/types/User';
import { createStore, Store } from 'solid-js/store';
import { Item } from '../../../shared/types/Item';

export type StateStore = [
  Store<StateValues>,
  {
    loginUser: (tokenValue: string) => Promise<void>;
    logoutUser: () => Promise<void>;
    updateUser: (data: any) => Promise<void>;
    checkUser: () => Promise<void>;
    sendAction: (data: Event) => Promise<void>;
  },
];

const StateContext = createContext<StateStore>(); // we pass the CounterStore type to specify to typescript what the context will look like

export type StateValues = {
  isRetrying: boolean;
  retryAttempt: number;
  user?: User;
  token: string;
  characters: Character[];
  characterState?: CharacterState; // to be defined here
  items: Item[];
};

type StateProviderProps = {
  children: JSX.Element;
};

const initialData: StateValues = {
  user: undefined,
  isRetrying: false,
  retryAttempt: 0,
  token: '',
  characters: [],
  characterState: undefined,
  items: [],
};

async function getInitialData(): Promise<StateValues> {
  try {
    const localToken = localStorage.getItem(config.localStorageTokenName);
    if (localToken) {
      const { error } = await isAlive();
      if (error) {
        return initialData;
      }
      const { data: user } = await getMe();
      const { data: characters } = await getCharacters();
      const { data: items } = await getGameEntity('items');

      const result: StateValues = {
        user,
        token: localToken,
        characters,
        characterState: undefined,
        isRetrying: false,
        retryAttempt: 0,
        items,
      };
      return result;
    }
    return initialData;
  } catch (e) {
    return initialData;
  }
}

export function StateProvider(props: StateProviderProps): JSX.Element {
  const navigate = useNavigate();
  let socket: WebSocket | undefined = undefined;

  const [state, setState] = createStore(initialData);

  const syncSocket = () => {
    const { token } = state;
    if (!token && socket) {
      socket.close();
      socket = undefined;
    }
    if (token && !socket) {
      socket = new WebSocket(config.webSocketUrl);
      if (!socket) {
        console.error('Socket is gone ...');
        return;
      }
      socket.onclose = () => {
        console.info('socket closing');
        socket = undefined;
      };
      socket.onopen = () => {
        console.info('socket opened');
        socket?.send(JSON.stringify({ token: state.token }));
      };
      socket.onmessage = (message) => {
        const { data } = message;
        const { open, state: newState } = JSON.parse(data);
        if (!open) {
          socket = undefined;
          syncSocket();
          return;
        }
        if (state) {
          setState({ characterState: newState });
        }
      };
    }
  };

  const storeFunctions = {
    async loginUser(value: string | null) {
      if (!value) {
        localStorage.removeItem(config.localStorageTokenName);
        setState(initialData);
        return;
      }
      localStorage.setItem(config.localStorageTokenName, value);
      const data = await getInitialData();
      setState(data);

      setTimeout(storeFunctions.checkUser, 1);
    },
    async logoutUser() {
      await logout();
      localStorage.removeItem(config.localStorageTokenName);
      setState(initialData);
    },
    async updateUser(data: any) {
      await updateMe(data);
      const { data: user } = await getMe();
      setState({ user });
    },
    async checkUser() {
      syncSocket();
      const { error, retry } = await isAlive();

      if (retry) {
        if (state.retryAttempt === 5) {
          storeFunctions.logoutUser();
          navigate('/');
          return;
        }
        setState((s: StateValues) => ({
          isRetrying: true,
          retryAttempt: s.retryAttempt + 1,
        }));
        setTimeout(storeFunctions.checkUser, config.retryTime);
      } else if (error) {
        localStorage.removeItem(config.localStorageTokenName);
        setState(initialData);
        navigate('/');
      } else {
        setState((s: StateValues) => ({
          isRetrying: false,
          retryAttempt: 0,
        }));
        setTimeout(storeFunctions.checkUser, config.aliveCheck);
      }
    },
    async sendAction(data: any) {
      syncSocket();
      if (!socket) {
        return;
      }
      const message = {
        token: state.token,
        event: data,
      };

      socket.send(JSON.stringify(message));
    },
  };

  setTimeout(async () => {
    if (state.token) {
      // stop early because everything should be clear
      return;
    }
    const localStorageToken = localStorage.getItem(
      config.localStorageTokenName,
    );
    if (localStorageToken) {
      await storeFunctions.loginUser(localStorageToken);
      navigate(`/redirect?path=${window.location.pathname}`, { replace: true });
    }
  }, 500);

  const store: StateStore = [state, storeFunctions];

  return (
    <StateContext.Provider value={store}>
      {props.children}
    </StateContext.Provider>
  );
}

export const useState = () => useContext(StateContext);
