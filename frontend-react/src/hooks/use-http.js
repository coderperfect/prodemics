import { useCallback, useState } from "react";

const useHttp = () => {
  const [isSending, setSending] = useState(false);
  const [isDone, setDone] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setSending(true);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        let errorResponse = "Something went wrong";
        try {
          const responseData = await response.json();
          if(!!responseData.message)
            errorResponse = responseData.message;
        } catch (error) {
        }

        throw new Error(errorResponse);
      }

      setDone(true);

      const responseData = await response.json();

      applyData(responseData);
    } catch (err) {
      setError(err.message);
    }

    setSending(false);
  }, []);

  return {
    isSending,
    setSending,
    isDone,
    setDone,
    error,
    setError,
    sendRequest,
  };
};

export default useHttp;
