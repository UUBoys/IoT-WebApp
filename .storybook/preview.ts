import type { Preview } from "@storybook/react";
import "../src/modules/common/styles/globals.css";
import i18n from "../src/i18n";

const preview: Preview = {
  parameters: {
    i18n,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globals: {
    locale: "en",
    locales: {
      en: "English",
      cs: "Čeština",
    },
  },
};

export default preview;
