export type Testimonial = {
  text: string;
  name: string;
  initial: string;
};

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="border-rule bg-bg-2 relative border px-8 py-9">
      <span
        aria-hidden
        className="text-gold absolute top-2 left-[22px] font-serif text-[90px] leading-none opacity-40"
      >
        &ldquo;
      </span>
      <p className="text-ink relative mt-6 mb-7 font-serif text-[18px] leading-[1.6] italic">
        {testimonial.text}
      </p>
      <div className="border-rule flex items-center gap-3.5 border-t pt-[18px]">
        <span className="bg-bg-3 border-gold text-gold inline-flex h-10 w-10 items-center justify-center rounded-full border font-serif text-[16px] italic">
          {testimonial.initial}
        </span>
        <div className="text-[14px]">
          <div className="text-ink">{testimonial.name}</div>
          <div className="text-gold mt-0.5 text-[11px] tracking-[2px]">★ ★ ★ ★ ★</div>
        </div>
      </div>
    </article>
  );
}
