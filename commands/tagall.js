const isAdmin = require('../lib/isAdmin');  // Adjust based on your structure

async function tagAllCommand(sock, chatId, senderId) {
    try {
        const { isSenderAdmin, isBotAdmin, isOwner } = await isAdmin(sock, chatId, senderId);
        
        // Only admin or bot owner can use it
        if (!isSenderAdmin && !isOwner) {
            await sock.sendMessage(chatId, {
                text: '❌ Only admins or bot owner can use .tagall.'
            });
            return;
        }

        // Fetch group members
        const groupMetadata = await sock.groupMetadata(chatId);
        const participants = groupMetadata.participants;

        if (!participants || participants.length === 0) {
            await sock.sendMessage(chatId, { text: '⚠️ No participants found.' });
            return;
        }

        // Split mentions in chunks
        const mentions = participants.map(p => p.id);
        const CHUNK_SIZE = 40; // Safe number to avoid message overload

        for (let i = 0; i < mentions.length; i += CHUNK_SIZE) {
            const chunk = mentions.slice(i, i + CHUNK_SIZE);
            const message = chunk.map(id => `@${id.split('@')[0]}`).join('\n');

            await sock.sendMessage(chatId, {
                text: `📣 *Group Members:*\n\n${message}`,
                mentions: chunk
            });
        }

    } catch (error) {
        console.error('❌ Error in .tagall:', error);
        await sock.sendMessage(chatId, { text: '❌ Failed to tag members. Try again later.' });
    }
}

module.exports = tagAllCommand;
