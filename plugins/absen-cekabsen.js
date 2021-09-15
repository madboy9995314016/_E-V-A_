let handler = async (m, { conn, usedPrefix }) => {
    let id = m.chat
    conn.absen = conn.absen ? conn.absen : {}
    if (!(id in conn.absen)) {
        await conn.sendButton(m.chat, `No absences take place in this group!\n\nType *${usedPrefix}startabsence* to start absent`.trim(), watermark, 'Start', `${usedPrefix}startabsent`, m)
        throw false
    }

    let d = new Date
    let date = d.toLocaleDateString('id', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
    let absen = conn.absen[id][1]
    let list = absen.map((v, i) => `├ ${i + 1}. @${v.split`@`[0]}`).join('\n')
    let caption = `
DATE: ${date}
${conn.absen[id][2]}
    
┌〔 absent list 〕
│ 
├ Total: ${absen.length}
${list}
│ 
└────`.trim()
    await conn.send2Button(m.chat, caption, watermark, 'Absent', `${usedPrefix}absent`, 'Delete', `${usedPrefix}removeabsence`, m, { contextInfo: { mentionedJid: conn.parseMention(caption) } })
}
handler.help = ['cekabsent']
handler.tags = ['absent']
handler.command = /^cekabsent$/i
handler.group = true
module.exports = handler