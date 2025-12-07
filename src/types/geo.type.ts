import type { Country } from "./country.type";
import type { City } from "./city.type";
import type { Hotel } from "./hotel.type";

export type GeoEntity =
  | (Country & { type: "country" })
  | (City & { type: "city" })
  | (Hotel & { type: "hotel" });

export type GeoResponse = Record<string, GeoEntity>;
