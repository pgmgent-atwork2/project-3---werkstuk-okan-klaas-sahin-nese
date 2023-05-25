import { PUBLIC_PATH, BASE_URL } from '../constants.js';
import path from 'path';
import fs from 'fs';


export const getAvatars = () => {
    // get the avatars path
    const avatarsPath = path.join(PUBLIC_PATH, 'assets/imgAvatar');

    // lees alle files in de map avatarPath en sla ze in avatarFiles op
    const avatarFiles = fs
      .readdirSync(avatarsPath)
      // Voor elk bestand, maak een nieuw bestandsnaam en de laatste wijzigingsdatum
      .map((fileName) => ({
        fileName,
        updatedAt: fs.statSync(path.join(avatarsPath, fileName)).mtime,
      }))
      // Sorteer de array op basis van de laatste wijzigingsdatum
      .sort((a, b) => b.updatedAt - a.updatedAt)
      // nieuw array
      .map((file) => file.fileName);
  
    const avatars = avatarFiles.map((avatar) => ({
      // maak een nieuw object met de eigenschappen `fileName` en `url`
      fileName: avatar,
      url: `${BASE_URL}/assets/imgAvatar/${avatar}`,
    }));

    return avatars;
}