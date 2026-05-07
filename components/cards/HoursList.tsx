export type HourEntry = { day: string; time: string; closed?: boolean };

export default function HoursList({ hours }: { hours: HourEntry[] }) {
  return (
    <ul className="list-none m-0 p-0 mb-10">
      {hours.map((h) => (
        <li
          key={h.day}
          className="flex justify-between items-baseline py-3.5 border-b border-rule last:border-0 text-[15.5px]"
        >
          <span className="font-serif text-[19px]">{h.day}</span>
          <span
            className={`font-mono text-[12px] tracking-[0.15em] ${
              h.closed ? "text-ink-mute" : "text-ink-dim"
            }`}
          >
            {h.time}
          </span>
        </li>
      ))}
    </ul>
  );
}
