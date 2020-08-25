This repo demonstrates an issue in React native currently raised in: 
 - [React Native](https://github.com/facebook/react-native/issues/29756)
 - [React Navigation](https://github.com/react-navigation/react-navigation/issues/8765)
 - [Expo](https://github.com/expo/expo/issues/9924)

### Current vs Expected Behavior

This is a pretty bizarre issue and is a bit tricky to reproduce but essentially EXIF is being stripped from images when sent over a POST request after navigation. 

This issue could be rooted in `react-native`, `react-navigation` or `Expo` but I am having a hard time tracking down which so if you have any information I would be very grateful.

![Exif Comparison](https://user-images.githubusercontent.com/40409896/91118463-5fa00800-e6d4-11ea-9623-11130fb77544.PNG)

### Reproducible Demo
This [repo](https://github.com/CampbellMG/expo-exif) contains the bare minimum code to reproduce this issue. 

The server directory includes an express server that will send the photo or receive a photo and extract the exif.

The client directory includes the Expo app which simply retrieves the file from the server and sends it back. The process is duplicated over two screens in a stack navigator. 

To set up the environment: 

1. Update your local address in `client/ImageProcessor.ts`
2. Start the server with: `cd server && npm start`
3. Start the Expo app with: `cd client && npm start`
4. Open the app in the Expo client

<!--
- This should include as little code as possible, please don't simply link your entire project
- Sharing a link to a [Snack](https://snack.expo.io/) is a GREAT way to provide a reproducible demo :) 
- If a reproducible demo, or a complete list of steps from blank project to bug, are not provided, it is very likely your issue will be closed
- If you need more guidance, please see https://stackoverflow.com/help/mcve
-->
<!--
As an added benefit- creating a repro may help you identify the source of the bug, which means we are one step closer to fixing it! Thanks for helping us help you!
-->
 
### Steps to Reproduce
1. In the app, click `Retrieve image`
2. Click `Send Image`
  You should now see the photo and its extracted EXIF in the server's `uploads` directory
  You can repeat this step as many times as you like to prove that the issue does not simply occur on the second attempt
3. Press navigate to move to the next screen
4. Press send 
  You can check the code but this performs exactly the same action as step 5 just from another screen
  If you now look at the extracted EXIF in the server's `uploads` directory you will see all the non-default values are missing
5. Go back to the first screen
6. Press send again
 Even though we are performing the same action as step 5 any photos now uploaded will not contain the attached EXIF

### Environment

      Expo CLI 3.24.2 environment info:
        System:
          OS: Windows 10 10.0.18363
        Binaries:
          Node: 12.13.1 - C:\Program Files\nodejs\node.EXE
          npm: 6.9.0 - C:\Program Files\nodejs\npm.CMD
        npmPackages:
          expo: ~38.0.8 => 38.0.8
          react: ~16.11.0 => 16.11.0
          react-dom: ~16.11.0 => 16.11.0
          react-native: https://github.com/expo/react-native/archive/sdk-38.0.2.tar.gz => 0.62.2
        "@react-navigation/native": "^5.7.3",
        "@react-navigation/stack": "^5.9.0",


I know this is tedious to reproduce so I appreciate anyone that has made it this far. I am at a complete loss on how to proceed from here so please let me know if there is any more information I can provide or anything I can assist with. 
