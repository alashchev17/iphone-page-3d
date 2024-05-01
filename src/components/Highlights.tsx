import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { rightImg, watchImg } from "../utils";
import VideoCarousel from "./VideoCarousel";

const Highlights = () => {
  useGSAP(() => {
    gsap.to("#highlights-title", {
      opacity: 1,
      y: 0,
    });

    gsap.to(".link", {
      opacity: 1,
      y: 0,
      stagger: 0.25,
      duration: 1,
    });
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen h-full overflow-x-hidden common-padding bg-zinc "
    >
      <div className="screen-max-width">
        <div className="mb-12 md:flex w-full items-end justify-between">
          <h2 id="highlights-title" className="section-heading">
            Get the highlights.
          </h2>
          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="Icon: Play" className="ml-2" />
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="Icon: Play" className="ml-2" />
            </p>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  );
};

export default Highlights;
