let handler = async (m, { conn, usedPrefix, text }) => {
    conn.absen = conn.absen ? conn.absen : {}
    let id = m.chat
    if (id in conn.absen) {
        await conn.sendButton(m.chat, `There are still absences in this chat!\n\nType *${usedPrefix}removeabsence* to delete absence`.trim(), watermark, 'Remove', `${usedPrefix}removeabsence`, conn.absen[id][0])
        throw false
    }
    conn.absen[id] = [
        await conn.sendButton(m.chat, `Absence begins`.trim(), watermark, 'Absent', `${usedPrefix}absent`, m),
        [],
        text
    ]
}
handler.help = ['startabsent [text]']
handler.tags = ['absent']
handler.command = /^(start|start)absent$/i
handler.group = true
handler.admin = true
module.exports = handler