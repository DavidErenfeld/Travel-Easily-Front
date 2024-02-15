interface SuccessfulCompletionProps {
  onClickHomePage: () => void;
  title: string;
  secondaryTitle: string;
  text: string;
  buttonText: string;
}
function SuccessfulCompletion({
  title,
  secondaryTitle,
  text,
  onClickHomePage,
  buttonText,
}: SuccessfulCompletionProps) {
  return (
    <section className="successful-message">
      <button onClick={onClickHomePage} className="btn btn-homepage">
        {buttonText}
      </button>

      <h1>{title}</h1>
      <h2>{secondaryTitle}</h2>
      <p>{text}</p>
    </section>
  );
}

export default SuccessfulCompletion;
{
}
