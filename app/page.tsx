import Link from 'next/link'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Welcome to Command Raid Conquer
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

      {/* About Section */}
      <section className="bg-white p-8 rounded-lg shadow-md mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Command Raid Conquer (CRC) is an elite War Tycoon faction dedicated to tactical superiority and brotherhood. 
          We've risen through the ranks to become one of the most feared and respected groups in the game.
        </p>
        <p className="text-gray-700 leading-relaxed">
          We value skill, loyalty, and teamwork. Our members undergo rigorous training and participate 
          in coordinated operations that showcase our tactical prowess. Join us and become part of something legendary.
        </p>
      </section>

      {/* Requirements Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Requirements</h2>
        <p className="text-gray-600 mb-6">
          If you're ready to become part of the team, make sure you meet these requirements before applying:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Active in War Tycoon</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Decent game knowledge</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Willingness to listen and improve</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Seasoned player</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">✓</span>
            <span>Complete daily challenges</span>
          </li>
        </ul>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h3 className="font-bold text-gray-900 mb-2">What Happens After You Apply?</h3>
          <p className="text-gray-700">
            A staff member will review your answers as soon as possible. If accepted, you'll go through a combat test.
          </p>
        </div>
      </section>
    </div>
  )
}
