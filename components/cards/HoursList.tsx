export type HourEntry = { day: string; time: string; closed?: boolean };

export default function HoursList({ hours }: { hours: HourEntry[] }) {
  return (
    <ul className="m-0 mb-10 list-none p-0">
      {hours.map((h) => (
        <li
          key={h.day}
          className="border-rule flex items-baseline justify-between border-b py-3.5 text-[15.5px] last:border-0"
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
