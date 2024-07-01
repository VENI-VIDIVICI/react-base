import { useEffect, useMemo, useRef, useState } from "react";
import Notifications, { NotificationsRef, Place } from "..";

function DefaultGetContainer() {
  return document.body;
}
type NotificationType = {
  key?: string;
  message: string | React.ReactNode;
  type: "success" | "error" | "info";
  duration: number;
  place?: Place;
};
type OpenTask = {
  type: "open";
  config: NotificationType;
};
type CloseTask = {
  type: "close";
  key: React.Key;
};
type DestoryTask = {
  type: "destroy";
};
type Task = OpenTask | CloseTask | DestoryTask;
let key = 0;
interface NotificationsProps {
  getContainer?: () => HTMLElement;
}
interface NotificationAPI {
    open: (config: NotificationType) => void;
    close: (key: React.Key) => void;
    destroy: () => void;
}
function useNotification({
  getContainer = DefaultGetContainer,
}: NotificationsProps = {}) : [NotificationAPI, React.ReactElement]{
  const notifiRef = useRef<NotificationsRef>(null);
  const [container, setContainer] = useState<HTMLElement>();
  const Holder = (
    <Notifications ref={notifiRef} target={container}></Notifications>
  );
  const [queue, setQueue] = useState<Task[]>([]);
  const api = useMemo(() => {
    return {
      open(config: NotificationType) {
        let id = config.key;
        if (!id) {
          id = String(key++);
        }
        setQueue((prev) => [...prev, { type: "open", key: id, config }]);
      },
      close(key: React.Key) {
        setQueue((prev) => [...prev, { type: "close", key }]);
      },
      destroy() {
        setQueue((prev) => [...prev, { type: "destroy" }]);
      },
    };
  }, []);
  useEffect(() => {
    setContainer(getContainer());
  });
  useEffect(() => {
    queue.forEach((item) => {
      const { type } = item;
      if (type === "open") {
        notifiRef.current?.open({
          ...item.config,
          place: item.config.place || "topRight",
        });
      } else if (type === "close") {
        notifiRef.current?.close(item.key);
      } else if (type === "destroy") {
        notifiRef.current?.destroy();
      }
    });
  }, [queue]);
  return [api, Holder];
}

export default useNotification;
