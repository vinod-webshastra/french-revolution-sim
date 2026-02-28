import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const ROLES = [
  {
    id: "baker",
    name: "Parisian Baker",
    emoji: "🍞",
    description: "You run a bakery in Paris. Bread is the most political commodity in France.",
    flavor: "Your hands are calloused from kneading dough before dawn. Your neighbors depend on you for survival.",
    stats: { money: 30, influence: 15, survival: 100 },
  },
  {
    id: "noble",
    name: "Minor Noble",
    emoji: "⚜️",
    description: "You hold a small estate outside Paris. You have privilege — and the resentment that comes with it.",
    flavor: "Your title is real. Your debts are growing. The peasants on your land are watching you closely.",
    stats: { money: 150, influence: 60, survival: 100 },
  },
  {
    id: "merchant",
    name: "Bourgeois Merchant",
    emoji: "📜",
    description: "You've built wealth through trade. You pay taxes but have no political voice.",
    flavor: "You've read Voltaire and Rousseau. You believe in merit, not birth. The system infuriates you.",
    stats: { money: 200, influence: 35, survival: 100 },
  },
];

const TURNS = [
  {
    year: "1787",
    title: "The Harvest Fails",
    worldEvent:
      "A brutal drought has destroyed the grain harvest across France. Bread prices are doubling. The poor are skipping meals. The royal treasury is empty from war debts. Something is breaking.",
    roles: {
      baker: {
        situation:
          "Your grain supplier raises prices. You can't sell at the old price and survive. Your neighbors line up at dawn — faces you know. They're already stretched thin.",
        choices: [
          {
            text: "Raise bread prices to cover your costs",
            outcome:
              "Your shop stays profitable. But customers call you a profiteer. Trust erodes on your street.",
            effect: { money: 20, influence: -10, survival: 0 },
            principle:
              "Scarcity + individual self-interest = accelerated collective suffering. Each individually rational decision compounds the crisis.",
          },
          {
            text: "Sell at cost — absorb the loss yourself",
            outcome:
              "People remember. Your reputation as a fair baker becomes your most valuable asset.",
            effect: { money: -15, influence: 15, survival: 5 },
            principle:
              "Legitimacy is earned through fairness during hardship, not just during good times. The social contract is renewed — or broken — in moments of scarcity.",
          },
          {
            text: "Secretly hoard extra grain in your cellar",
            outcome:
              "You feel secure. But less bread on the market means higher prices everywhere. You've made things worse.",
            effect: { money: 0, influence: -5, survival: 0 },
            principle:
              "Individually rational hoarding is collectively catastrophic. Systems collapse not through malice, but through each person acting reasonably for themselves.",
          },
        ],
      },
      noble: {
        situation:
          "Your tenant farmers can barely pay rent. The King is demanding new taxes — even from nobles, which has never happened. Your fellow nobles are outraged.",
        choices: [
          {
            text: "Demand full rent from tenants regardless",
            outcome:
              "Some pay, some flee. Your income stabilizes. But the hatred on your estate is palpable now.",
            effect: { money: 30, influence: -20, survival: -5 },
            principle:
              "Extracting maximum value from dependents during a crisis accelerates the collapse of the system that protects you.",
          },
          {
            text: "Reduce rents temporarily to keep your tenants loyal",
            outcome:
              "They stay. They work. Your estate remains calm when others begin to burn.",
            effect: { money: -20, influence: 15, survival: 10 },
            principle:
              "Strategic generosity during hardship is not charity — it's the price of long-term stability. Legitimacy must be continuously earned.",
          },
          {
            text: "Petition the King to exempt nobles from the new tax",
            outcome:
              "The nobility largely wins. But the Third Estate watches — seething — as elites protect themselves while others starve.",
            effect: { money: 20, influence: 5, survival: -5 },
            principle:
              "Elites protecting their privileges during a fiscal crisis while others suffer is one of history's most reliable predictors of revolution.",
          },
        ],
      },
      merchant: {
        situation:
          "Trade routes are disrupted. Your business is hurting. But you also see a systemic injustice: merchants like you fund the kingdom with taxes and get zero say in how it's run.",
        choices: [
          {
            text: "Buy grain cheaply now and resell at high prices later",
            outcome:
              "You profit handsomely. But people in the market start calling you a speculator. Trust fractures.",
            effect: { money: 60, influence: -15, survival: 0 },
            principle:
              "Speculation during scarcity is legal but corrosive to social trust. Markets are embedded in communities — they can't function without legitimacy.",
          },
          {
            text: "Organize a merchant cooperative to stabilize prices",
            outcome:
              "It works, moderately. You gain genuine respect — and a network of people who owe you favors.",
            effect: { money: -10, influence: 20, survival: 5 },
            principle:
              "Collective action solves coordination problems that individual self-interest cannot. The market is not always self-regulating.",
          },
          {
            text: "Write a pamphlet calling for grain reform and political rights for merchants",
            outcome:
              "It circulates in the cafés. Debates erupt. You become known as a voice of reason — and a troublemaker.",
            effect: { money: 0, influence: 20, survival: -5 },
            principle:
              "Ideas travel faster than grain. Intellectual dissent is often the first visible crack in a regime's foundation — long before the barricades appear.",
          },
        ],
      },
    },
  },
  {
    year: "1789",
    title: "The Bastille Falls",
    worldEvent:
      "Spring 1789. Bread prices hit record highs. The Estates-General convenes but deadlocks. On July 14th, a crowd storms the Bastille prison. The governor's head parades through Paris on a pike. The King's army stands down. Something irreversible has happened.",
    roles: {
      baker: {
        situation:
          "Your district is wild with energy and fear. A crowd of women appears at your door demanding bread at the old price. They are not asking. In the distance, you hear shouting.",
        choices: [
          {
            text: "Give the women bread at the old price — take the loss",
            outcome:
              "They cheer you. 'The baker on rue Saint-Denis is one of us.' Your neighborhood becomes your protection.",
            effect: { money: -25, influence: 25, survival: 15 },
            principle:
              "Acts of solidarity during a crisis create social bonds that become tangible protection when things turn dangerous. Reputation is not abstract — it's survival.",
          },
          {
            text: "Refuse and call the guard",
            outcome:
              "The guard doesn't come. The women take the bread. Your window is broken. You've been marked.",
            effect: { money: -20, influence: -20, survival: -20 },
            principle:
              "When institutions stop responding, those who relied on them are suddenly exposed. The guard's absence is as significant as the crowd's presence.",
          },
          {
            text: "Pin on the cockade and join the march to Versailles",
            outcome:
              "You're among the thousands who walk to Versailles. The King agrees to come to Paris. You helped move a king.",
            effect: { money: -5, influence: 20, survival: -10 },
            principle:
              "Mass physical presence — bodies in space — has political power that petitions cannot match. But the personal cost is real.",
          },
        ],
      },
      noble: {
        situation:
          "A rider arrives: the Bastille has fallen. Your servants are whispering. Your estate manager warns you the peasants are meeting at night. The old world ended yesterday.",
        choices: [
          {
            text: "Flee to England immediately",
            outcome:
              "You're safe. Your estate is left unmanaged. Within a year, peasants take the forest. You watch France from London.",
            effect: { money: -30, influence: -25, survival: 20 },
            principle:
              "Abandoning a position of responsibility doesn't neutralize the problem — it means someone else fills the vacuum, on their terms, not yours.",
          },
          {
            text: "Meet with the peasant leaders on your estate",
            outcome:
              "Deeply uncomfortable. You make modest concessions. Your estate stays calm when others burn.",
            effect: { money: -15, influence: 20, survival: 20 },
            principle:
              "Listening to grievances before they become demands is always cheaper than after. Power that adapts survives. Power that refuses to adapt breaks.",
          },
          {
            text: "Publicly renounce your feudal privileges in the National Assembly",
            outcome:
              "The Night of August 4th — you're there, voluntarily surrendering centuries of privilege. It's the most extraordinary thing you've ever done.",
            effect: { money: -40, influence: 35, survival: 25 },
            principle:
              "Voluntarily surrendering privilege is among the most powerful ways to survive a revolution — and among the rarest. It requires believing the old system was genuinely wrong.",
          },
        ],
      },
      merchant: {
        situation:
          "The Third Estate has declared itself a National Assembly. The King locked them out; they moved to a tennis court and swore not to disband. Now the Bastille has fallen. You are suddenly part of history.",
        choices: [
          {
            text: "Sign the Tennis Court Oath — commit publicly to the Assembly",
            outcome:
              "You're in. You're a founder. It's exhilarating and terrifying in equal measure.",
            effect: { money: 0, influence: 25, survival: -10 },
            principle:
              "Public commitment to a cause creates accountability. You can no longer sit on the fence — which is both your greatest vulnerability and your greatest asset.",
          },
          {
            text: "Support privately but stay publicly neutral",
            outcome:
              "You hedge safely. When the revolution consolidates, the real founders get the positions of power.",
            effect: { money: 10, influence: 5, survival: 10 },
            principle:
              "Hedging in revolutionary moments keeps you alive but forfeits influence. The moderate, careful position is often the politically weakest one.",
          },
          {
            text: "Propose a constitutional monarchy as a compromise",
            outcome:
              "Your proposal is debated seriously. Radicals dismiss you as a collaborator. Moderates love you. You're caught in the middle.",
            effect: { money: 0, influence: 15, survival: 0 },
            principle:
              "The most logically coherent position is often politically untenable. In polarized moments, the moderate is trusted by neither side.",
          },
        ],
      },
    },
  },
  {
    year: "1792",
    title: "War and the Jacobins Rise",
    worldEvent:
      "France declares war on Austria. The war goes badly. Émigré nobles at the borders urge foreign invasion. Paranoia grips Paris. Radical Jacobins are rising. The King has secretly written to foreign enemies. The moderate Girondins are losing ground fast.",
    roles: {
      baker: {
        situation:
          "Your district is being pressured to send men to the army. Rations are tightening again. A neighbor hints that another neighbor — the one who always seemed a bit royalist — should probably be reported.",
        choices: [
          {
            text: "Volunteer for the revolutionary army",
            outcome:
              "You serve. You survive. You return with credibility that protects you in what comes next.",
            effect: { money: -10, influence: 20, survival: -10 },
            principle:
              "Revolutionary credibility earned through real sacrifice is the most durable form of political protection. It cannot be faked or purchased.",
          },
          {
            text: "Stay — your neighborhood needs bread more than soldiers",
            outcome:
              "Some call you a coward. But the families left behind eat because of you.",
            effect: { money: 15, influence: -5, survival: 5 },
            principle:
              "Unglamorous, practical work sustains a movement — but rarely earns the recognition that sacrifice does. Communities need both.",
          },
          {
            text: "Organize a neighborhood committee to support army families",
            outcome:
              "You become a genuine local leader. The committee grows. You are woven into the fabric of the new order.",
            effect: { money: -10, influence: 25, survival: 10 },
            principle:
              "Community institutions built during crisis become permanent features of the new order. This is how ordinary people gain lasting structural power.",
          },
        ],
      },
      noble: {
        situation:
          "People look at you sideways now. Do you have émigré contacts? The Jacobins are asking questions about everyone with a title. Every letter you receive is a potential liability.",
        choices: [
          {
            text: "Join the revolutionary army as an officer",
            outcome:
              "A dangerous gamble. Some nobles do this. A few become heroes of the Republic — and survive everything that follows.",
            effect: { money: -20, influence: 15, survival: -15 },
            principle:
              "Demonstrating loyalty through costly, public action is often the only way for members of the former elite to survive a revolution that suspects them by default.",
          },
          {
            text: "Keep an extremely low profile. Burn all letters from émigrés.",
            outcome:
              "You become invisible. Right now, that is your most valuable asset.",
            effect: { money: 0, influence: -5, survival: 15 },
            principle:
              "Sometimes the best strategy is to become uninteresting to those in power. Visibility and safety are often inversely proportional during purges.",
          },
          {
            text: "Secretly contact émigré relatives for support",
            outcome:
              "The letters are intercepted. Your name appears on a list in Paris. You have weeks, maybe.",
            effect: { money: 0, influence: -10, survival: -30 },
            principle:
              "Foreign contacts during a nationalist revolution are treated as treason — the revolution always suspects internal collaboration. Always.",
          },
        ],
      },
      merchant: {
        situation:
          "The war economy is destroying normal trade. Your moderate Girondin allies are losing political ground fast. You have to decide where to stand — and the window to decide is closing.",
        choices: [
          {
            text: "Align openly with the moderate Girondins",
            outcome:
              "You have allies you respect. But the Girondins are losing. Your association with them is becoming dangerous.",
            effect: { money: -10, influence: 10, survival: -15 },
            principle:
              "In a revolutionary civil war, choosing a faction means your survival depends on that faction's survival. The moderate faction rarely wins.",
          },
          {
            text: "Avoid factions entirely — focus on supplying the army",
            outcome:
              "War contracts make you valuable. Being economically indispensable is a form of protection no political position can guarantee.",
            effect: { money: 50, influence: 5, survival: 10 },
            principle:
              "Being essential to whoever holds power is a survival strategy across every political transition. The revolution still needs to eat, move, and equip itself.",
          },
          {
            text: "Quietly move your assets out of France",
            outcome:
              "Smart financially. If discovered, it's treason. You succeed — and lose all political standing.",
            effect: { money: 40, influence: -20, survival: 5 },
            principle:
              "Capital flight is individually rational but signals — and accelerates — a collapse in confidence. It's a self-fulfilling prophecy of systemic failure.",
          },
        ],
      },
    },
  },
  {
    year: "1793–94",
    title: "The Terror",
    worldEvent:
      "Robespierre and the Committee of Public Safety now rule France. The guillotine runs daily. The King has been executed. Former allies are being arrested. The revolution is devouring its own. No one is safe — including those who built this.",
    roles: {
      baker: {
        situation:
          "A neighbor has been denounced. The Revolutionary Tribunal is asking questions in your district. People are watching who you associate with. One wrong word from anyone could end everything.",
        choices: [
          {
            text: "Denounce a neighbor you've long suspected of royalist sympathies",
            outcome:
              "You survive. They don't. You will carry that for the rest of your life.",
            effect: { money: 0, influence: -20, survival: 20 },
            principle:
              "The Terror created rational incentives to denounce others for self-protection — a trap that destroyed social trust across French society for a generation.",
          },
          {
            text: "Stay silent. Refuse to denounce anyone.",
            outcome:
              "Some look at you suspiciously. But the neighborhood you've served for years quietly closes ranks around you.",
            effect: { money: 0, influence: 10, survival: 10 },
            principle:
              "Social capital built over years becomes tangible protection in moments of danger. The solidarity you created in 1787 is paying dividends now.",
          },
          {
            text: "Hide a suspect family in your cellar",
            outcome:
              "It's enormously dangerous. They survive. So do you — barely. Not everyone who takes this risk is so fortunate.",
            effect: { money: 0, influence: 25, survival: -15 },
            principle:
              "Some people choose conscience over survival. These choices — costly, unnecessary, human — define the moral legacy of an era long after the politics are forgotten.",
          },
        ],
      },
      noble: {
        situation:
          "This is the most dangerous moment of your life. Your title alone makes you suspect. Everything now depends on the choices you made in 1787, 1789, and 1792.",
        choices: [
          {
            text: "Present yourself to the Tribunal and argue your record",
            outcome:
              "It's a gamble. If you renounced privilege and served the revolution, you may walk out. If you hedged — likely not.",
            effect: { money: 0, influence: 5, survival: -5 },
            principle:
              "Revolutionary tribunals are not courts. Your actual guilt or innocence matters less than your perceived threat to those currently holding power.",
          },
          {
            text: "Escape through forged papers and a sympathetic network",
            outcome:
              "You get out. You live in exile. France shapes itself without you.",
            effect: { money: -30, influence: -25, survival: 25 },
            principle:
              "Survival sometimes means accepting the total loss of everything else — status, home, identity. Some call this wisdom. Others call it abandonment.",
          },
          {
            text: "Trust in the goodwill you've built through your earlier choices",
            outcome:
              "The protection available to you now was built in 1787, 1789, and 1792. This is the moment all of it either holds — or doesn't.",
            effect: { money: 0, influence: 0, survival: 15 },
            principle:
              "Survival in a revolution is rarely decided in the moment of crisis — it's decided by patterns of behavior established across years. Your reputation is your fate.",
          },
        ],
      },
      merchant: {
        situation:
          "Former allies are being arrested. Your business dealings are being scrutinized. Robespierre's people are checking everyone's records. Everything you've built is on the table.",
        choices: [
          {
            text: "Use your supply contracts to prove indispensable value to the Republic",
            outcome:
              "You're too useful to kill right now. The Terror passes. You emerge positioned for what comes next.",
            effect: { money: 20, influence: 10, survival: 20 },
            principle:
              "Economic utility often survives political transitions. The revolution needs people who can keep logistics running — and it knows it.",
          },
          {
            text: "Go into hiding until this passes",
            outcome:
              "You disappear for months. When Robespierre falls in Thermidor, you emerge. Shaken. Alive.",
            effect: { money: -20, influence: -15, survival: 15 },
            principle:
              "The Terror ended. Those who survived it and remained in France shaped the next phase. Strategic absence has permanent costs.",
          },
          {
            text: "Publicly denounce the Terror as a betrayal of revolutionary principles",
            outcome:
              "You're arrested within days. But Robespierre falls before your execution. You become a hero of the moderate Republic.",
            effect: { money: -10, influence: 35, survival: -20 },
            principle:
              "Speaking truth to revolutionary power is almost always costly in the short term. Sometimes — not always — it is vindicated. This time, barely.",
          },
        ],
      },
    },
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function StatBar({ label, value, max, color }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="mb-1">
      <div className="flex justify-between text-xs mb-0.5">
        <span className="text-stone-400">{label}</span>
        <span className="text-stone-300">{value}</span>
      </div>
      <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function Delta({ val }) {
  if (val === 0) return null;
  const positive = val > 0;
  return (
    <span className={`text-xs font-bold ml-1 ${positive ? "text-green-400" : "text-red-400"}`}>
      {positive ? `+${val}` : val}
    </span>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }) {
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl text-center">
        <div className="text-6xl mb-6">⚔️</div>
        <h1 className="text-4xl font-bold text-yellow-400 mb-2">
          Liberté ou la Mort
        </h1>
        <p className="text-stone-400 text-sm mb-8 italic">
          An interactive simulation of the French Revolution
        </p>
        <blockquote className="border-l-2 border-yellow-600 pl-4 text-left mb-8 text-stone-300 text-sm leading-relaxed">
          "Computer programming captures the underlying principles of an experience.
          Not the experience itself — but the laws that govern it. And those principles
          can enable thousands of different experiences that all follow those laws."
          <footer className="mt-2 text-stone-500">— Steve Jobs, 1983</footer>
        </blockquote>
        <p className="text-stone-300 mb-2 leading-relaxed">
          You will not memorize the French Revolution. You will <em>feel</em> the forces
          that caused it — through your own choices.
        </p>
        <p className="text-stone-400 text-sm mb-8">
          4 historical moments · 3 roles · decisions with real consequences · principles you'll discover yourself
        </p>
        <button
          onClick={onStart}
          className="px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-stone-950 font-bold rounded transition-colors text-lg"
        >
          Begin →
        </button>
      </div>
    </div>
  );
}

function RoleSelectScreen({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full">
        <h2 className="text-2xl font-bold text-yellow-400 mb-1 text-center">
          Choose Your Role
        </h2>
        <p className="text-stone-400 text-sm text-center mb-8">
          Paris, 1787. The storm hasn't broken yet — but you can feel it coming.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onSelect(r)}
              className={`text-left p-5 rounded-lg border transition-all duration-200 ${
                hovered === r.id
                  ? "border-yellow-500 bg-stone-800"
                  : "border-stone-700 bg-stone-900"
              }`}
            >
              <div className="text-4xl mb-3">{r.emoji}</div>
              <h3 className="font-bold text-yellow-400 mb-1">{r.name}</h3>
              <p className="text-stone-300 text-sm mb-3">{r.description}</p>
              <p className="text-stone-500 text-xs italic">{r.flavor}</p>
              <div className="mt-4 pt-3 border-t border-stone-700">
                <div className="text-xs text-stone-500 mb-1">Starting position</div>
                <div className="flex gap-3 text-xs">
                  <span className="text-yellow-600">💰 {r.stats.money}</span>
                  <span className="text-blue-400">🗣 {r.stats.influence}</span>
                  <span className="text-green-400">❤️ {r.stats.survival}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function GameScreen({ turnData, role, stats, turnIndex, totalTurns, onChoice }) {
  const roleData = turnData.roles[role.id];
  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-yellow-500 text-sm font-mono">
              {role.emoji} {role.name}
            </span>
            <div className="text-stone-500 text-xs">
              Turn {turnIndex + 1} of {totalTurns}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-yellow-400">{turnData.year}</div>
            <div className="text-stone-400 text-sm">{turnData.title}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-stone-800 rounded mb-6">
          <div
            className="h-full bg-yellow-600 rounded transition-all duration-500"
            style={{ width: `${((turnIndex + 1) / totalTurns) * 100}%` }}
          />
        </div>

        {/* Stats */}
        <div className="bg-stone-900 rounded-lg p-4 mb-6 grid grid-cols-3 gap-4 text-sm">
          <StatBar label="💰 Money" value={stats.money} max={300} color="bg-yellow-500" />
          <StatBar label="🗣 Influence" value={stats.influence} max={100} color="bg-blue-500" />
          <StatBar label="❤️ Survival" value={stats.survival} max={120} color="bg-green-500" />
        </div>

        {/* World event */}
        <div className="border border-stone-700 rounded-lg p-4 mb-4 bg-stone-900">
          <div className="text-xs text-stone-500 uppercase tracking-wider mb-2">
            What's happening in France
          </div>
          <p className="text-stone-300 text-sm leading-relaxed">{turnData.worldEvent}</p>
        </div>

        {/* Role-specific situation */}
        <div className="border border-yellow-800 rounded-lg p-4 mb-6 bg-stone-900">
          <div className="text-xs text-yellow-600 uppercase tracking-wider mb-2">
            Your situation
          </div>
          <p className="text-stone-200 leading-relaxed">{roleData.situation}</p>
        </div>

        {/* Choices */}
        <div className="text-xs text-stone-500 uppercase tracking-wider mb-3">
          What do you do?
        </div>
        <div className="space-y-3">
          {roleData.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => onChoice(choice)}
              className="w-full text-left p-4 border border-stone-600 hover:border-yellow-500 bg-stone-900 hover:bg-stone-800 rounded-lg transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <span className="text-yellow-600 font-bold text-sm mt-0.5 group-hover:text-yellow-400">
                  {String.fromCharCode(65 + i)}.
                </span>
                <span className="text-stone-200 group-hover:text-white transition-colors">
                  {choice.text}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ConsequenceScreen({ choice, prevStats, newStats, isLast, onNext }) {
  const diffs = {
    money: newStats.money - prevStats.money,
    influence: newStats.influence - prevStats.influence,
    survival: newStats.survival - prevStats.survival,
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Outcome */}
        <div className="border border-stone-600 bg-stone-900 rounded-lg p-6 mb-6">
          <div className="text-xs text-stone-500 uppercase tracking-wider mb-3">
            What happened
          </div>
          <p className="text-stone-200 leading-relaxed text-lg">{choice.outcome}</p>
        </div>

        {/* Stat changes */}
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-4 mb-6">
          <div className="text-xs text-stone-500 uppercase tracking-wider mb-3">
            Effects on your position
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "💰 Money", key: "money", val: newStats.money, diff: diffs.money },
              { label: "🗣 Influence", key: "influence", val: newStats.influence, diff: diffs.influence },
              { label: "❤️ Survival", key: "survival", val: newStats.survival, diff: diffs.survival },
            ].map((s) => (
              <div key={s.key} className="text-center">
                <div className="text-xs text-stone-500 mb-1">{s.label}</div>
                <div className="text-lg font-bold text-stone-200">
                  {s.val}
                  <Delta val={s.diff} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Principle */}
        <div className="border-l-4 border-yellow-500 pl-5 py-2 mb-8 bg-stone-900 rounded-r-lg pr-5">
          <div className="text-xs text-yellow-600 uppercase tracking-wider mb-2">
            💡 Principle at work
          </div>
          <p className="text-yellow-100 leading-relaxed">{choice.principle}</p>
        </div>

        <button
          onClick={onNext}
          className="w-full py-3 bg-yellow-600 hover:bg-yellow-500 text-stone-950 font-bold rounded transition-colors"
        >
          {isLast ? "See your outcome →" : "Continue to next year →"}
        </button>
      </div>
    </div>
  );
}

function OutcomeScreen({ role, finalStats, choiceHistory }) {
  const principles = choiceHistory.map((c) => c.principle);
  const survived = finalStats.survival > 50;
  const influential = finalStats.influence > 50;

  let verdict = "";
  if (survived && influential)
    verdict = "You not only survived the Revolution — you shaped it. Few could say the same.";
  else if (survived && !influential)
    verdict =
      "You made it through. Bruised, quieter, perhaps wiser. The Revolution swept past you rather than through you.";
  else if (!survived && influential)
    verdict =
      "Your name is remembered. Whether with honor or infamy depends on who writes the history.";
  else
    verdict =
      "The Revolution was not kind to you. But the principles you glimpsed are still true — whoever applies them next may do better.";

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <div className="text-5xl mb-4">{role.emoji}</div>
          <h2 className="text-3xl font-bold text-yellow-400 mb-2">Your Revolution</h2>
          <p className="text-stone-400 text-sm">{role.name} · Paris, 1787–1794</p>
        </div>

        {/* Final stats */}
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-5 mb-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: "💰 Final wealth", val: finalStats.money },
              { label: "🗣 Final influence", val: finalStats.influence },
              { label: "❤️ Survival score", val: finalStats.survival },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-xs text-stone-500 mb-1">{s.label}</div>
                <div className="text-2xl font-bold text-stone-200">{Math.max(0, s.val)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Verdict */}
        <div className="border border-yellow-700 bg-stone-900 rounded-lg p-5 mb-6">
          <div className="text-xs text-yellow-600 uppercase tracking-wider mb-2">Verdict</div>
          <p className="text-stone-200 leading-relaxed">{verdict}</p>
        </div>

        {/* Principles discovered */}
        <div className="mb-8">
          <div className="text-xs text-stone-500 uppercase tracking-wider mb-4">
            Principles you discovered
          </div>
          <div className="space-y-3">
            {principles.map((p, i) => (
              <div
                key={i}
                className="flex gap-3 p-3 bg-stone-900 border border-stone-700 rounded-lg"
              >
                <span className="text-yellow-500 text-sm mt-0.5 shrink-0">
                  {i + 1}.
                </span>
                <p className="text-stone-300 text-sm leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* The meta-point */}
        <div className="border-l-4 border-stone-500 pl-4 py-2 mb-8">
          <p className="text-stone-400 text-sm leading-relaxed italic">
            These same principles — scarcity and legitimacy, collective action, elite behavior
            during crisis, the cost of hedging, how power vacuums fill — are active right now,
            in every organization, city, and country you inhabit. You don't need to memorize
            the French Revolution. You just needed to feel why it happened.
          </p>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 border border-stone-600 hover:border-yellow-500 text-stone-400 hover:text-yellow-400 rounded transition-colors text-sm"
        >
          Play again as a different role →
        </button>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function FrenchRevolutionSim() {
  const [screen, setScreen] = useState("welcome");
  const [role, setRole] = useState(null);
  const [turn, setTurn] = useState(0);
  const [stats, setStats] = useState(null);
  const [prevStats, setPrevStats] = useState(null);
  const [choiceHistory, setChoiceHistory] = useState([]);
  const [lastChoice, setLastChoice] = useState(null);
  const [showConsequence, setShowConsequence] = useState(false);

  const selectRole = (r) => {
    setRole(r);
    setStats({ ...r.stats });
    setScreen("game");
  };

  const makeChoice = (choice) => {
    const newStats = { ...stats };
    Object.entries(choice.effect).forEach(([key, val]) => {
      if (key in newStats) newStats[key] = Math.max(0, newStats[key] + val);
    });
    setPrevStats({ ...stats });
    setStats(newStats);
    setLastChoice(choice);
    setChoiceHistory([...choiceHistory, choice]);
    setShowConsequence(true);
  };

  const nextTurn = () => {
    setShowConsequence(false);
    if (turn + 1 >= TURNS.length) {
      setScreen("outcome");
    } else {
      setTurn(turn + 1);
    }
  };

  if (screen === "welcome") return <WelcomeScreen onStart={() => setScreen("roleSelect")} />;
  if (screen === "roleSelect") return <RoleSelectScreen onSelect={selectRole} />;
  if (screen === "outcome")
    return (
      <OutcomeScreen role={role} finalStats={stats} choiceHistory={choiceHistory} />
    );

  if (showConsequence) {
    return (
      <ConsequenceScreen
        choice={lastChoice}
        prevStats={prevStats}
        newStats={stats}
        isLast={turn + 1 >= TURNS.length}
        onNext={nextTurn}
      />
    );
  }

  return (
    <GameScreen
      turnData={TURNS[turn]}
      role={role}
      stats={stats}
      turnIndex={turn}
      totalTurns={TURNS.length}
      onChoice={makeChoice}
    />
  );
}
