import { Navigate } from 'solid-app-router';
import { JSX } from 'solid-js';
import { StateStore, useState } from '../providers/StateProvider';

interface RedirectRouteProps {
  children: JSX.Element;
}

const RedirectRoute = (props: RedirectRouteProps) => {
  const { children } = props;
  const [state] = useState() as StateStore;

  if (state.token) {
    return <Navigate href="/" />;
  }
  return <>{children}</>;
};

export default RedirectRoute;
