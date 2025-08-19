/* "use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  return (
    <div className="google-translate-container">
      <div id="google_translate_element" />
    </div>
  );
}
 */

"use client";

import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // Ensure widget initializes after React rendering
    const timer = setTimeout(() => {
      if (
        window.__GOOGLE_TRANSLATION_CONFIG__ &&
        window.google?.translate?.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage,
            includedLanguages: window.__GOOGLE_TRANSLATION_CONFIG__.languages
              .map((lang) => lang.name)
              .join(","),
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE
          },
          "google_translate_element"
        );
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="google-translate-container">
      <div id="google_translate_element" />
    </div>
  );
}