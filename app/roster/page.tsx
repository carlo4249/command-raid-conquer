import { supabase } from '@/lib/supabase'

type Member = {
  id: string
  roblox_username: string
  rank: string
  join_date: string
  discord_username: string
  status: string
}

async function getMembers() {
  const { data, error } = await supabase
    .from('members')
    .select('*')
    .eq('status', 'active')
    .order('join_date', { ascending: false })

  if (error) {
    console.error('Error fetching members:', error)
    return []
  }

  return data as Member[]
}

export default async function RosterPage() {
  const members = await getMembers()

  const rankOrder = ['Commander', 'Officer', 'Sergeant', 'Corporal', 'Private', 'Recruit']
  const membersByRank = rankOrder.reduce((acc, rank) => {
    acc[rank] = members.filter(m => m.rank === rank)
    return acc
  }, {} as Record<string, Member[]>)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Roster
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="mb-6 text-center">
          <p className="text-gray-600">
            Active Members: <span className="font-bold text-blue-600">{members.length}</span>
          </p>
        </div>

        {rankOrder.map(rank => {
          const rankMembers = membersByRank[rank]
          if (!rankMembers || rankMembers.length === 0) return null

          return (
            <div key={rank} className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                {rank} ({rankMembers.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rankMembers.map(member => (
                  <div 
                    key={member.id} 
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">
                      {member.roblox_username}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Discord: {member.discord_username || 'Not provided'}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Joined: {new Date(member.join_date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {members.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No members yet.
          </div>
        )}
      </div>
    </div>
  )
}
