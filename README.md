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

## Environment

1. Node v19.8.1
2. npm 9.5.1

## Troubleshoting

1. Make sure that backend server is running and accessible at `localhost` port `3000`.
