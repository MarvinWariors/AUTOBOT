import axios from "axios";

export const metadata = {
  name: `cristel`,
  version: "1.0",
  author: `Marvin Hiponia`,
  category: "Ai-Chat",
  description: `Wlang tulog Ang author`,
  usage: `{prefix}{name}cristel `,
  hasPrefix: true,
};

export async function onRun({ event, box, args, userInfos, api }) {
  try {
    const query = args.join(" ") || "hello";
    const { name } = await userInfos.get(event.senderID);

    if (query) {
      box.react("⏳");
      const processingMessage = await box.reply(
        `Asking Cristel. Please wait a moment...`,
      );

      const apiUrl = `https://liaspark.chatbotcommunity.ltd/@unregistered/api/cristel?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`;
      const response = await axios.get(apiUrl);

      if (response.data && response.data.message) {
        const trimmedMessage = response.data.message.trim();
        box.react("✅");
        await box.reply(trimmedMessage);

        console.log(`Sent Cristel's response to the user`);
      } else {
        throw new Error(`Invalid or missing response from Cristel API`);
      }

      await api.unsendMessage(processingMessage.messageID);
    }
  } catch (error) {
    console.error(`❌ | Failed to get Cristel's response: ${error.message}`);
    const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
    box.reply(errorMessage);
  }
  }
