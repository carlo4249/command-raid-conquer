import Link from 'next/link'
import { supabase } from '@/lib/supabase'

async function getStats() {
  const { count: memberCount } = await supabase
    .from('members')
    .select('*', { count: 'exact', head: true })
  
  const { count: allianceCount } = await supabase
    .from('alliances')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  return { memberCount: memberCount || 0, allianceCount: allianceCount || 0 }
}

export default async function Home() {
  const { memberCount, allianceCount } = await getStats()

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Shadow Legion
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Elite warriors. Unbreakable bonds. Legendary victories.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/enlist" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Join Our Ranks
          </Link>
          <Link 
            href="/roster" 
            className="bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            View Roster
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">{memberCount}</h3>
          <p className="text-gray-600">Active Members</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-4xl font-bold text-green-600 mb-2">{allianceCount}</h3>
          <p className="text-gray-600">Active Alliances</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-4xl font-bold text-purple-600 mb-2">50+</h3>
          <p className="text-gray-600">Battles Won</p>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Shadow Legion is an elite Roblox faction dedicated to tactical superiority and brotherhood. 
          Founded in 2023, we've risen through the ranks to become one of the most feared and respected 
          groups in our game.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We value skill, loyalty, and teamwork. Our members undergo rigorous training and participate 
          in coordinated operations that showcase our tactical prowess. Join us and become part of something legendary.
        </p>
      </section>

      {/* Requirements Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Enlistment Requirements</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Minimum age: 13 years old</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Active Discord account (required for communication)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Roblox account in good standing</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Willingness to attend training sessions and operations</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Respectful attitude and team-oriented mindset</span>
          </li>
        </ul>
      </section>
    </div>
  )
}
