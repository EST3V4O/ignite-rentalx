import fs from "fs/promises";

export const deleteFile = async (filename: string) => {
  try {
    await fs.stat(filename);
  } catch {
    // eslint-disable-next-line no-useless-return
    return;
  }
  await fs.unlink(filename);
};
