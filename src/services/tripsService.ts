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
  tripPhotos?: string[];

  comments?: Array<{
    _id?: string;
    ownerId?: string;
    owner?: string;
    comment: string;
    date: Date;
  }>;

  likes?: Array<{
    owner: string;
    date: Date;
  }>;
}

export interface IUpdateTrips {
  _id?: string;
  owner?: string;
  typeTraveler?: string;
  country?: string;
  typeTrip?: string;
  numOfDays?: number;
  tripDescription?: string[];
}

// export interface IComment {
//   comments?: {
//     ownerId?: string;
//     owner?: string;
//     comment: string;
//     date: Date;
//   };
// }

const getAllTrips = () => {
  const abortController = new AbortController();
  const req = apiClient.get<ITrips[]>("trips", {
    signal: abortController.signal,
  });
  return { req, abort: () => abortController.abort() };
};

const getByOwnerId = (userId: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise((resolve, reject) => {
    console.log("Get By Id...");
    apiClient
      .get(`/trips/${userId}`, {
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

const getByTripId = (tripId: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("Get By Id...");
    apiClient
      .get(`/trips/trip/${tripId}`, {
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

const updateTrip = (trip: IUpdateTrips) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("Update Trip...");
    apiClient
      .put(`/trips/${trip._id}`, trip, {
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

const deleteTrip = (tripId: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<void>((resolve, reject) => {
    console.log("Delete Trip...");
    apiClient
      .delete(`/trips/${tripId}`, {
        headers: {
          Authorization: `jwt ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        resolve();
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const logout = () => {
  const refreshToken = localStorage.getItem("refreshToken"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("log out...");
    apiClient
      .post(
        `/auth/logout`,
        {},
        {
          headers: {
            Authorization: `jwt ${refreshToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const addComment = (trip_id: string, comment: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<ITrips>((resolve, reject) => {
    console.log("Add Comment...");
    apiClient
      .post(
        `/trips/comments/${trip_id}`,
        { owner: "david", comment: comment, date: new Date() },
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

const deleteComment = (tripId: string, commentId: string) => {
  const accessToken = localStorage.getItem("token"); // או לקבל את הטוקן כפרמטר אם אתה מעדיף

  return new Promise<void>((resolve, reject) => {
    console.log("Delete Comment...");
    apiClient
      .delete(`/trips/comments/${tripId}/${commentId}`, {
        headers: {
          Authorization: `jwt ${accessToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        resolve();
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
export default {
  getAllTrips,
  getByOwnerId,
  getByTripId,
  postTrip,
  updateTrip,
  addLike,
  deleteTrip,
  logout,
  addComment,
  deleteComment,
};
