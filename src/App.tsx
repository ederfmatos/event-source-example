import { useEffect, useState } from "react";
import "./App.css";

type Order = {
  id: string;
  status: string;
};

function App() {
  const name =
    new URL(window.location.href).searchParams.get("name") || "Faustão";
  const [notifications, setNotifications] = useState<Order[]>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `http://localhost:8080/orders?owner=${name}`
    );
    eventSource.onmessage = (event: MessageEvent) => {
      const order = JSON.parse(event.data);
      setNotifications((value) => [...value, order]);
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="App">
      <ul>
        {notifications.map((notification) => (
          <li>
            <span>
              <b>Id: </b>
              {notification.id}
            </span>

            <p>
              <b>Status: </b>
              {notification.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
