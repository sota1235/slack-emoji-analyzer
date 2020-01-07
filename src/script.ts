import { promises as fsPromises } from 'fs';
import { EmojiAdminListRes } from './typings/slack';

export async function main() {
  const fileName = process.argv[2];
  const fp = await fsPromises.open(fileName, 'r');
  const json = await fp.readFile({ encoding: 'utf-8' });

  const res: EmojiAdminListRes = JSON.parse(json);

  console.log(res);
}

main()
  .then(() => {})
  .catch(err => {
    console.error(err);
  });
