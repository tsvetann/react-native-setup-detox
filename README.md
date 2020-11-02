# Getting Started

This package was created to simplify setting up Detox testing framework for React Native mobile apps. It is recommended that
you run this package right after you initialize your react native app.

## Step 1: Setup

```sh
npm install -g react-native-setup-detox
```

Go to your React Native app folder and run:

```sh
react-native-setup-detox
```

## Step 2: Configure emulator

After successful installation you have to setup an emulator to run the tests. Please follow these steps:

* [Android](https://github.com/wix/Detox/blob/4fadc000b63f9039c0432b07d709518f95ff9f23/docs/Introduction.AndroidDevEnv.md)


## Step 3: Use emulator

Once you setup an emulator from step 2 you have to update the emulator name in your `.detoxrc.json` `avdName` property.

## TODO:

- [x] Android
- [ ] iOS (in progress)

Currently on tested on Mac and Android.

## Feedback

Please log bugs or features in the issues section