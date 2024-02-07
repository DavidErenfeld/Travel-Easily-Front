interface NavigationProps {
  isUserConected: boolean;
  onClickSignIn: () => void;
  onClickSignUp: () => void;
  onClickSearchTrip: () => void;
  onClickMyTrips: () => void;
  onClickLogOut: () => void;
  onClickShareTrip: () => void;
  onClickPersonalArea: () => void;
}

function Navigation({
  isUserConected,
  onClickSignIn,
  onClickSignUp,
  onClickSearchTrip,
  onClickMyTrips,
  onClickLogOut,
  onClickShareTrip,
  onClickPersonalArea,
}: NavigationProps) {
  return (
    <>
      <ul className="navigation">
        {isUserConected && <li onClick={onClickPersonalArea}>Personal Area</li>}
        {!isUserConected && <li onClick={onClickSignIn}>Sign in</li>}
        {!isUserConected && <li onClick={onClickSignUp}>Sign up</li>}
        {isUserConected && <li onClick={onClickMyTrips}>My trips</li>}
        {isUserConected && <li onClick={onClickShareTrip}>Share trip</li>}
        <li onClick={onClickSearchTrip}>Search trips</li>
        {isUserConected && <li onClick={onClickLogOut}>Log out</li>}
      </ul>
    </>
  );
}
export default Navigation;
