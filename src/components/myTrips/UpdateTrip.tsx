import { useEffect, useRef, useState } from "react";
import Header from "../header/Header";
import tripsService, {
  ITrips,
  IUpdateTrips,
} from "../../services/tripsService";
import TripBox from "../searchTrip/TripBox";
import Description from "../shareTrip/Description";
import RightArrow from "../icons/RightArrow";

interface UpdateTripProps {
  tripId: string;
  isUserConnected: boolean;
  imgUrl: string;
  userName: string;
  goToMainPage: () => void;
  goToPersonalArea: () => void;
  goToShare: () => void;
  goToRegister: () => void;
  goToLogin: () => void;
  goToSearch: () => void;
  goToMyTrips: () => void;
  endaleLogOut: () => void;
}
function UpdateTrip({
  tripId,
  userName,
  imgUrl,
  isUserConnected,
  goToShare,
  goToSearch,
  goToLogin,
  goToMyTrips,
  goToRegister,
  endaleLogOut,
  goToPersonalArea,
}: UpdateTripProps) {
  const [countries, setCountries] = useState<string[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const suggestionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [typeTravelers, setTypeTravelers] = useState("");
  const [typeTrip, setTypeTrip] = useState("");
  const [numOfDays, setNumOfDays] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isDaysChosen, setIsDaysChosen] = useState(false);
  const [updateDescription, setUpdateDescription] = useState(false);
  const [num, setNum] = useState(1);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const names = data.map((country: any) => country.name.common);
        setCountries(names);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  useEffect(() => {
    const filtered = selectedCountry
      ? countries.filter((country) =>
          country.toLowerCase().startsWith(selectedCountry.toLowerCase())
        )
      : [];
    setSuggestions(filtered);
    setSelectedSuggestionIndex(-1);
  }, [selectedCountry, countries]);

  useEffect(() => {
    if (suggestionRefs.current[selectedSuggestionIndex]) {
      suggestionRefs.current[selectedSuggestionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedSuggestionIndex]);

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setSuggestions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const suggestionsCount = suggestions.length;
    if (e.key === "ArrowDown" && suggestionsCount > 0) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex < suggestionsCount - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestionsCount > 0) {
      e.preventDefault();
      setSelectedSuggestionIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === "Enter" && selectedSuggestionIndex > -1) {
      selectCountry(suggestions[selectedSuggestionIndex]);
    }
  };
  ///////////////////////////////////////////////////////////////////////////
  const [trips, setTrips] = useState<ITrips[]>([]);

  useEffect(() => {
    tripsService
      .getByTripId(tripId)
      .then((data) => {
        console.log(data);
        setTrips(data as ITrips[]);
      })
      .catch((err) => {
        console.error("", err);
      });
  }, []);
  const updateTripCommentsCount = (
    tripId: string,
    newNumOfComments: number
  ) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === tripId
          ? { ...trip, numOfComments: newNumOfComments }
          : trip
      )
    );
  };

  const send = async () => {
    try {
      const updatedTrip = await tripsService.updateTrip({
        _id: tripId,
        typeTraveler: typeTravelers || trips[0].typeTraveler,
        typeTrip: typeTrip || trips[0].typeTrip,
        country: selectedCountry || trips[0].country,
        numOfDays: numOfDays || trips[0].numOfDays,
        tripDescription: tripDescriptions || trips[0].tripDescription,
      });
      setUpdateDescription(false);
      setIsDaysChosen(false);
      // עדכון המצב של הטיולים עם הטיול המעודכן
      setTrips((prevTrips) =>
        prevTrips.map((trip) => (trip._id === tripId ? updatedTrip : trip))
      );

      console.log("Trip updated successfully", updatedTrip);
    } catch (error) {
      console.error("Failed to update trip:", error);
    }
  };

  const onClickRightArrow = () => {
    setIsDaysChosen(false);
    setUpdateDescription(false);
  };

  const [tripDescriptions, setTripDescriptions] = useState(
    Array(numOfDays).fill("")
  );

  // פונקציה לעדכון תיאור ליום נוכחי
  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newDescriptions = [...tripDescriptions];
    newDescriptions[num - 1] = e.target.value; // num - 1 מכיוון שהמערך מתחיל מ-0
    setTripDescriptions(newDescriptions);
  };

  const handle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDescriptions = [...tripDescriptions];
    newDescriptions[num - 1] = e.target.value; // num - 1 מכיוון שהמערך מתחיל מ-0
    setTripDescriptions(newDescriptions);
  };

  return (
    <>
      <Header
        userName={userName}
        imgUrl={imgUrl}
        endaleLogOut={endaleLogOut}
        goToPersonalArea={goToPersonalArea}
        goToShare={goToShare}
        goToRegister={goToRegister}
        goToLogin={goToLogin}
        goToMyTrips={goToMyTrips}
        goToSearch={goToSearch}
        isUserConnected={isUserConnected}
      />
      <section className="update-trip-section">
        {!updateDescription && !isDaysChosen ? (
          <div className="update-trip-details">
            {trips.map((trip) => (
              <div className="trip-list-item" key={trip._id}>
                <TripBox
                  key={trip._id}
                  trip={trip}
                  updateTripCommentsCount={updateTripCommentsCount}
                  isUserConnected={isUserConnected}
                  onCommentsSelect={() => console.log("onCommentsSelect")}
                  onSelect={() => console.log("onSelect")}
                />
              </div>
            ))}
          </div>
        ) : !isDaysChosen ? (
          <div className="update-trip-details">
            <div className="right-arrow-icon">
              <RightArrow onClickRightArrow={onClickRightArrow} />
            </div>
            <textarea
              className="update-description-box"
              id="countrySearch"
              onChange={handleDescriptionChange}
              placeholder={
                !updateDescription
                  ? `Share with us what you did on day ${num}`
                  : trips[0].tripDescription[num - 1]
              }
            ></textarea>
            <div className="buttons-days">
              <button
                onClick={() => {
                  if (num < trips[0].numOfDays) setNum(num + 1);
                }}
                className="update-next-day"
              >
                next day
              </button>
              <button
                onClick={() => {
                  if (num > 1) setNum(num - 1);
                }}
                className="update-next-day"
              >
                day before
              </button>
            </div>
          </div>
        ) : (
          <div className="update-trip-details">
            <div className="right-arrow-icon">
              <RightArrow onClickRightArrow={onClickRightArrow} />
            </div>
            <textarea
              className="update-description-box"
              id="countrySearch"
              onChange={handleDescriptionChange}
              placeholder={`Share with us what you did on day ${num}`}
            ></textarea>
            <div className="buttons-days">
              <button
                onClick={() => {
                  if (num < numOfDays) setNum(num + 1);
                }}
                className="update-next-day"
              >
                next day
              </button>
              <button
                onClick={() => {
                  if (num > 1) setNum(num - 1);
                }}
                className="update-next-day"
              >
                day before
              </button>
            </div>
          </div>
        )}

        <ul className="update-buttons">
          <select
            className="options"
            value={typeTravelers}
            onChange={(e) => setTypeTravelers(e.target.value)}
          >
            <option value="">type travelers</option>
            <option value="solo">romantic couple</option>
            <option value="couple">happy family</option>
            <option value="family">friends</option>
            <option value="friends">seniors</option>
            <option value="friends">single</option>
            <option value="friends">groups</option>
          </select>
          <select
            value={typeTrip}
            onChange={(e) => setTypeTrip(e.target.value)}
            className="options"
          >
            <option value="">type trip</option>
            <option value="solo">attractions</option>
            <option value="couple">romantic</option>
            <option value="family">nature</option>
            <option value="friends">parties</option>
            <option value="friends">food</option>
            <option value="friends">integrated</option>
          </select>

          <li
            onClick={() => {
              setUpdateDescription(true);
            }}
            className="options"
          >
            update description
          </li>
          <input
            className="options"
            placeholder="num of days"
            type="number"
            min="0"
            value={numOfDays}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) {
                setNumOfDays(value);
                setIsDaysChosen(true);
              } else {
                setIsDaysChosen(false);
              }
            }}
          ></input>

          <input
            className="options"
            type="text"
            id="countrySearch"
            placeholder="In which country did you travel?"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <div className="country-list">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                ref={(el) => (suggestionRefs.current[index] = el)}
                className={index === selectedSuggestionIndex ? "selected" : ""}
                onClick={() => selectCountry(suggestion)}
                onMouseOver={() => setSelectedSuggestionIndex(index)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </ul>
        <button className="update-save-btn" onClick={send}>
          save
        </button>
      </section>
    </>
  );
}
export default UpdateTrip;
