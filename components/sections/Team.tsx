import { getTranslations } from "next-intl/server";
import { Container, Section, SectionHead } from "@/components/Primitives";
import BarberCard, { type Barber } from "@/components/cards/BarberCard";

const teamGridLayout = (count: number) => {
  if (count === 1) return "grid-cols-1 max-w-md mx-auto";
  if (count === 2) return "grid-cols-2 max-w-3xl mx-auto";
  return "grid-cols-3";
};

export default async function Team({ team }: { team: Barber[] }) {
  const t = await getTranslations("team");
  return (
    <Section id="team" screenLabel="05 Team">
      <Container>
        <SectionHead eyebrow={t("eyebrow")} titleLine1={t("titleLine1")} titleEm={t("titleEm")} />
        <div className={`grid gap-9 max-[980px]:grid-cols-1 ${teamGridLayout(team.length)}`}>
          {team.map((b) => (
            <BarberCard key={b.name} barber={b} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
