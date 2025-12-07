export type Hotel = {
  id: number;
  name: string;
  img: string;
  cityId: number;
  cityName: string;
  countryId: string;
  countryName: string;
};

export type HotelServices = Record<string, string>;

export interface HotelDetail extends Hotel {
  description: string;
  services: HotelServices;
  countryFlag?: string;
}
