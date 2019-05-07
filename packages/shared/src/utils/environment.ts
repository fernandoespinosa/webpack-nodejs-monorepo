import dotenv from "dotenv";
import { resolve } from "path";

export const isServer = () => {
  return typeof window === "undefined";
};

export const isBrowser = () => {
  return !isServer();
};

export const initializeEnvVars = (rootPath: string) => {
  // Don't run on browser since this gets done on build time
  if (isBrowser()) {
    return;
  }

  dotenv.config({ path: resolve(rootPath, "./config/.env") });
  dotenv.config({ path: resolve(rootPath, "../../config/.env") });
  dotenv.config({ path: resolve(rootPath, "./config/.env.default") });
  dotenv.config({
    path: resolve(rootPath, "../../config/.env.default")
  });
};

/**
 * NOTE @RafaelVidaurre: We need to redundantly recieve the value here in the
 * front-end, because webpack requires an explicit mention of the variable
 * in order to inject it.
 */
export const envVar = (
  key: string,
  value?: string,
  optional: boolean = false
) => {
  const envVal = value || process.env[key];
  if (isBrowser()) {
    if (!value && !optional) {
      throw new Error(
        `Env var "${key}" not found. You need to explicitly pass the env var value on the front-end otherwise it will be omitted by the compiler`
      );
    }
  }

  if (!envVal && !optional) {
    throw new Error(
      `Env var "${key}" required but not found. Set this environment variable, or add it to an .env or .env.default file`
    );
  }

  return envVal || "";
};
