export interface RightArrowProps {
  onClickRightArrow: () => void;
}

function RightArrow({ onClickRightArrow }: RightArrowProps) {
  return (
    <svg
      id="fi_4671220"
      viewBox="0 0 512 512"
      className="arrow-icon right-rrow-icon"
      onClick={onClickRightArrow}
    >
      <g id="Layer_1" display="none">
        <g display="inline">
          <g fill="none" strokeMiterlimit="51.2" strokeWidth="5.12">
            <g stroke="#8aaeff">
              <path d="m64 64h384v384h-384z"></path>
              <path d="m256 64v384"></path>
              <path d="m64 256h384"></path>
              <path d="m448 64-384 384"></path>
              <path d="m64 64 384 384"></path>
              <path d="m64 160h384"></path>
              <path d="m64 352h384"></path>
              <path d="m352 64v384"></path>
              <path d="m160 64v384"></path>
            </g>
            <path d="m64 112h384" stroke="#a8a8a8"></path>
            <path d="m64 208h384" stroke="#a8a8a8"></path>
            <path d="m64 304h384" stroke="#a8a8a8"></path>
            <path d="m64 400h384" stroke="#a8a8a8"></path>
            <path d="m112 448v-384" stroke="#a8a8a8"></path>
            <path d="m208 448v-384" stroke="#a8a8a8"></path>
            <path d="m304 448v-384" stroke="#a8a8a8"></path>
            <path d="m400 448v-384" stroke="#a8a8a8"></path>
          </g>
        </g>
      </g>
      <g id="Layer_3" display="none">
        <text display="inline" transform="translate(177.895)">
          arrowhead right
        </text>
      </g>
      <g id="Layer_2">
        <path d="m187.2 458.2c-12 0-23.2-4.7-31.7-13.1l-19.9-19.9c-17.5-17.5-17.5-45.9 0-63.4l105.9-105.8-105.8-105.9c-17.5-17.5-17.5-45.9 0-63.4l19.9-19.9c8.5-8.5 19.7-13.1 31.7-13.1s23.2 4.7 31.7 13.1l157.4 157.4c17.5 17.5 17.5 45.9 0 63.4l-157.5 157.5c-8.4 8.5-19.7 13.1-31.7 13.1zm0-384c-6.5 0-12.6 2.5-17.2 7.1l-19.9 19.9c-9.5 9.5-9.5 24.9 0 34.4l113.1 113.1c4 4 4 10.5 0 14.5l-113.1 113.1c-9.5 9.5-9.5 24.9 0 34.4l19.9 19.9c4.6 4.6 10.7 7.1 17.2 7.1s12.6-2.5 17.2-7.1l157.4-157.4c9.5-9.5 9.5-24.9 0-34.4l-157.4-157.4c-4.6-4.6-10.7-7.2-17.2-7.2z"></path>
      </g>
    </svg>
  );
}

export default RightArrow;
