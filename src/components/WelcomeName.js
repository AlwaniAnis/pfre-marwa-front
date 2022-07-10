import { useEffect, useState } from "react";
import { useMsal } from "@azure/msal-react";

const WelcomeName = ({ el }) => {
  const { instance } = useMsal();
  const [name, setName] = useState(null);

  const activeAccount = instance.getActiveAccount();
  useEffect(() => {
    if (activeAccount) {
      setName(activeAccount.name.split(" ")[0]);
    } else {
      setName(null);
    }
    console.log(activeAccount);
  }, [activeAccount]);

  if (name) {
    return (
      <span>
        Welcome,{el} {name}
      </span>
    );
  } else {
    return null;
  }
};

export default WelcomeName;
