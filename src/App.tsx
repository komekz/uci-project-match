import { useState } from "react";
import JoinFlow from "./JoinFlow";

function Nav({ onJoin }: { onJoin: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
        <span className="font-semibold text-sm text-gray-900">UCI Project Match</span>

        <div className="hidden md:flex items-center gap-6">
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-800">How it works</a>
          <a href="#about" className="text-sm text-gray-500 hover:text-gray-800">About</a>
          <button onClick={onJoin} className="bg-indigo-600 text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-indigo-700">
            Find my matches
          </button>
        </div>

        <button className="md:hidden text-gray-500" onClick={() => setOpen(!open)}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            {open
              ? <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              : <path d="M3 6h14M3 10h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>}
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 px-5 py-4 flex flex-col gap-3 bg-white">
          <a href="#how-it-works" className="text-sm text-gray-500" onClick={() => setOpen(false)}>How it works</a>
          <a href="#about" className="text-sm text-gray-500" onClick={() => setOpen(false)}>About</a>
          <button onClick={() => { setOpen(false); onJoin(); }} className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-md text-center">Find my matches</button>
        </div>
      )}
    </nav>
  );
}

function MatchCards() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        {/* Alex */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-xs font-semibold flex-shrink-0">A</div>
            <div>
              <div className="text-sm font-semibold text-gray-900 leading-none">Alex</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Electrical Eng.</div>
            </div>
          </div>
          <div className="space-y-1 mb-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Skills</div>
            <div className="flex flex-col gap-1">
              {[["STM32", "Intermediate"], ["OpenCV", "Beginner"]].map(([s, l]) => (
                <div key={s} className="flex items-center justify-between">
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                  <span className="text-[10px] text-gray-400">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-gray-500">Robotics · 5–7 hrs/wk</div>
        </div>

        {/* Maya */}
        <div className="border border-gray-200 rounded-lg p-3 bg-white">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-xs font-semibold flex-shrink-0">M</div>
            <div>
              <div className="text-sm font-semibold text-gray-900 leading-none">Maya</div>
              <div className="text-[11px] text-gray-400 mt-0.5">Mechanical Eng.</div>
            </div>
          </div>
          <div className="space-y-1 mb-2.5">
            <div className="text-[10px] text-gray-400 uppercase tracking-wide font-medium">Skills</div>
            <div className="flex flex-col gap-1">
              {[["CAD", "Advanced"], ["Machining", "Intermediate"]].map(([s, l]) => (
                <div key={s} className="flex items-center justify-between">
                  <span className="text-[11px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                  <span className="text-[10px] text-gray-400">{l}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-[11px] text-gray-500">Robotics · 5–7 hrs/wk</div>
        </div>
      </div>

      <div className="border border-green-200 bg-green-50 rounded-lg px-3 py-2 text-[11.5px] text-green-700 text-center">
        Strong match — complementary skills, same availability, both into robotics
      </div>
    </div>
  );
}

function Hero({ onJoin }: { onJoin: () => void }) {
  return (
    <section className="max-w-4xl mx-auto px-5 pt-14 pb-16 flex flex-col items-center text-center">
      <div className="max-w-lg mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
          Find people at UCI to build with.
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-7">
          Match with engineering and CS students based on your interests, skills, and how much time you want to commit. Whether you have a project idea already or just want to build something, we'll help you find people.
        </p>
        <button onClick={onJoin} className="inline-block bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-md text-sm hover:bg-indigo-700">
          Find my matches
        </button>
        <p className="text-xs text-gray-400 mt-3">For UCI students · Contact info only shared after a mutual match</p>
      </div>

      <div className="max-w-sm">
        <p className="text-xs text-gray-400 font-medium mb-2">Example match</p>
        <MatchCards />
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">How it works</h2>
        <div className="space-y-6 max-w-xl">
          {[
            ["1.", "Fill out a short profile", "Your interests, skills, what you want to learn, how many hours a week you can commit."],
            ["2.", "Get matched", "I'll send you potential teammates based on compatible interests, complementary skills, and similar commitment."],
            ["3.", "Connect", "You'll see why you were matched. If you're both interested, contact info gets shared and you take it from there."],
          ].map(([n, title, body]) => (
            <div key={n} className="flex gap-4">
              <span className="text-gray-300 font-semibold text-sm w-5 flex-shrink-0 pt-0.5">{n}</span>
              <div>
                <div className="font-medium text-gray-900 text-sm mb-1">{title}</div>
                <div className="text-gray-500 text-sm leading-relaxed">{body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-8">You don't need an existing project idea to sign up</h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="font-medium text-gray-900 text-sm mb-2">Already have a project idea?</div>
            <p className="text-gray-500 text-sm leading-relaxed">Describe your project and what kinds of teammates you need. We'll look for people with complementary skills and interests.</p>
          </div>
          <div className="border border-gray-200 rounded-lg p-5">
            <div className="font-medium text-gray-900 text-sm mb-2">Just want to build something?</div>
            <p className="text-gray-500 text-sm leading-relaxed">That works too. Tell us what interests you and we'll match you with students who are also looking to start something.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-gray-200 bg-gray-50">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Why I made this</h2>
        <div className="max-w-lg space-y-4 text-gray-500 text-sm leading-relaxed">
          <p>
            I'm an incoming UCI Electrical Engineering transfer, I've found that starting new projects can be quite daunting, and finding like minded people to stay motivated and work with isn't easy either.
          </p>
          <p>
            I thought a tool like this might help, but building the full app isn't particularly straightforward, so I'm just using this to try out the idea first and see if it's actually useful.
          </p>
          <p className="text-gray-400 text-xs">UCI EE Transfer · Class of 2028</p>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ onJoin }: { onJoin: () => void }) {
  return (
    <section id="cta" className="border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-5 py-14">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Find someone to build with.</h2>
        <p className="text-gray-500 text-sm mb-6">Takes about 3–5 minutes to fill out.</p>
        <button onClick={onJoin} className="inline-block bg-indigo-600 text-white font-medium px-5 py-2.5 rounded-md text-sm hover:bg-indigo-700">
          Find my matches
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="max-w-4xl mx-auto px-5 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span className="text-sm font-medium text-gray-700">UCI Project Match</span>
        <p className="text-xs text-gray-400">Student made · Not affiliated with UC Irvine.</p>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState<"landing" | "join">("landing");

  if (view === "join") {
    return <JoinFlow onBack={() => setView("landing")} />;
  }

  return (
    <div className="min-h-full">
      <Nav onJoin={() => setView("join")} />
      <Hero onJoin={() => setView("join")} />
      <HowItWorks />
      <UseCases />
      <About />
      <FinalCTA onJoin={() => setView("join")} />
      <Footer />
    </div>
  );
}
