/* eslint ecmaVersion: 6 */
/* global require */
'use strict';

require(
  [ "vendor/jed/jed",
    "vendor/jed-gettext-parser/jedGettextParser",
    "url_params" ],
  (Jed, jedGettextParser, urlParams) => {

    const initI18n = (lang) => {
      if (lang === "en_US") {
        return Promise.resolve({
          i18n: new Jed({}),
          lang: lang
        });
      }

      return fetch(`/i18n/${lang}.mo`)
        .then((res) => res.arrayBuffer())
        .then((buf) => jedGettextParser.mo.parse(buf))
        .then((localeData) => new Jed({
          "locale_data": localeData,
          "domain": "messages"
        }))
        .catch(() => new Jed({}))
        .then((i18n) => {
          return { i18n, lang };
        });
    };

    const initDOM = ({ i18n, lang }) => {
      const elLangLabel   = document.getElementById("langLabel");
      const elLang        = document.getElementById("lang");
      const elChangeLang  = document.getElementById("changeLang");
      const elCount       = document.getElementById("count");
      const elText        = document.getElementById("text");

      elLangLabel.innerText = i18n.gettext("Language:");
      elLang.value = lang;

      elChangeLang.value = i18n.pgettext("button", "Change");

      const updateTextFromCount = () => {
        const count = +elCount.value;

        const text = i18n.sprintf(
          i18n.ngettext(
            "You have selected %d object.",
            "You have selected %d objects.",
            count
          ),
          count
        );

        elText.innerText = text;
      };

      elCount.addEventListener("change", updateTextFromCount);
      updateTextFromCount();
    };

    const params = urlParams(window.location.search);
    const lang = params.hasOwnProperty("lang") ? params.lang : "en_US";
    initI18n(lang).then(initDOM);
  }
);
