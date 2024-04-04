import React, { useEffect, useState } from "react";

import i18n, { handleChangeLanguage } from "@/i18n";
import Select, { SelectItemProps } from "@/modules/common/components/Select";

type LanguageSelectorProps = {
  className?: string;
};

const languages: SelectItemProps[] = [
  {
    label: "🇬🇧",
    value: "en",
  },
  {
    label: "🇨🇿",
    value: "cs",
  },
];

const LanguageSelector = ({ className = "" }: LanguageSelectorProps) => {
  const [selected, setSelected] = useState<SelectItemProps>(languages[0]);

  const handleSelectedChange = (e: SelectItemProps) => {
    setSelected(e);
    handleChangeLanguage(e.value);
  };

  useEffect(() => {
    const language = languages.find((l) => l.value === i18n.language);
    if (language) setSelected(language);
  }, [i18n.language]);

  return (
    <Select
      className={className}
      items={languages}
      onSelectedChange={handleSelectedChange}
      defaultSelected={selected}
    />
  );
};

export default LanguageSelector;
