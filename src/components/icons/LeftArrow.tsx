export interface LeftArrowProps {
  onClickLeftArrow: () => void;
}

function LeftArrow({ onClickLeftArrow }: LeftArrowProps) {
  return (
    <svg
      className="arrow-icon left-arrow-icon"
      onClick={onClickLeftArrow}
      viewBox="0 0 100 100"
    >
      <g id="Layer_1" display="none">
        <g display="inline">
          <g fill="#999" strokeMiterlimit="10">
            <g stroke="#8aaeff">
              <path d="m12.5 12.5h75v75h-75z"></path>
              <path d="m50 12.5v75"></path>
              <path d="m12.5 50h75"></path>
              <path d="m87.5 12.5-75 75"></path>
              <path d="m12.5 12.5 75 75"></path>
              <path d="m12.5 31.25h75"></path>
              <path d="m12.5 68.75h75"></path>
              <path d="m68.75 12.5v75"></path>
              <path d="m31.25 12.5v75"></path>
            </g>
            <path d="m12.5 21.875h75" stroke="#a8a8a8"></path>
            <path d="m12.5 40.625h75" stroke="#a8a8a8"></path>
            <path d="m12.5 59.375h75" stroke="#a8a8a8"></path>
            <path d="m12.5 78.125h75" stroke="#a8a8a8"></path>
            <path d="m21.875 87.5v-75" stroke="#a8a8a8"></path>
            <path d="m40.625 87.5v-75" stroke="#a8a8a8"></path>
            <path d="m59.375 87.5v-75" stroke="#a8a8a8"></path>
            <path d="m78.125 87.5v-75" stroke="#a8a8a8"></path>
          </g>
        </g>
      </g>
      <g id="Layer_3" display="none">
        <text
          display="inline"
          fontFamily="'MyriadPro-Regular'"
          transform="translate(25.553 -1.851)"
        ></text>
      </g>
      <g id="Layer_2">
        <path d="m63.433 89.5c-2.339 0-4.537-.911-6.19-2.564l-30.746-30.746c-3.413-3.413-3.413-8.967 0-12.38l30.745-30.746c1.653-1.654 3.852-2.564 6.19-2.564s4.537.911 6.19 2.564l3.88 3.88c3.413 3.413 3.413 8.967 0 12.38l-20.674 20.676 20.675 20.675c3.413 3.413 3.413 8.967 0 12.38l-3.88 3.88c-1.653 1.654-3.852 2.565-6.19 2.565zm0-75c-1.271 0-2.464.495-3.362 1.393l-30.746 30.745c-1.854 1.854-1.854 4.87 0 6.724l30.745 30.745c.898.898 2.092 1.393 3.362 1.393s2.464-.495 3.362-1.393l3.88-3.88c1.854-1.854 1.854-4.87 0-6.724l-22.088-22.089c-.781-.781-.781-2.047 0-2.828l22.089-22.089c1.854-1.854 1.854-4.87 0-6.724l-3.88-3.88c-.899-.898-2.092-1.393-3.362-1.393z"></path>
      </g>
    </svg>
  );
}

export default LeftArrow;
