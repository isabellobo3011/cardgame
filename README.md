# Introduction

This is a card game that aims to fight Bitcoin misconceptions and Blockchain over-promising gibberish.

Here are the live versions of both cardsets:
* [Bitcoin misconceptions](https://blockchainbird.com/t/btc/)
* [Blockchain bullshit buster](https://blockchainbird.com/t/bcb/)

This app contains:
* Card game with misconceptions
* Realtime Twitter keyword monitor

The monitor can be used to find misconceptions realtime.

## Why Card game Misconceptions?: 

We need to get it right and it needs to be fair. The elaborate explanation is [here](https://github.com/blockchainbird/cards_prejudice/wiki)

#### Who's right, who's wrong?

The cardgame *does not pretend to be right in everything at all times*. Our objective has been to:
 - present a **nuanced and more complete** take on the matter
 - **substantiate the answers** with empirical data gathered from reknowned sources in the field
 - offer **a way to improve the answers** by anyone via the [Telegram-group](https://t.me/bcbird)


## For who is the cardgame
Somebody who
- is socially concerned
- knows how to use social media
- knows a bit abouot bitcoin
- eager to spread the correct message (missionary urge)

Important to understand is that the cardgame is only secondairily meant for people who need to be trained about bitcoin and blockchain, those full of "misconceptions".

## Copyright & License

All content in this repository is copyright by the contributors.

All text is licensed CC-BY, and all code is licensed under the MIT License.

Contributors: Kor Dwarshuis <@kordwarshuis>, Henk van Cann <@henkvancann>

## General instructions

* Cd to cardgame main directory, find file `.ev.example` 
* Copy file `.env-example` to `.env`, check that the file exists
* Run `npm install` from commandline to install dependencies
* Run `npm run serve` to start a webserver
* Run `npm run build` in a different terminal tab to create a `./dist` directory (live version)

More info on https://vuejs.org


## Instructions for pushing to live:

The repository is a general repository from which you can create a BTC (Bitcoin) version and a BCB (Blockchain) version.

Before pushing to live server **four** files have to be edited in order to make it the BTC or the BCB version:



### 1: Filename: `/vue.config.js`

Open a text-editor, e.g. `nano`<br/>
`nano ./vue.config.js`<br/>
Uncomment the relevant code in `./vue.config.js`

In vue.config.js you can define the subdirectory where you finally want to place the app.

### 2: Filename: `/public/.htaccess`
Uncomment the relevant code in `./public/.htaccess`

### 3: Filename: `/.env`
Uncomment the relevant code in `./.env`
Please note: you have to restart local webserver to see changes in `.env` in effect.
Please note: `/.env` is not in repository, use `/.env.example` and create `/.env`

### 4: Filename: `/live.sh`
Uncomment the relevant code in `./live.sh`
This script can be used to push the build to the live web server.
Please note: `/live.sh` is not in repository, use `/live.example.sh` and create `/live.sh`

## Technical information

This app is built in Vue.js. 

Libraries also used:

* Phirehose (https://github.com/fennb/phirehose)

The content is managed via Google Sheets, and then pulled to a .csv file via PHP
De content is pulled from the .csv file via D3.js:

Google Sheets -> data.csv -> card game

The Google Sheets step is not necessary and can be removed from the working flow if desired.

The .CSV step helps to speed the loading time, since Google Sheets tends to be slow at times.