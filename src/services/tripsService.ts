import apiClient, { CanceledError } from "./apiClient";

export { CanceledError };
export interface ITrips {
  _id?: string;
  userName?: string;
  owner?: string;
  imgUrl?: string;
  typeTraveler: string;
  country: string;
  typeTrip: string;
  numOfDays: number;
  tripDescription: string[];
  numOfComments: number;
  numOfLikes: number;

  comments?: Array<{
    owner: string;
    comment: string;
    date: Date;
  }>;

  likes?: Array<{
    owner: string;
    date: Date;
  }>;
}

const getAllTrips = () => {
  const abortController = new AbortController();
  const req = apiClient.get<ITrips[]>("trips", {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

const postTrip = (trip: ITrips) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("Post...");
    console.log(trip);
    console.log(accessToken);
    apiClient
      .post("/trips", trip, {
        headers: {
          Authorization: `jwt ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const addLike = (trip: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("addLick...");
    apiClient
      .post(
        `/trips/likes/${trip}`,
        { owner: "david" },
        {
          headers: {
            Authorization: `jwt ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};
export default { getAllTrips, addLike, postTrip };
