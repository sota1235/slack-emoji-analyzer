import { promises as fsPromises } from 'fs';
import { EmojiAdminListRes } from './typings/slack';

// node dist/bundle.js ${json_file_name} ${user_display_name}
export async function main() {
  const fileName = process.argv[2];
  const userDisplayName = process.argv[3];

  const fp = await fsPromises.open(fileName, 'r');
  const json = await fp.readFile({ encoding: 'utf-8' });

  const res: EmojiAdminListRes = JSON.parse(json);
  const { emoji } = res;
  const emojiList = [];

  for (const emojiItem of emoji) {
    if (emojiItem.user_display_name === userDisplayName) {
      emojiList.push({
        name: emojiItem.name,
        imageURL: emojiItem.url,
      });
    }
  }

  console.log(emojiList);
  console.log(`Count: ${emojiList.length}`);
}

main()
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
