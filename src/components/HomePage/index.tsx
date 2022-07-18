import { LoginAndElseButtons } from "./LoginAndElseButtons";
import { useCallback, useEffect, useRef } from "react";

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
          entry.target.classList.add("bg-red-50");
        } else {
          entry.target.classList.remove("bg-red-50");
        }
      });
    });

    targets.current.forEach((target) => {
      observer.observe(target);
    });
  }, []);

  return (
    <div className="my-10 flex flex-col justify-center gap-10">
      <div className="w-full text-center">
        <h1 className="text-4xl">Collab-Note-YJS</h1>
        <p className="text-sm">
          enables realtime collaborative notetaking with YJS
        </p>
      </div>
      <LoginAndElseButtons />

      <div className="w-full mx-3">
        <h2 className="text-2xl">Tech stack</h2>
        <div className="flex flex-col gap-5 mt-5">
          <div>
            <h3 className="text-xl">Frontend:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500"
            >
              <li>TypeScript</li>
              <li>React</li>
              <li>Tailwind CSS</li>
              <li>Yjs</li>
              <li>Tip Tap</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl">Backend:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500"
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
          <div>
            <h3 className="text-xl">Testing:</h3>
            <ul
              ref={addToTargets}
              className="list-disc list-inside pl-5 transition duration-500"
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
