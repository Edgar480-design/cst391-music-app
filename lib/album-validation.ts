type JsonObject = Record<string, unknown>;

function isObject(value: unknown): value is JsonObject {
  return value !== null &&
    typeof value === "object" &&
    !Array.isArray(value);
}

function isRequiredText(value: unknown, maxLength: number): boolean {
  return typeof value === "string" &&
    value.trim().length > 0 &&
    value.length <= maxLength;
}

function isOptionalText(value: unknown, maxLength: number): boolean {
  return value === undefined ||
    value === null ||
    (typeof value === "string" && value.length <= maxLength);
}

function isPositiveInteger(value: unknown): boolean {
  return typeof value === "number" &&
    Number.isSafeInteger(value) &&
    value > 0;
}

export function validateAlbumWrite(
  value: unknown,
  operation: "POST" | "PUT"
): string | null {
  if (!isObject(value)) {
    return "Request body must be a JSON object";
  }

  if (operation === "PUT" && !isPositiveInteger(value.albumId)) {
    return "albumId must be a positive integer";
  }

  if (!isRequiredText(value.title, 100)) {
    return "title must be a non-empty string of at most 100 characters";
  }

  if (!isRequiredText(value.artist, 100)) {
    return "artist must be a non-empty string of at most 100 characters";
  }

  if (!isPositiveInteger(value.year) || Number(value.year) > 9999) {
    return "year must be a positive integer not exceeding 9999";
  }

  if (!isOptionalText(value.description, 500)) {
    return "description must be a string of at most 500 characters";
  }

  if (!isOptionalText(value.image, 300)) {
    return "image must be a string of at most 300 characters";
  }

  if (value.tracks !== undefined && !Array.isArray(value.tracks)) {
    return "tracks must be an array";
  }

  if (Array.isArray(value.tracks)) {
    for (const [index, track] of value.tracks.entries()) {
      if (!isObject(track)) {
        return `tracks[${index}] must be an object`;
      }

      if (operation === "PUT" && !isPositiveInteger(track.id)) {
        return `tracks[${index}].id must be a positive integer`;
      }

      if (!isRequiredText(track.title, 100)) {
        return `tracks[${index}].title is invalid`;
      }

      if (!isPositiveInteger(track.number)) {
        return `tracks[${index}].number must be a positive integer`;
      }

      if (!isOptionalText(track.lyrics, 1000)) {
        return `tracks[${index}].lyrics is invalid`;
      }

      if (!isOptionalText(track.video, 250)) {
        return `tracks[${index}].video is invalid`;
      }
    }
  }

  return null;
}
