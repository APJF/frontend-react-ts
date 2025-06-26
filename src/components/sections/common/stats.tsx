export function Stats() {
  const stats = [
    { number: "100K+", label: "Active Learners" },
    { number: "50+", label: "Expert Teachers" },
    { number: "1000+", label: "Lessons Available" },
    { number: "95%", label: "Success Rate" },
  ]

  return (
    <section className="py-16 bg-red-600">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
              <div className="text-red-100 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
