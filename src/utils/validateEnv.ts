import { cleanEnv, str, port } from "envalid";

export default function validateEnv(): void {
  cleanEnv(process.env, {
    NODE_ENV: str({
      choices: ["development", "production"],
    }),
    DB_HOST: str(),
    DB_NAME: str(),
    DB_USERNAME: str(),
    DB_PASSWORD: str(),
    PORT: port({ default: 5000 }),
  });
}
