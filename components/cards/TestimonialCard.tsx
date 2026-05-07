export type Testimonial = {
  text: string;
  name: string;
  initial: string;
};

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="relative px-8 py-9 border border-rule bg-bg-2">
      <span
        aria-hidden
        className="absolute top-2 left-[22px] font-serif text-[90px] text-gold leading-none opacity-40"
      >
        &ldquo;
      </span>
      <p className="relative font-serif italic text-[18px] leading-[1.6] text-ink mt-6 mb-7">
        {testimonial.text}
      </p>
      <div className="flex items-center gap-3.5 pt-[18px] border-t border-rule">
        <span className="w-10 h-10 rounded-full bg-bg-3 border border-gold inline-flex items-center justify-center font-serif italic text-gold text-[16px]">
          {testimonial.initial}
        </span>
        <div className="text-[14px]">
          <div className="text-ink">{testimonial.name}</div>
          <div className="text-gold text-[11px] tracking-[2px] mt-0.5">★ ★ ★ ★ ★</div>
        </div>
      </div>
    </article>
  );
}
