import { StateStore, useState } from '../providers/StateProvider';
import { JSX } from 'solid-js';
import { Container } from 'solid-bootstrap';

interface SafeRouteProps {
  children: JSX.Element;
}

const SafeRoute = (props: SafeRouteProps) => {
  const { children } = props;
  const [state] = useState() as StateStore;
  if (state?.token) {
    return <>{children}</>;
  }
  return (
    <Container>
      <p>You have no power here...</p>
    </Container>
  );
};

export default SafeRoute;
