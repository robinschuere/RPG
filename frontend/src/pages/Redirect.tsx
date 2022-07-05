import { Navigate, useSearchParams } from 'solid-app-router';

const Redirect = () => {
  const [searchParams] = useSearchParams();

  return <Navigate href={searchParams.path} />;
};

export default Redirect;
