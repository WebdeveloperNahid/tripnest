import {
  FiShield,
  FiHeart,
  FiGlobe,
  FiUsers,
  FiAward,
  FiTrendingUp,
} from "react-icons/fi";

const values = [
  {
    icon: FiShield,
    title: "Verified & Secure",
    description:
      "Every tour package listed on TripNest is reviewed for accuracy, and all bookings are protected with secure processing.",
  },
  {
    icon: FiHeart,
    title: "Traveler First",
    description:
      "We design every part of the experience around what travelers actually need — clarity, honesty, and support.",
  },
  {
    icon: FiGlobe,
    title: "Local Expertise",
    description:
      "Our tours are curated with local guides who know each destination inside out, so you get authentic experiences.",
  },
];

const stats = [
  { icon: FiUsers, value: "50K+", label: "Happy Travelers" },
  { icon: FiGlobe, value: "80+", label: "Destinations Covered" },
  { icon: FiAward, value: "500+", label: "Tour Packages" },
  { icon: FiTrendingUp, value: "4.8", label: "Average Rating" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/15 px-4 py-1.5 text-xs font-semibold text-teal-300">
            OUR STORY
          </span>
          <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            About TripNest
          </h1>
          <p className="mt-5 text-base leading-relaxed text-slate-300 sm:text-lg">
            TripNest is a modern travel platform built to make discovering
            and booking tour packages simple, transparent, and enjoyable.
            From tropical beaches to historic landmarks, we connect
            travelers with trusted local agencies across the world.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wide text-teal-600">
              Our Mission
            </span>
            <h2 className="mt-3 text-2xl font-bold text-slate-900 sm:text-3xl">
              Making travel planning effortless
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              We started TripNest with a simple idea: booking a trip
              shouldn&apos;t feel complicated or uncertain. Every package on
              our platform comes with transparent pricing, verified guides,
              and clear information about what&apos;s included — so you can
              focus on the excitement of the journey, not the logistics.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Whether you&apos;re planning a weekend escape to the hills or
              a week-long adventure by the coast, TripNest brings together
              handpicked experiences from agencies who care about quality
              as much as we do.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl">
            <img
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
              alt="Travelers exploring a destination"
              className="h-80 w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              What We Stand For
            </h2>
            <p className="mt-2 text-slate-500">
              The principles that guide everything we build
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50">
                  <value.icon className="h-5 w-5 text-teal-600" />
                </div>
                <h3 className="mt-4 text-base font-bold text-slate-900">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-teal-600 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center text-white">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
                  <stat.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-2xl font-bold sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-teal-50 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}