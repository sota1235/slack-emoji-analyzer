import { promises as fsPromises } from 'fs';
import { EmojiAdminListRes } from './typings/slack';
import { Formatter, FormatterTypes, getFormatter } from './formatter';

// node dist/bundle.js ${json_file_name} ${user_display_name} ${formatter_type}
export async function main() {
  const fileName = process.argv[2];
  const userDisplayName = process.argv[3];
  const format: FormatterTypes = (process.argv[4] as any) || 'json';

  const fp = await fsPromises.open(fileName, 'r');
  const json = await fp.readFile({ encoding: 'utf-8' });

  const res: EmojiAdminListRes = JSON.parse(json);
  const { emoji } = res;
  const emojiList = [];

  for (const emojiItem of emoji) {
    if (emojiItem.user_display_name === userDisplayName) {
      emojiList.push({
        name: emojiItem.name,
        url: emojiItem.url,
      });
    }
  }

  const formatter: Formatter = getFormatter(format);
  console.log(formatter(emojiList));
}

main().catch(err => {
  console.error(err);
});
