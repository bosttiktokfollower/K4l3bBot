async function githubCommand(sock, chatId) {
    const repoInfo = `*🤖 K4l3bBot MD*

*📂 GitHub Repository:*
https://github.com/CalebDevX/K4l3bBot

*📢 Official Channel:*
https://youtube.com/@calebosky

_Star ⭐ the repository if you like the bot!_`;

    try {
        await sock.sendMessage(chatId, {
            text: repoInfo,
            contextInfo: {
                forwardingScore: 1,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402198872825@newsletter',
                    newsletterName: 'K4l3b MD',
                    serverMessageId: -1
                }
            }
        });
    } catch (error) {
        console.error('Error in github command:', error);
        await sock.sendMessage(chatId, { 
            text: '❌ Error fetching repository information.' 
        });
    }
}

module.exports = githubCommand; 
