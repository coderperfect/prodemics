import { useCallback, useState } from "react";

const useHttp = () => {
  const [isSending, setSending] = useState(false);
  const [isDone, setDone] = useState(false);
  const [isError, setError] = useState(false);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setSending(true);

    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Status is not okay");
      }

      setDone(true);

      const responseData = await response.json();

      applyData(responseData);
    } catch (err) {
      if (err) setError(true);
    }

    setSending(false);
  }, []);

  return {
    isSending,
    setSending,
    isDone,
    setDone,
    isError,
    setError,
    sendRequest,
  };
};

export default useHttp;
