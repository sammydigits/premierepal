"use client";
import { Switch, Button, cn, Card, CardBody } from "@nextui-org/react";

import { useEffect, useState } from "react";

export default function NotificationsPage(): JSX.Element {
  const [status, setStatus] = useState("Waiting for updates...");
  useEffect(() => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) =>
        console.log(
          "Service Worker registration successful with scope: ",
          registration.scope
        )
      )
      .catch((err) => console.log("Service Worker registration failed: ", err));

    if (!("serviceWorker" in navigator)) {
      setStatus("Service workers are not supported by this browser");
      return;
    }

    if (!("PushManager" in window)) {
      setStatus("Push notifications are not supported by this browser");
      return;
    }

    if (!("showNotification" in ServiceWorkerRegistration.prototype)) {
      setStatus("Notifications are not supported by this browser");
      return;
    }
  }, []);

  const saveSubscription = async (subscription: any, method: string) => {
    setStatus("Sending to server...<br/>" + subscription);
    return fetch("https://backend.premierepal.com/saveSubscription.php", {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: subscription,
    }).then(() => subscription);
  };

  const unsubscribe = async () => {
    navigator.serviceWorker.ready.then((sw) => {
      //check subscription status
      sw.pushManager.getSubscription().then((subscription) => {
        if (subscription) {
          subscription.unsubscribe();
          setStatus("Unsubscribed");
        } else {
          setStatus("no subscription to unsubscribe from");
        }
      });
    });
  };

  const subscribe = async () => {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        // get service worker
        navigator.serviceWorker.ready.then((sw) => {
          //check subscription status
          sw.pushManager.getSubscription().then((subscription) => {
            if (subscription) {
              setStatus(
                `you already have subscribed to push, your subscription is: ${JSON.stringify(
                  subscription
                )}`
              );

              // subscription.unsubscribe();
            } else {
              setStatus("no subscription yet, subscribing...");
              // subscribe
              sw.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey:
                    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
                })
                .then((subscription) => {
                  setStatus(
                    "obtained subscription: " + JSON.stringify(subscription)
                  );
                  return subscription;
                })
                .then((subscription) => {
                  // save subscription in db
                  return saveSubscription(JSON.stringify(subscription), "POST");
                })
                .then((subscription) => {
                  setStatus(
                    "saved subscription to db: " + JSON.stringify(subscription)
                  );
                })
                .catch((e) => {
                  if (Notification.permission === "denied") {
                    // The user denied the notification permission which
                    // means we failed to subscribe and the user will need
                    // to manually change the notification permission to
                    // subscribe to push messages
                    setStatus("Notifications are denied by the user.");
                  } else {
                    // A problem occurred with the subscription; common reasons
                    // include network errors or the user skipped the permission
                    setStatus(
                      "Impossible to subscribe to push notifications:" + e
                    );
                  }
                });
            }
          });
        });
      } else {
        setStatus("permission not granted, cannot subscribe to push");
      }
    });
  };

  const handleEnableSubscription = (value: boolean) => {
    if (value) {
      subscribe();
    } else {
      unsubscribe();
    }
  };

  return (
    <>
      <h1>Notifications</h1>
      <div className="flex flex-col w-full">
        <Card className="max-w-full">
          <CardBody className="overflow-hidden">
            <Switch
              onValueChange={handleEnableSubscription}
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  //selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                ),
              }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Enable push notifications</p>
                <p className="text-tiny text-default-400">
                  Get notifcations in your browser. Visit this page on your
                  phone to get notifications on your phone.
                </p>
                <p className="text-tiny text-default-400">Status: {status}</p>
              </div>
            </Switch>
          </CardBody>
        </Card>
      </div>
    </>
  );
}
