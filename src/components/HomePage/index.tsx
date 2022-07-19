import { LoginAndElseButtons } from "./LoginAndElseButtons";
import { useCallback, useEffect, useRef } from "react";
import myGif from "../../recording3.gif";

const HomePage = () => {
  const targets = useRef<(HTMLDivElement | HTMLUListElement)[]>([]);
  const addToTargets = useCallback(
    (elm: HTMLDivElement | HTMLUListElement | null) => {
      if (!elm) return;
      if (targets.current.includes(elm)) return;
      targets.current.push(elm);
    },
    []
  );
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-scrollIn");
        } else {
          entry.target.classList.remove("animate-scrollIn");
        }
      });
    });

    targets.current.forEach((target) => {
      observer.observe(target);
    });
  }, []);

  return (
    <div className="my-10 flex flex-col  items-center gap-16 cursor-default">
      <div className="w-full text-center">
        <h1 className="text-4xl font-extrabold xs:text-5xl">Collab-Note-YJS</h1>
        <div className="text-xs xs:text-base flex flex-row items-center justify-center flex-wrap">
          {/* <div className="w-[300px]">
            enables realtime collaborative notetaking
          </div>
          <div className="w-[60px]"> with YJS</div> */}
          enables realtime collaborative notetaking with YJS
        </div>
      </div>
      <LoginAndElseButtons />
      <div className="w-full sm:w-[640px] px-5">
        <div className="w-full text-center text-3xl xs:text-4xl pb-3">
          {"Try it with your friends👨‍👩‍👦"}
        </div>
        <img
          src={myGif}
          alt="captured screen"
          className="w-full border-4 border-gray-500"
        />
      </div>

      <div className="w-full mx-3">
        <h2 className="text-3xl xs:text-4xl w-full text-center">TECH STACK</h2>
        <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-center md:gap-5 lg:gap-16 px-5 md:ml-10 ">
          <div className="w-52">
            <h3 className="text-2xl xs:text-3xl">Frontend:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500 text-lg xs:text-2xl"
            >
              <li>TypeScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Yjs</li>
              <li>Tip Tap</li>
            </ul>
          </div>
          <div className="w-52">
            <h3 className="text-2xl xs:text-3xl">Backend:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500 text-lg xs:text-2xl"
            >
              <li>TypeScript</li>
              <li>Express</li>
              <li>ws</li>
              <li>Yjs</li>
              <li>PostgreSQL</li>
              <li>knex</li>
              <li>Redis</li>
            </ul>
          </div>
          <div className="w-44">
            <h3 className="text-2xl xs:text-3xl">Testing:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500 text-lg xs:text-2xl"
            >
              <li>jest</li>
              <li>supertest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
