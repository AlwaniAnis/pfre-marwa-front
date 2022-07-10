import { TndevCtx } from "./contexts/TndevContext";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
const GuestRoutes = ({ user, children }) => {
  const [methods, states] = TndevCtx();
  const { loguedIn } = states;
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  if (loguedIn) {
    return <Navigate to="/calendrier" replace />;
  }

  return children;
};
export default GuestRoutes;
