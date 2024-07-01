import {
  FC,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

export type Place = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
type NotificationType = {
  id: string;
  message: string | React.ReactNode;
  type: "success" | "error" | "info";
  duration: number;
  place: Place;
};
const Notification: FC<
  NotificationType & { closeHandler: (key: React.Key) => void }
> = ({ duration, message, closeHandler }) => {
  const timer = useRef<number | null>(null);
  useEffect(() => {
    timer.current = window.setTimeout(() => {
      closeHandler("1");
    }, duration);
  }, [duration, closeHandler]);
  return <div>{message}</div>;
};
type NotificationListProps = {
  place: Place;
  notifications: NotificationType[];
  closeHandler: (key: React.Key) => void;
};
const NotificationList: FC<NotificationListProps> = (props) => {
  const { notifications, closeHandler } = props;
  return (
    <div>
      {notifications.map((notification) => (
        <Notification
          closeHandler={closeHandler}
          key={notification.id}
          {...notification}
        />
      ))}
    </div>
  );
};
interface OpenConfig {
  message: string | React.ReactNode;
  type: "success" | "error" | "info";
  duration: number;
  place: Place;
}
export interface NotificationsRef {
  open: (config: OpenConfig) => void;
  close: (key: React.Key) => void;
  destroy: () => void;
}
type NotificationsProps = {
  target?: HTMLElement;
};
const Notifications = forwardRef<NotificationsRef, NotificationsProps>(
  (props, ref) => {
    const [stack, setStack] = useState<NotificationType[]>([]);
    const placeCurrent = useRef<Record<Place, NotificationType[]>>();
    const closeHandler = (key: React.Key) => {
      setStack((prev) => prev.filter((item) => item.id !== key));
    };
    useImperativeHandle(ref, () => {
      return {
        open: (config: OpenConfig) => {
          setStack((prev) => [
            ...prev,
            { id: String(stack.length), ...config },
          ]);
        },
        close: (key: React.Key) => {
          closeHandler(key);
        },
        destroy: () => {
          setStack([]);
        },
      };
    });
    useEffect(() => {
      const placeDatas: Record<Place, NotificationType[]> = {} as Record<
        Place,
        NotificationType[]
      >;
      stack.forEach((item) => {
        const { place } = item;
        if (!place) return;
        placeDatas[place] = placeDatas[place] || [];
        placeDatas[place].push(item);
      });
      placeCurrent.current = placeDatas;
    }, [stack]);
    const placementList = Object.keys(placeCurrent.current || {}) as Place[];
    return createPortal(
      <>
        {placementList.map((place) => (
          <NotificationList
            key={place}
            place={place}
            closeHandler={closeHandler}
            notifications={placeCurrent.current?.[place] || []}
          />
        ))}
      </>,
      props.target || document.body
    );
  }
);

export default Notifications;
