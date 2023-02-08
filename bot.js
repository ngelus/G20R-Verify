/* ### SETUP AND CONFIGURATION ### */
const fs = require('fs');
const path = require('path');

const { logger } = require('./logger.js');

const dotenv = require('dotenv');
dotenv.config();

const CLIENTID = process.env.CLIENTID;
const TOKEN = process.env.TOKEN;

var config = require('./config.json');

const {
  Client,
  Events,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

/* ### COMMANDS AND CODE ### */

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    logger.warn(
      `The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

client.once(Events.ClientReady, (c) => {
  logger.info(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    logger.warn(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    logger.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command',
      ephemeral: true,
    });
  }
});

/* ### LOGIN ### */
client.login(TOKEN.toString());
