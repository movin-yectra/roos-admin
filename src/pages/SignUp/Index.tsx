import { Outlet } from "react-router-dom";

const SignUp: React.FC = () => {
  return (
    <>
      <div className="container-fliud h-100">
        <Outlet />
      </div>
    </>
  );
};

export default SignUp;
