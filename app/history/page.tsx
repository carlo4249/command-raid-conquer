import { supabase } from '@/lib/supabase'

type HistoryEvent = {
  id: string
  event_date: string
  title: string
  description: string
}

async function getHistory() {
  const { data, error } = await supabase
    .from('clan_history')
    .select('*')
    .order('event_date', { ascending: false })

  if (error) {
    console.error('Error fetching history:', error)
    return []
  }

  return data as HistoryEvent[]
}

export default async function HistoryPage() {
  const events = await getHistory()

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
        Clan History
      </h1>

      <div className="bg-white rounded-lg shadow-md p-8">
        {events.length > 0 ? (
          <div className="space-y-8">
            {events.map(event => (
              <div 
                key={event.id} 
                className="border-l-4 border-blue-600 pl-6 pb-6"
              >
                <div className="flex items-center gap-4 mb-2">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    {new Date(event.event_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">
            <p>No history events yet. Your legacy begins now!</p>
          </div>
        )}
      </div>
    </div>
  )
}
