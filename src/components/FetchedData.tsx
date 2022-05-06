import { useCallback, useEffect, useState } from "react";

interface MessageJson {
  message: string;
}

export const FetchedData = () => {
  const [message, setMessage] = useState("Now Fetching...");

  const url = "http://localhost:3002";

  const fetchData = useCallback(() => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          setMessage("Response NOT ok");
        }
        return response.json();
      })
      .then((json) => {
        const j = json as unknown as MessageJson;
        if (typeof j.message !== "string") {
          setMessage("Response type invalid.");
        }
        setMessage(j.message);
      })
      .catch((e) => {
        setMessage(`Catch ERROR: ${e}`);
      });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <p>{message}</p>;
};
