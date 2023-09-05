import Pricing from "./components/Pricing";
import Features from "./components/Features";
import About from "./components/About";

export default async function IndexPage(): Promise<JSX.Element> {
  return (
    <>
      <Pricing />

      <Features />

      <About />
    </>
  );
}
