import Nav from "@/components/site/Nav";
import Motion from "@/components/site/Motion";
import { ContactSheet, Cover, Experience, Materials, Profile, Work } from "@/components/site/Sections";

export default function HomePage() {
  return <>
    <a className="skip" href="#profile">Skip to content</a>
    <Nav />
    <main id="main">
      <Cover />
      <Profile />
      <Work />
      <Experience />
      <Materials />
      <ContactSheet />
    </main>
    <Motion />
  </>;
}
