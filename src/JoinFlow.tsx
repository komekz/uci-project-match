import { useState } from "react";
import { add_profile } from "./supaclient"
import type { NewProfile } from "./supaclient";

/* ─── Types ─── */

type Skill = { name: string; level: string };

type FormData = {
  preferredName: string;
  email: string;
  major: string;
  year: string;
  interests: string[];
  skills: Skill[];
  wantToLearn: string;
  weeklyHours: string;
  projectDuration: string;
  commitmentStyle: string;
  projectType: string;
  motivation: string[];
  hasProjectIdea: boolean;
  projectDescription: string;
  lookingFor: string;
  bio: string;
};

const empty: FormData = {
  preferredName: "", email: "", major: "", year: "",
  interests: [], skills: [], wantToLearn: "",
  weeklyHours: "", projectDuration: "", commitmentStyle: "", projectType: "", motivation: [],
  hasProjectIdea: false, projectDescription: "", lookingFor: "",
  bio: "",
};

const TOTAL = 7;

const INTERESTS_LIST = [
  "Robotics", "Embedded Systems", "Electronics", "Mechanical Design",
  "Computer Vision", "AI / Machine Learning", "Web / Software",
  "Aerospace", "Autonomous Systems", "IoT", "Other",
];

const MOTIVATION_LIST = [
  "Learn new skills", "Build my portfolio", "Have fun / build something interesting",
  "Prepare for research", "Explore a startup idea", "Competition / hackathon", "Other",
];

/* ─── Shared helpers ─── */

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1.5">{children}</label>;
}

function TextInput({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 bg-white"
    />
  );
}

function Chip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
        selected
          ? "bg-indigo-50 border-indigo-300 text-indigo-700 font-medium"
          : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
      }`}>
      {label}
    </button>
  );
}

function Segment({ options, value, onChange }: {
  options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button type="button" key={opt} onClick={() => onChange(opt)}
          className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
            value === opt
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}>
          {opt}
        </button>
      ))}
    </div>
  );
}

function RadioCard({ title, description, selected, onClick }: {
  title: string; description: string; selected: boolean; onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick}
      className={`w-full text-left p-4 rounded-md border transition-colors ${
        selected ? "border-indigo-300 bg-indigo-50" : "border-gray-200 bg-white hover:border-gray-300"
      }`}>
      <div className={`font-medium text-sm mb-1 ${selected ? "text-indigo-700" : "text-gray-900"}`}>{title}</div>
      <div className="text-xs text-gray-500 leading-relaxed">{description}</div>
    </button>
  );
}

/* ─── Step 1: About you ─── */

function Step1({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">About you</h2>
        <p className="text-sm text-gray-500">Basic info to get started.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Preferred Name</Label>
          <TextInput value={data.preferredName} onChange={v => set({ preferredName: v })} placeholder="Alex" />
        </div>
        <div>
          <Label>UCI email</Label>
          <TextInput value={data.email} onChange={v => set({ email: v })} placeholder="you@uci.edu" type="email" />
          <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
            Used for verification only. Your email will not be shared with another student unless you both choose to connect.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label>Major</Label>
          <TextInput value={data.major} onChange={v => set({ major: v })} placeholder="e.g. Electrical Engineering" />
        </div>
        <div>
          <Label>Year</Label>
          <div className="flex flex-wrap gap-2">
            {["Freshman", "Sophomore", "Junior", "Senior", "Graduate"].map(y => (
              <button type="button" key={y} onClick={() => set({ year: y })}
                className={`px-3 py-1.5 rounded-md border text-sm transition-colors ${
                  data.year === y
                    ? "bg-indigo-600 border-indigo-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                }`}>
                {y}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Step 2: Interests ─── */

function Step2({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  function toggle(interest: string) {
    const next = data.interests.includes(interest)
      ? data.interests.filter(i => i !== interest)
      : [...data.interests, interest];
    set({ interests: next });
  }
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">What are you interested in?</h2>
        <p className="text-sm text-gray-500">Select everything that applies.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {INTERESTS_LIST.map(i => (
          <Chip key={i} label={i} selected={data.interests.includes(i)} onClick={() => toggle(i)} />
        ))}
      </div>
    </div>
  );
}

/* ─── Step 3: Skills ─── */

function Step3({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState("Intermediate");

  function addSkill() {
    const trimmed = skillName.trim();
    if (!trimmed) return;
    set({ skills: [...data.skills, { name: trimmed, level: skillLevel }] });
    setSkillName("");
  }

  function removeSkill(i: number) {
    set({ skills: data.skills.filter((_, idx) => idx !== i) });
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">What can you do?</h2>
        <p className="text-sm text-gray-500">
          Add your skills and experience level. Beginners are very welcome — you don't need extensive technical experience to participate.
        </p>
      </div>

      <div>
        <Label>Skills</Label>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillName}
            onChange={e => setSkillName(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="e.g. STM32, Python, Fusion 360"
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 bg-white"
          />
          <select
            value={skillLevel}
            onChange={e => setSkillLevel(e.target.value)}
            className="border border-gray-200 rounded-md px-2 py-2 text-sm text-gray-700 focus:outline-none focus:border-indigo-400 bg-white">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
          <button type="button" onClick={addSkill}
            className="px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 whitespace-nowrap">
            Add
          </button>
        </div>
      </div>

      {data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.skills.map((s, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-md px-2.5 py-1.5">
              <span className="text-sm text-gray-800">{s.name}</span>
              <span className="text-xs text-gray-400">· {s.level}</span>
              <button type="button" onClick={() => removeSkill(i)}
                className="text-gray-400 hover:text-gray-600 ml-0.5 text-xs">✕</button>
            </div>
          ))}
        </div>
      )}

      <div>
        <Label>What would you like to learn?</Label>
        <textarea
          value={data.wantToLearn}
          onChange={e => set({ wantToLearn: e.target.value })}
          placeholder="e.g. Computer vision, ROS, circuit design, PCB layout..."
          rows={2}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 resize-none bg-white"
        />
      </div>
    </div>
  );
}

/* ─── Step 4: Work style ─── */

function Step4({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  function toggleMotivation(opt: string) {
    const next = data.motivation.includes(opt)
      ? data.motivation.filter(m => m !== opt)
      : [...data.motivation, opt];
    set({ motivation: next });
  }

  const commitmentOptions = [
    { title: "Casual exploration", desc: "No pressure, just want to try things and see where it goes." },
    { title: "Want to finish, but flexible", desc: "I'd like to actually complete something but life happens." },
    { title: "Serious about finishing", desc: "I want to commit and see it through to completion." },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">How do you want to work?</h2>
        <p className="text-sm text-gray-500">Helps us find people with compatible expectations.</p>
      </div>

      <div>
        <Label>Weekly time commitment</Label>
        <Segment
          options={["<2 hrs", "2–4 hrs", "5–7 hrs", "8–12 hrs", "12+ hrs"]}
          value={data.weeklyHours}
          onChange={v => set({ weeklyHours: v })}
        />
      </div>

      <div>
        <Label>Project duration</Label>
        <Segment
          options={["Weekend", "Few weeks", "One quarter", "Long-term", "Flexible"]}
          value={data.projectDuration}
          onChange={v => set({ projectDuration: v })}
        />
      </div>

      <div>
        <Label>Commitment level</Label>
        <div className="grid sm:grid-cols-3 gap-2">
          {commitmentOptions.map(opt => (
            <RadioCard
              key={opt.title}
              title={opt.title}
              description={opt.desc}
              selected={data.commitmentStyle === opt.title}
              onClick={() => set({ commitmentStyle: opt.title })}
            />
          ))}
        </div>
      </div>

      <div>
        <Label>Preferred project type</Label>
        <Segment
          options={["Hardware", "Software", "Either"]}
          value={data.projectType}
          onChange={v => set({ projectType: v })}
        />
      </div>

      <div>
        <Label>
          Why do you want to work on projects?{" "}
          <span className="text-gray-400 font-normal">Select all that apply.</span>
        </Label>
        <div className="flex flex-wrap gap-2">
          {MOTIVATION_LIST.map(opt => (
            <Chip key={opt} label={opt} selected={data.motivation.includes(opt)} onClick={() => toggleMotivation(opt)} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Step 5: Project idea ─── */

function Step5({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Do you have a project in mind?</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <RadioCard
          title="I already have an idea"
          description="I have something I want to build and need people to work with."
          selected={data.hasProjectIdea === true}
          onClick={() => set({ hasProjectIdea: true })}
        />
        <RadioCard
          title="I just want to build something"
          description="I don't have a specific idea yet. Match me with people with similar interests."
          selected={data.hasProjectIdea === false}
          onClick={() => set({ hasProjectIdea: false })}
        />
      </div>

      {data.hasProjectIdea === true && (
        <div className="space-y-4 pt-1">
          <div>
            <Label>Describe your project</Label>
            <textarea
              value={data.projectDescription}
              onChange={e => set({ projectDescription: e.target.value })}
              placeholder="What are you hoping to build?"
              rows={3}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 resize-none bg-white"
            />
          </div>
          <div>
            <Label>What skills or teammates are you looking for?</Label>
            <textarea
              value={data.lookingFor}
              onChange={e => set({ lookingFor: e.target.value })}
              placeholder="e.g. Someone who knows mechanical design or CAD..."
              rows={2}
              className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 resize-none bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Step 6: Bio ─── */

function Step6({ data, set }: { data: FormData; set: (d: Partial<FormData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Anything else you'd like to add?</h2>
        <p className="text-sm text-gray-500">Optional. This will be shown to potential matches.</p>
      </div>
      <div>
        <textarea
          value={data.bio}
          onChange={e => set({ bio: e.target.value })}
          placeholder="e.g. I'm getting into embedded systems and robotics. I've built a few STM32 projects and would love to work on something involving computer vision or autonomous systems."
          rows={5}
          className="w-full border border-gray-200 rounded-md px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:border-indigo-400 resize-none bg-white"
        />
      </div>
    </div>
  );
}

/* ─── Step 7: Review ─── */

function SummarySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-4 space-y-2">
      <div className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">{title}</div>
      {children}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2 text-sm">
      <span className="text-gray-400 w-28 flex-shrink-0">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  if (!items.length) return null;
  return (
    <div className="flex flex-wrap gap-1.5 mt-0.5">
      {items.map(i => (
        <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{i}</span>
      ))}
    </div>
  );
}

function Step7({ data }: { data: FormData }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Review your profile</h2>
        <p className="text-sm text-gray-500">Take a look before submitting.</p>
      </div>

      <div className="border border-gray-200 rounded-md divide-y divide-gray-100">
        <SummarySection title="About you">
          <div className="space-y-1">
            <SummaryRow label="Name" value={data.preferredName} />
            <SummaryRow label="Email" value={data.email} />
            <SummaryRow label="Major" value={data.major} />
            <SummaryRow label="Year" value={data.year} />
          </div>
        </SummarySection>

        {data.interests.length > 0 && (
          <SummarySection title="Interests">
            <Tags items={data.interests} />
          </SummarySection>
        )}

        {(data.skills.length > 0 || data.wantToLearn) && (
          <SummarySection title="Skills">
            {data.skills.length > 0 && (
              <Tags items={data.skills.map(s => `${s.name} · ${s.level}`)} />
            )}
            {data.wantToLearn && (
              <div className="text-sm text-gray-500 mt-2">
                <span className="text-gray-400">Wants to learn: </span>{data.wantToLearn}
              </div>
            )}
          </SummarySection>
        )}

        <SummarySection title="Work style">
          <div className="space-y-1">
            <SummaryRow label="Time/week" value={data.weeklyHours} />
            <SummaryRow label="Duration" value={data.projectDuration} />
            <SummaryRow label="Commitment" value={data.commitmentStyle} />
            <SummaryRow label="Project type" value={data.projectType} />
          </div>
          {data.motivation.length > 0 && <Tags items={data.motivation} />}
        </SummarySection>

        <SummarySection title="Project idea">
          <div className="text-sm text-gray-800">
            {data.hasProjectIdea === true ? "Has an idea" : data.hasProjectIdea === false ? "Looking to join something" : "—"}
          </div>
          {data.hasProjectIdea === true && data.projectDescription && (
            <p className="text-sm text-gray-600 mt-1">{data.projectDescription}</p>
          )}
          {data.hasProjectIdea === true && data.lookingFor && (
            <div className="text-sm text-gray-500 mt-1">
              <span className="text-gray-400">Looking for: </span>{data.lookingFor}
            </div>
          )}
        </SummarySection>

        {data.bio && (
          <SummarySection title="About">
            <p className="text-sm text-gray-700 leading-relaxed">{data.bio}</p>
          </SummarySection>
        )}
      </div>

      <div className="border border-gray-200 rounded-md bg-gray-50 p-3">
        <p className="text-xs text-gray-500 leading-relaxed">
          Your contact information will not be shared with another participant unless you both choose to connect.
        </p>
      </div>
    </div>
  );
}

/* ─── Success screen ─── */

function SuccessScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center">
          <button onClick={onBack} className="font-semibold text-sm text-gray-900">
            UCI Project Match
          </button>
        </div>
      </nav>
      <div className="flex-1 flex items-start justify-center px-5 pt-20">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">You're in.</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            We'll look for students whose interests, skills, and commitment might make them good project teammates. If we find a promising match, we'll email you their profile and explain why we matched you.
          </p>
          <button onClick={onBack} className="text-sm text-indigo-600 hover:underline">
            ← Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main JoinFlow ─── */

export default function JoinFlow({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState<FormData>({ ...empty });

  function update(partial: Partial<FormData>) {
    setData(prev => ({ ...prev, ...partial }));
  }

  function goNext() {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (step < TOTAL) setStep(s => s + 1);
  }

  function goBack() {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    if (step > 1) setStep(s => s - 1);
    else onBack();
  }

  function submitForm(data: FormData) {
    const profile: NewProfile = {
      bio: data.bio,
      commitment_level: data.commitmentStyle,
      desired_teammate_skills: data.lookingFor,
      email: data.email,
      has_project_idea: data.hasProjectIdea,
      interests: data.interests,
      major: data.major,
      motivations: data.motivation,
      preferred_name: data.preferredName,
      project_description: data.projectDescription,
      project_duration: data.projectDuration,
      project_type: data.projectType,
      skills: data.skills,
      skills_to_learn: data.wantToLearn,
      time_commitment: data.weeklyHours,
      year: data.year
    };
    add_profile(profile).then(e => {
      if (e) {
        setSubmitted(true);
      } else {
        window.alert("submission failed, please try again");
      }
    })
  }

  if (submitted) return <SuccessScreen onBack={onBack} />;

  const progress = (step / TOTAL) * 100;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 h-14 flex items-center justify-between">
          <button onClick={onBack} className="font-semibold text-sm text-gray-900">
            UCI Project Match
          </button>
          <span className="text-xs text-gray-400">Step {step} of {TOTAL}</span>
        </div>
        <div className="h-0.5 bg-gray-100">
          <div
            className="h-full bg-indigo-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </nav>

      {/* Form */}
      <div className="flex-1 max-w-2xl mx-auto w-full px-5 py-10">
        {step === 1 && <Step1 data={data} set={update} />}
        {step === 2 && <Step2 data={data} set={update} />}
        {step === 3 && <Step3 data={data} set={update} />}
        {step === 4 && <Step4 data={data} set={update} />}
        {step === 5 && <Step5 data={data} set={update} />}
        {step === 6 && <Step6 data={data} set={update} />}
        {step === 7 && <Step7 data={data} />}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          <button type="button" onClick={goBack} className="text-sm text-gray-500 hover:text-gray-800">
            {step === 1 ? "← Back to home" : "← Back"}
          </button>
          {step < TOTAL ? (
            <button type="button" onClick={goNext}
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-indigo-700">
              Next
            </button>
          ) : (
            <button type="button" onClick={() => submitForm(data)}
              className="bg-indigo-600 text-white text-sm font-medium px-5 py-2 rounded-md hover:bg-indigo-700">
              Find my matches
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
