import Link from 'next/link'

export default async function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Command Raid Conquer
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A competitive War Tycoon faction.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/enlist" 
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Apply Now
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">About CRC</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          CRC is a War Tycoon faction focused on coordinated gameplay and tactical combat. 
          We prioritize skill development and teamwork.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Members are expected to participate in operations, communicate effectively, and 
          contribute to the faction's success.
        </p>
      </section>

      {/* Requirements Section */}
      <section className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Requirements</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span>Active in War Tycoon</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span>Decent game knowledge</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span>Willingness to listen and improve</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span>Seasoned player</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-3">•</span>
            <span>Complete daily challenges</span>
          </li>
        </ul>
        
        <div className="mt-8 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
          <h3 className="font-bold text-gray-900 mb-2">Application Process</h3>
          <p className="text-gray-700">
            Staff will review your application and contact you if you meet our requirements. 
            Accepted applicants complete a combat test before joining.
          </p>
        </div>
      </section>
    </div>
  )
}
