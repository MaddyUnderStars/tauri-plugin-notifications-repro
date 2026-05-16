# the issue

> when the app is stopped, notifications aren't delivered. I checked logcat, and I see [this message](https://github.com/SableClient/tauri-plugin-notifications/blob/main/android/src/main/java/app/tauri/notification/TauriUnifiedPushMessagingService.kt#L139) logged. This makes sense to me, as it seems NotificationPlugin.instance isn't set until load is called when the webview is initialised.
I'm wondering if the Sable tauri client can receive unifiedpush notifs while stopped/not opened, and if so was there anything extra to be done to get this working? I can't seem to find anything outside of the setup steps listed in the readme.

I use Sunup as my distributor

# instructions

```
npm i

npm run tauri android dev
```

then in app, click 'enable push with first distributor`.

it will output to js console a `web-push` cli command to issue notifications

then, close the app. ensure it is fully stopped, not in background

then, issue the notification. it will not be delivered using the fallback 

you will see in logcat the following

```
$ adb logcat | grep -e UnifiedPush -e com.maddy

05-16 10:21:56.770 21303 10670 D RaiseAppToForegroundFactory: New instance for com.maddy.notifications_repro
05-16 10:21:56.775 21303 10670 D RaiseAppToForeground: Binding to com.maddy.notifications_repro
05-16 10:21:56.780  1661  3926 D ActivityManager: sync unfroze 10310 com.maddy.notifications_repro for 6
05-16 10:21:56.789 21303 21303 D RaiseAppToForeground: onServiceConnected ComponentInfo{com.maddy.notifications_repro/org.unifiedpush.android.connector.internal.RaiseToForegroundService}
05-16 10:21:56.790 21303 21303 D RaiseAppToForeground: Sending msg for com.maddy.notifications_repro
05-16 10:21:56.790  1661  3926 W ProcessStats: Tracking association SourceState{4349448 org.unifiedpush.distributor.sunup/10525 Fgs #1009625} whose proc state 3 is better than process ProcessState{280afb6 com.maddy.notifications_repro/10532 pkg=com.maddy.notifications_repro} proc state 14 (0 skipped)
05-16 10:21:56.824 10310 10310 D UnifiedPush: getWebPushKeys: keys found
05-16 10:21:56.828 10310 10310 D TauriUnifiedPush: Message received for instance: default
05-16 10:21:56.829 10310 10310 W TauriUnifiedPush: Message is not valid JSON, forwarding as raw text
05-16 10:21:56.829 10310 10310 W TauriUnifiedPush: NotificationPlugin not initialized, cannot show fallback notification
```