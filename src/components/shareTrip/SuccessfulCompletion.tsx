interface SuccessfulCompletionProps {
  onClickHomePage: () => void;
}
function SuccessfulCompletion({ onClickHomePage }: SuccessfulCompletionProps) {
  return (
    <section className="successful-message">
      <button onClick={onClickHomePage} className="btn btn-homepage">
        home page
      </button>

      <h1>Congratulations</h1>
      <h2>Your trip will help users to travel easily!</h2>
      <p>
        Thank you for sharing your travel experience with our community. Your
        insight is invaluable and helps others to enjoy their journeys even
        more. Keep exploring and sharing!
      </p>
    </section>
  );
}

export default SuccessfulCompletion;
