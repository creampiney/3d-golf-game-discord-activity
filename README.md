# Discord Activity for 3D Golf Game Simulation

Golf is a popular sport enjoyed by millions worldwide, but not everyone has access to golf courses or time to play. This project aims to develop basic 3D golf game in web application using Three.js, a popular JavaScript library to create 3D graphics on the web, to give some golf experience to players.

This project is modified from [my project in Realtime Computer Graphics, Physics Simulation (2/2023)](https://github.com/creampiney/3d-golf-game).

## Installation

- Create application in [Discord Developer Portal](https://discord.com/developers/applications) and activate Activities in the application by following [these step](https://discord.com/developers/docs/activities/building-an-activity).

- Create `.env` file in root directory of the project containing Discord's client ID for application. The example is in `example.env`.

```bash
VITE_DISCORD_CLIENT_ID=?????
```

- Build the web application and host to play in discord, run the following command to build the application:

```bash
npm install
npm run build
```

- The output will be in directory `dist`, host website with this `dist` directory.

- Put url of hosted website to "Target" in "URL Mappings" in your application in Discord Developer Portal.