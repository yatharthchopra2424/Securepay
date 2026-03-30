import { useEffect, useRef } from "react";
import legacyHomepageHtml from "./legacy/legacy-homepage.html?raw";
import legacyMainJs from "../js/main.js?raw";

function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;
    let cancelled = false;

    const parser = new DOMParser();
    const legacyDoc = parser.parseFromString(legacyHomepageHtml, "text/html");
    const previousTitle = document.title;
    const injectedHeadNodes = [];
    const injectedScripts = [];

    document.title = legacyDoc.title || previousTitle;

    const headNodes = legacyDoc.head.querySelectorAll("link, style");
    headNodes.forEach((node) => {
      if (
        node.nodeName.toLowerCase() === "link" &&
        node.getAttribute("rel") === "stylesheet" &&
        node.getAttribute("href") === "css/style.css"
      ) {
        return;
      }
      const clone = node.cloneNode(true);
      document.head.appendChild(clone);
      injectedHeadNodes.push(clone);
    });

    mount.innerHTML = "";
    Array.from(legacyDoc.body.childNodes).forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE && node.nodeName.toLowerCase() === "script") {
        return;
      }
      mount.appendChild(node.cloneNode(true));
    });

    const scriptNodes = [
      ...legacyDoc.head.querySelectorAll("script"),
      ...legacyDoc.body.querySelectorAll("script"),
    ];

    const appendScript = (scriptNode) =>
      new Promise((resolve, reject) => {
        if (cancelled) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        const src = scriptNode.getAttribute("src");
        const type = scriptNode.getAttribute("type");

        if (type) script.type = type;
        script.async = false;

        if (src) {
          if (src === "js/main.js") {
            script.textContent = legacyMainJs;
            document.body.appendChild(script);
            injectedScripts.push(script);
            resolve();
            return;
          }

          script.src = src;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
          injectedScripts.push(script);
          return;
        }

        script.textContent = scriptNode.textContent || "";
        document.body.appendChild(script);
        injectedScripts.push(script);
        resolve();
      });

    (async () => {
      for (const scriptNode of scriptNodes) {
        if (cancelled) break;
        try {
          // Keep original order so legacy dependencies (THREE/Chart) are ready first.
          await appendScript(scriptNode);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
          break;
        }
      }
    })();

    return () => {
      cancelled = true;
      injectedScripts.forEach((script) => script.remove());
      injectedHeadNodes.forEach((node) => node.remove());
      mount.innerHTML = "";
      document.title = previousTitle;
    };
  }, []);

  return <div ref={mountRef} />;
}

export default App;
