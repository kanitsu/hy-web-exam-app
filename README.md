# hy-web-exam-app

## How to run

First, connect device to computer or run an emulator. It will fail otherwise.
Open terminal at folder and type:

```bash
$ npm i
$ npm run ios
```

Note that expo will install "Expo Go" app in the device / emulator, in order to run the app. It then open metro and send the react-native package to the device.

To re-run after closing the app, type `i` in terminal (make sure that metro is running, if not, type `npm run ios` again).

Alternatively, if metro is still running, you can also run the app from "Expo Go" app. Click the app from recently opened app, or enter the following URL manualy.

```
exp://localhos:19000 
```

<img width="250" alt="image" src="https://raw.githubusercontent.com/kanitsu/hy-web-exam-app/main/assets/run.png" />

## Environment

1. Node v19.8.1
2. npm 9.5.1

## Troubleshoting

1. Make sure that backend server is running and accessible at `localhost` port `3000`.
2. Changing and saving codes doesn't do anything to the app. If the error message in the bottom (as shown in the image below)

<img width="250" alt="image" src="https://raw.githubusercontent.com/kanitsu/hy-web-exam-app/main/assets/disconnected.png" />

This might be caused by:
- metro not running or metro is shutdown / restarted, or if connected through network, disconnected.
- If metro not running, then restart metro by typing `npm run ios` again, and run the app through "Expo Go"
- If metro is running, then type `r` in the terminal where metro runs.