self.addEventListener("push", (event) => {
  const notification = event.data.json();
  event.waitUntil(
    self.registration.showNotification(notification.title, {
      icon: notification.icon,
      data: {
        url: notification.url,
      },
      actions: [
        {
          action: "view",
          title: "View",
        },
      ],
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.waitUntil(clients.openWindow(event.notification.data.url));
});
