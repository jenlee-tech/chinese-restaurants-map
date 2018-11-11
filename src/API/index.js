class Helper {
  static baseURL() {
    return "https://api.foursquare.com/v2";
  }
  static auth() {
    const keys = {
      //put key here
      //initial map from Google Map API, put keys below
      client_id: "TPH0HARWJI330EF4O0RJIYJR2V3WNWPA03BXBQPO3MWUCQF3",
      client_secret: "NRQQEB0M10YV10LZBC20OHFN2IV0NBB1FGKPGQCIENH4W5JG",
      query: "Chinese Restaurant",
      near: "Hartford",
      v: "20181106"
    };
    return Object.keys(keys)
      .map(key => `${key}=${keys[key]}`)
      .join("&");
  }

  static urlBuilder(urlParams) {
    if (!urlParams) {
      return "";
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`)
      .join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endpoint, method, urlParams) {
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(
      `${Helper.baseURL()}${endpoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
      )}`,
      requestData
    ).then(res => res.json());
  }
}

export default class SquareAPI {
  static search(urlParams) {
    return Helper.simpleFetch("/venues/search/", "GET", urlParams);
  }
  static getVenueDetails(VENUE_ID) {
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }
  static getVenuPhoto(VENUE_ID) {
    return Helper.simpleFetch(`/venues/VENUE_ID/photos`, "GET");
  }
}