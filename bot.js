/* ### SETUP AND CONFIGURATION ### */
const dotenv = require('dotenv');
dotenv.config();

const CLIENTID = process.env.CLIENTID;
const TOKEN = process.env.TOKEN;

var config = require('./config.json');

const { Client, Events, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

/* ### COMMANDS AND CODE ### */

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

/* ### LOGIN ### */

client.login(TOKEN);
