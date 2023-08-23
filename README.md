# FORUM TASK

Small app in React Native, displaying info taken the Star Wars API.

## HOW TO START

To start app you can either:

1. Have `Node` installed on your computer.
2. Run `npm i` in the root folder and wait till all packeges successfully installed.
3. Run `npm run android`, wait till expo started: cmd should QR code.
4. Than You can either:

   - Download `Expo app` from your app market.
   - Open installed app.
   - Have your device connected to the same network (for example Wi-FI).
   - Tap scan QR code and scan QR code in cmd.
   - Wait until app started  
      or: - Follow the guide https://docs.expo.dev/workflow/android-studio-emulator/
     or:

5. Download `star_wars.apk` inside root folder on your android device.
6. Run installer and follow the instructions.
7. Open installed app.

🎉 Enjoy! 🎉

## STRUCTURE

**src/app**: main folder with react native and related files.

**src/app/(home)**: home screen files

**src/app/character**: liked character screen files

**src/app/movie**: movie screen files

**src/apollo**: file with apollo/client queries.

**src/constants**: file with static images and constants.

**src/redux**: folder with configurated redux store which includes using `redux-toolkit` and react-native `AsyncStorage`.

## Navigation

After you open app you located at home screen

**home screen**: By default you are in Episode tab. There are displayed list of available movies, toggle to change order by release date situated at top-right corner, list of characters is scrollable. If you click on movie you navigate to movie screen. At the bottom located two tabs: Episode tab and Characters tab, which navigates to the namesake tabs.

**movie screen**: There are information about film. At the bottom listed characters. After you click on character you navigate to Character screen. You can go back at the left top corner.

**character screen**: There are information about character. At the top-right corner there are like button: it saves state on device, if like full - you liked character, if like hollow - you stop liking character. You can check your liked characters in Characters tab on home screen.

**characters tab**: There are your liked characters, if you click on one - you navigate to character screen.

Every requirement to the project is satisfied. ENJOY!

## IMPORTANT!

Scroll can not work by one finger on one or more pages **`PLEASE IF PAGE NOT SCROLLING TRY SCROLLING WITH TWO FINGERS`**, it's happening due to some error at expo side if you use expo app on your phone.

## USED ADDITIONAL LIBRARIES

Nativewind - Tailwind integration in react-native.
Redux - State manager.
