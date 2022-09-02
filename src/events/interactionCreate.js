import { EmbedBuilder, InteractionType } from "discord.js";
import { readdirSync } from "fs";
import config from "../../config.js";

 export default {
	name: 'interactionCreate',
	execute: async(interaction) => {
   let client = interaction.client;
   if (!interaction.type == InteractionType.ApplicationCommand) return;
   if(interaction.user.bot) return;

   readdirSync('./src/commands').forEach(async file => {
        const command = await import(`../../src/commands/${file}`).then(x => x.default)
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
  }}
