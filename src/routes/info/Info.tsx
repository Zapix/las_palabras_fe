import { useLoaderData } from "react-router";

import { BACKEND_URL } from "../../api/constants.tsx";

const Info = () => {
  const { version, environment } = useLoaderData<{
    environment: string;
    version: string;
  }>();
  return (
    <div>
      <h1>Backend info:</h1>
      <ul>
        <li>
          <strong>Version:&nbsp;</strong>
          <span>{version}</span>
        </li>
        <li>
          <strong>Environment:&nbsp;</strong>
          <span>{environment}</span>
        </li>
        <li>
          <strong>Backend url:&nbsp;</strong>
          <span>{BACKEND_URL}</span>
        </li>
      </ul>
    </div>
  );
};

export default Info;
