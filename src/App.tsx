import React, { Suspense } from "react";

import { useRoutes } from "react-router-dom";
import routes from "./providers/routes";

import BaseSpinner from "./common/components/ui/BaseSpinner";
import AppAlert from "./common/components/feedback/AppAlert";
import { useAppAlert } from "./common/hooks/useAppAlert";

const App: React.FC = () => {
  let route = useRoutes(routes);
  const { isLoading } = useAppAlert();

  return (
    <Suspense fallback={<BaseSpinner />}>
      {isLoading && <BaseSpinner />}
      <AppAlert />
      <div>{route}</div>
    </Suspense>
  );
};

export default App;
