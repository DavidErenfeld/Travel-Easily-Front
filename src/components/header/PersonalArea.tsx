interface PersonalAreaProps {
  isUserConected: boolean;
  onClickSignIn: () => void;
  onClickSignUp: () => void;
  onClickSearchTrip: () => void;
  onClickMyTrips: () => void;
  onClickLogOut: () => void;
  onClickShareTrip: () => void;
}

function PersonalArea({
  isUserConected,
  onClickSignIn,
  onClickSignUp,
  onClickSearchTrip,
  onClickMyTrips,
  onClickLogOut,
  onClickShareTrip,
}: PersonalAreaProps) {
  return (
    <>
      <ul className="personal-area">
        {!isUserConected && <li onClick={onClickSignIn}>Sign in</li>}
        {!isUserConected && <li onClick={onClickSignUp}>Sign up</li>}
        {isUserConected && <li onClick={onClickMyTrips}>my trips</li>}
        {isUserConected && <li onClick={onClickShareTrip}>Share trip</li>}
        <li onClick={onClickSearchTrip}>Search trips</li>
        {isUserConected && <li onClick={onClickLogOut}>Log out</li>}
      </ul>
    </>
  );
}
export default PersonalArea;
