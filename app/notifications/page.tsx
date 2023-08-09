"use client";

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

    // const registration = await navigator.serviceWorker.ready;
    // const subscription = await registration.pushManager.subscribe({
    //   userVisibleOnly: true,
    //   applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    // });
    // const response = await fetch("/api/subscribe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(subscription),
    // });
    // if (response.ok) {
    //   setStatus("Successfully subscribed");
    // } else {
    //   setStatus("Error subscribing user.");
    // }
  };

  return (
    <ul>
      <li>Notifications</li>
      <li>
        <button onClick={subscribe}>Subscribe to Notifications</button>
        <button onClick={unsubscribe}>Unsubscribe from Notifications</button>
        <p>Status: {status}</p>
      </li>
    </ul>
  );
}
