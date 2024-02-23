import { InteractionStatus } from "@azure/msal-browser";
import {
  AuthenticatedTemplate,
  useIsAuthenticated,
  useMsal,
} from "@azure/msal-react";
import { ReactNode, useEffect } from "react";
import { loginRequest } from "../../config/auth";
import { useNavigate, useRoutes } from "react-router-dom";
import { HomeService, IHomeService } from "../../pages/Home/services";
import routes from "../../providers/routes";


const AuthGuard: React.FC = () => {
    let route = useRoutes(routes);
  const { instance, inProgress, accounts } = useMsal();
  const isAuthenticated = useIsAuthenticated();

  const navigate = useNavigate();

  const service: IHomeService = new HomeService();

  console.log(isAuthenticated, accounts);
  let value = accounts[0]?.username;

  useEffect(() => {
   if (inProgress === InteractionStatus.None && !isAuthenticated) {
      instance.loginRedirect(loginRequest).then((res) => {
        localStorage.setItem("accounts", JSON.stringify(res));
      });
   }

   
  }, []);

//   useEffect(() => {
//     if (accounts && accounts.length > 0) {
//       setTimeout(() => {
//         service
//           .getByEmail(value)
//           .then((response) => {
//           })
//           .catch((error) => {
//             navigate("/signup");
//           });
//       }, 2500);
//     }
//   }, [value]);
 
  return (
    <>
      <AuthenticatedTemplate>
    <div>{route}</div>
      </AuthenticatedTemplate>
    </>
  );
};

export default AuthGuard;
