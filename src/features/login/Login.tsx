import Spinner from '../common/Spinner';

const Login = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center">
        <Spinner />
        <p className="mt-2 text-lg font-semibold">Signing In</p>
      </div>
    </div>
  );
};

export default Login;