import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    console.error('DISCORD_WEBHOOK_URL is not set')
    return NextResponse.json({ error: 'Notification service not configured' }, { status: 500 })
  }

  let body: { type: string; data: Record<string, string> }

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { type, data } = body
  let embed: Record<string, unknown>

  if (type === 'enlistment') {
    embed = {
      title: 'New Enlistment Application',
      color: 0x3B82F6,
      fields: [
        { name: 'Roblox Username', value: data.roblox_username || 'N/A', inline: true },
        { name: 'Discord', value: data.discord_username || 'N/A', inline: true },
        { name: 'Age', value: data.age || 'N/A', inline: true },
        { name: 'Play Duration', value: data.play_duration || 'N/A', inline: false },
        { name: 'Rebirths', value: data.rebirths || 'N/A', inline: true },
        { name: 'Previous Factions', value: data.previous_factions || 'None', inline: false },
        { name: 'Role', value: data.role || 'N/A', inline: false },
        { name: 'Contribution', value: data.contribution || 'N/A', inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'CRC Enlistment' },
    }
  } else if (type === 'alliance') {
    embed = {
      title: 'New Alliance Request',
      color: 0x10B981,
      fields: [
        { name: 'Faction Name', value: data.faction_name || 'N/A', inline: true },
        { name: 'Faction Size', value: data.faction_size || 'N/A', inline: true },
        { name: 'Discord Invite', value: data.discord_invite || 'N/A', inline: false },
        { name: 'Reason', value: data.reason || 'N/A', inline: false },
        { name: 'Representative', value: data.representative || 'N/A', inline: false },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: 'CRC Alliance' },
    }
  } else {
    return NextResponse.json({ error: 'Invalid notification type' }, { status: 400 })
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    })

    if (!res.ok) {
      console.error('Discord webhook failed:', res.status, await res.text())
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Webhook fetch error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
