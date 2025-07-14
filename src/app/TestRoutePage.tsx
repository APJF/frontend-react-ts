import { useParams, useLocation } from "react-router-dom";

const TestRoutePage: React.FC = () => {
  const params = useParams();
  const location = useLocation();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Route Test Page</h1>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h2 className="font-semibold mb-2">Current URL:</h2>
        <code className="bg-white p-2 block rounded">{window.location.href}</code>
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <h2 className="font-semibold mb-2">URL Parameters:</h2>
        <pre className="bg-white p-2 block rounded overflow-auto">
          {JSON.stringify(params, null, 2)}
        </pre>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg mb-4">
        <h2 className="font-semibold mb-2">Location Object:</h2>
        <pre className="bg-white p-2 block rounded overflow-auto">
          {JSON.stringify({
            pathname: location.pathname,
            search: location.search,
            hash: location.hash,
            state: location.state
          }, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default TestRoutePage;
