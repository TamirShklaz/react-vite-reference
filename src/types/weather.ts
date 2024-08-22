export interface WeatherResponse {
  data: Data;
  location: Location;
}

export interface Data {
  time: string;
  values: Values;
}

export interface Values {
  cloudBase: unknown;
  cloudCeiling: unknown;
  cloudCover: number;
  dewPoint: number;
  freezingRainIntensity: number;
  humidity: number;
  precipitationProbability: number;
  pressureSurfaceLevel: number;
  rainIntensity: number;
  sleetIntensity: number;
  snowIntensity: number;
  temperature: number;
  temperatureApparent: number;
  uvHealthConcern: number;
  uvIndex: number;
  visibility: number;
  weatherCode: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
}

export interface Location {
  lat: number;
  lon: number;
  name: string;
  type: string;
}

export interface ErrorResponse {
  code: number;
  type: string;
  message: string;
}

export function isWeatherResponse(data: any): data is WeatherResponse {
  return data && data.data && data.location;
}

export function isErrorResponse(data: any): data is ErrorResponse {
  return data && data.code;
}
