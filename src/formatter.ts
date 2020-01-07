export interface SimpleEmoji {
  name: string;
  url: string;
}

export interface Formatter {
  (emojiList: SimpleEmoji[]): string;
}

export type FormatterTypes = 'json' | 'md';

export const JSONFormatter: Formatter = emojiList => {
  return JSON.stringify(emojiList);
};

export const MarkdownFormatter: Formatter = emojiList => {
  let res = '';

  for (const emoji of emojiList) {
    res += `- \`${emoji.name}\`\n  - ![${emoji.name}](${emoji.url})\n`;
  }

  return res;
};

export const getFormatter = (type: FormatterTypes): Formatter => {
  switch (type) {
    case 'json': {
      return JSONFormatter;
    }
    case 'md': {
      return MarkdownFormatter;
    }
  }
};
