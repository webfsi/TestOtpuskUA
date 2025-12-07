export function getCountries(): Promise<Response>;
export function searchGeo(search: string): Promise<Response>;
export function startSearchPrices(countryID: string): Promise<Response>;
export function getSearchPrices(token: string): Promise<Response>;
export function stopSearchPrices(token: string): Promise<Response>;
export function getHotels(countryID: string): Promise<Response>;
export function getHotel(hotelID: number): Promise<Response>;
export function getPrice(priceID: string): Promise<Response>;

