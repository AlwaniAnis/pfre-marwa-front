import { TndevCtx } from "./contexts/TndevContext";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
const AuthRoutes = ({ user, children }) => {
  const [methods, states] = TndevCtx();
  const { loguedIn } = states;

  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();
  console.log(loguedIn);
  if (loguedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};
export default AuthRoutes;
