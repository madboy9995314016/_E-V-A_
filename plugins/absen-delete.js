let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.sendButton(m.chat, `No absences took place in this group!\n\nType *${usedPrefix}start absent* to start absent`.trim(), watermark, 'Start', `${usedPrefix}startabsent`, m)
        throw false
    }
    delete conn.absen[id]
    m.reply(`Absentees has been successfully deleted`)
}
handler.help = ['removeabsence']
handler.tags = ['absent']
handler.command = /^(delete|delete)absent$/i
handler.group = true
handler.admin = true
module.exports = handler