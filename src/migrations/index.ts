/* eslint-disable no-await-in-loop */
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

const migrationDir = "./dist/migrations";

interface MigrationType {
  up: () => Promise<void>;
  down: () => Promise<void>;
}

const readDir = async () => {
  const directories = await fs.readdir(migrationDir, {
    withFileTypes: true,
  });
  return directories
    .filter((directory) => directory.isFile() && directory.name.endsWith(".js") && !directory.name.startsWith("index"))
    .map((file) => {
      const [index] = file.name.split("-");
      return {
        index: parseInt(index, 10),
        fileName: file.name,
      };
    })
    .sort((a, b) => a.index - b.index)
    .map((file) => file.fileName);
};

const processAllMigrations = async () => {
  try {
    const files = await readDir();
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const migration: MigrationType = await import(`./${file}`);
      await migration.up();
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  }
};

// export default processAllMigrations;
processAllMigrations();
