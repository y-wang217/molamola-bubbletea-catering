import { cateringPackages, serviceComparison } from "@/content/packages";
import { CateringPackageCard } from "@/components/ui/cards";
import { Container, Section } from "@/components/ui/layout";
import { Reveal } from "@/components/ui/motion";
import { SectionHeader } from "@/components/ui/section-header";
import { DoodleDecoration } from "@/components/doodles/doodle";

/** Catering page: both services in full detail. */
export function CateringPackages() {
  return (
    <Section id="packages" className="pt-10 sm:pt-14">
      <Container>
        <div className="grid gap-8">
          {cateringPackages.map((pkg, i) => (
            <Reveal key={pkg.id} from={i % 2 ? "right" : "left"}>
              <CateringPackageCard pkg={pkg} detailed />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

const Mark = ({ value }: { value: string | boolean }) =>
  value === true ? (
    <DoodleDecoration kind="star" className="mx-auto h-6 w-6" />
  ) : value === false ? (
    <span aria-label="Not included" className="text-ink/30">
      —
    </span>
  ) : (
    <span className="text-[14px] font-semibold">{value}</span>
  );

/** Open comparison table, no card. */
export function ServiceComparison() {
  return (
    <Section id="compare" className="py-16 sm:py-24">
      <Container className="max-w-4xl">
        <SectionHeader tab={{ index: "02", label: "Compare" }} title="Which One Fits?" highlight="Fits?" align="center" intro="Both can be fully customized. The big difference is whether you want us on site." />
        <Reveal className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[30rem] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b-[1.5px] border-linework">
                <th scope="col" className="py-4 pr-4 font-hand text-xl font-normal text-cocoa">
                  what you get
                </th>
                <th scope="col" className="w-36 py-4 text-center font-display text-lg font-extrabold sm:w-44">
                  Ready-to-Serve
                </th>
                <th scope="col" className="w-36 py-4 text-center font-display text-lg font-extrabold sm:w-44">
                  Full Service
                </th>
              </tr>
            </thead>
            <tbody>
              {serviceComparison.map((row) => (
                <tr key={row.feature} className="border-b-[1.5px] border-dashed border-linework/20">
                  <th scope="row" className="py-3.5 pr-4 font-medium">
                    {row.feature}
                  </th>
                  <td className="py-3.5 text-center">
                    <Mark value={row.readyToServe} />
                  </td>
                  <td className="bg-blush-soft/60 py-3.5 text-center">
                    <Mark value={row.fullService} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </Container>
    </Section>
  );
}
