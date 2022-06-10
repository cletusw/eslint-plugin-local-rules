import path from "node:path";
import { describe, it, expect } from "vitest";
import { fileURLToPath } from "node:url";

import { requireUp } from "./requireUp";

const rootDirectory = path.dirname(fileURLToPath(import.meta.url));
const extensions = ["", ".cjs"];

describe("requireUp", () => {
  it("should find the file", () => {
    const file = requireUp(
      "eslint-local-rules",
      extensions,
      path.join(rootDirectory, "./fixtures/projectWithResolution/a")
    );
    expect(file).toBeDefined();
  });

  it("should fail to find a file that does not exist", () => {
    const file = requireUp(
      "some-file-that-will-not-resolve",
      extensions,
      path.join(rootDirectory, "./fixtures/projectWithNoResolution/a")
    );
    expect(file).not.toBeDefined();
  });

  it("should throw MODULE_NOT_FOUND errors for modules other than the target", () => {
    expect(() => {
      requireUp(
        "eslint-local-rules",
        extensions,
        path.join(rootDirectory, "./fixtures/projectWithBadImport/a")
      );
    }).toThrowError(`Cannot find module './does-not-exist'`);
  });
});
