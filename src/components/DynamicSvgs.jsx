import PropTypes from "prop-types";

export default function HomeSvg(props) {
  const { color } = props;
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill=""
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.24505 15.0257V12.5722C5.24504 11.9505 5.74395 11.4453 6.36192 11.4414H8.63101C9.25174 11.4414 9.75495 11.9477 9.75495 12.5722V15.0186C9.75493 15.5578 10.1874 15.996 10.7234 16H12.2714C12.9945 16.0018 13.6885 15.7142 14.2004 15.2005C14.7123 14.6869 15 13.9894 15 13.262V6.29267C15 5.7051 14.7411 5.14776 14.2931 4.77079L9.03393 0.539414C8.11462 -0.200702 6.80161 -0.176793 5.90952 0.596306L0.763431 4.77079C0.294269 5.13665 0.0138571 5.69564 0 6.29267V13.2549C0 14.7709 1.22162 16 2.72856 16H4.24128C4.49935 16.0018 4.74749 15.9 4.93064 15.7171C5.11378 15.5342 5.21678 15.2853 5.21678 15.0257H5.24505Z"
        fill={color}
      />
    </svg>
  );
}
HomeSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function ListingsSvg(props) {
  const { color } = props;
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill=""
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5417 0H1.45833C0.652932 0 0 0.652896 0 1.45833V12.5417C0 13.3471 0.652932 14 1.45833 14H12.5417C13.3471 14 14 13.3471 14 12.5417V1.45833C14 0.652896 13.3471 0 12.5417 0ZM8.75 11.0833H2.91667V9.33333H8.75V11.0833ZM11.0833 7.875H2.91667V6.125H11.0833V7.875ZM11.0833 4.66667H2.91667V2.91667H11.0833V4.66667Z"
        fill={color}
      />
    </svg>
  );
}
ListingsSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function HostSvg(props) {
  const { color } = props;
  return (
    <svg
      width="13"
      height="16"
      viewBox="0 0 13 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.33614 0.477539C7.52979 0.477539 7.67874 0.635508 7.67874 0.823567V3.24576C7.67874 4.62235 8.80337 5.7507 10.1663 5.75822C10.7324 5.75822 11.1792 5.76574 11.5218 5.76574C11.7527 5.76574 12.1326 5.75822 12.4528 5.75822C12.639 5.75822 12.788 5.90867 12.788 6.09673V12.1447C12.788 14.0102 11.291 15.5222 9.43644 15.5222H3.51539C1.57895 15.5222 0 13.935 0 11.9792V3.87011C0 2.00457 1.50447 0.477539 3.35898 0.477539H7.33614ZM6.2562 6.3224C5.95084 6.3224 5.69761 6.57063 5.69761 6.87905V8.18041H4.41658C4.11122 8.18041 3.85799 8.42865 3.85799 8.74459C3.85799 9.05301 4.11122 9.30124 4.41658 9.30124H5.69761V10.6026C5.69761 10.911 5.95084 11.1593 6.2562 11.1593C6.56156 11.1593 6.80734 10.911 6.80734 10.6026V9.30124H8.09582C8.40119 9.30124 8.65441 9.05301 8.65441 8.74459C8.65441 8.42865 8.40119 8.18041 8.09582 8.18041H6.80734V6.87905C6.80734 6.57063 6.56156 6.3224 6.2562 6.3224ZM8.76323 1.15921C8.76323 0.835001 9.15275 0.674023 9.37544 0.907967C10.1806 1.75348 11.5875 3.23162 12.374 4.05757C12.5914 4.2855 12.432 4.66387 12.1185 4.66462C11.5063 4.66688 10.7846 4.66462 10.2655 4.65936C9.44173 4.65936 8.76323 3.97407 8.76323 3.1421V1.15921Z"
        fill={color}
      />
    </svg>
  );
}
HostSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function DashboardSvg(props) {
  const { color } = props;
  return (
    <svg
      width="14"
      height="16"
      viewBox="0 0 14 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.7317 0.5C1.351 0.5 0.00699997 1.94675 0 4.4975V11.5025C0 14.0525 1.351 15.5 3.7317 15.5H10.269C12.6497 15.5 14 14.0525 14 11.5025V4.4975C14 1.94675 12.6497 0.5 10.269 0.5H3.7317ZM6.65 3.5975C6.8467 3.47 7.0847 3.47 7.273 3.5975C7.4627 3.72425 7.567 3.9575 7.5467 4.19V11.8325C7.511 12.155 7.2597 12.395 6.9657 12.395C6.664 12.395 6.4127 12.155 6.3847 11.8325V4.19C6.3567 3.9575 6.461 3.72425 6.65 3.5975ZM9.919 6.0575C10.108 5.93 10.3467 5.93 10.535 6.0575C10.7247 6.185 10.829 6.41675 10.808 6.65V11.8325C10.7807 12.155 10.5287 12.395 10.2277 12.395C9.926 12.395 9.6747 12.155 9.6467 11.8325V6.65C9.625 6.41675 9.7307 6.185 9.919 6.0575ZM3.4377 8.78C3.626 8.6525 3.864 8.6525 4.06 8.78C4.2497 8.9075 4.354 9.13175 4.326 9.3725V11.8325C4.298 12.155 4.0467 12.395 3.745 12.395C3.451 12.395 3.1997 12.155 3.164 11.8325V9.3725C3.1437 9.13175 3.248 8.9075 3.4377 8.78Z"
        fill={color}
      />
    </svg>
  );
}
DashboardSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function AccountSettingsSvg(props) {
  const { color } = props;
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M46.3077 78.4616C46.3077 70.6568 48.6356 63.0273 52.9971 56.5379C57.3585 50.0485 63.5576 44.9906 70.8104 42.0038C78.0632 39.0171 86.044 38.2356 93.7436 39.7583C101.443 41.2809 108.516 45.0392 114.067 50.558C119.618 56.0768 123.398 63.1082 124.93 70.763C126.461 78.4178 125.675 86.3522 122.671 93.5628C119.667 100.773 114.579 106.937 108.052 111.273C101.524 115.609 93.8504 117.923 86 117.923C75.4729 117.923 65.3771 113.766 57.9333 106.365C50.4895 98.9646 46.3077 88.9274 46.3077 78.4616ZM152.154 210H19.8462C14.5826 210 9.53468 207.921 5.8128 204.221C2.09093 200.521 0 195.502 0 190.269C0 174.57 6.27278 159.515 17.4384 148.414C28.604 137.313 43.7479 131.077 59.5385 131.077H112.462C128.252 131.077 143.396 137.313 154.562 148.414C165.727 159.515 172 174.57 172 190.269C172 195.502 169.909 200.521 166.187 204.221C162.465 207.921 157.417 210 152.154 210Z"
        fill={color}
      />
      <path
        d="M124.114 27.3371C125.843 22.0295 128.693 17.1576 132.452 13.0287C133.088 12.3305 134.085 12.0816 134.978 12.3985L143.962 15.5859C146.398 16.4495 149.078 15.1905 149.949 12.7736C150.034 12.536 150.1 12.2918 150.146 12.044L151.858 2.72193C152.028 1.79508 152.745 1.06192 153.674 0.865734C156.391 0.291871 159.177 0 162 0C164.821 0 167.605 0.291541 170.321 0.86468C171.25 1.06067 171.967 1.79337 172.138 2.71989L173.854 12.0436C174.318 14.5684 176.757 16.2419 179.302 15.7815C179.552 15.7362 179.798 15.6708 180.037 15.586L189.022 12.3985C189.915 12.0816 190.912 12.3305 191.548 13.0287C195.307 17.1576 198.156 22.0295 199.887 27.3371C200.178 28.2324 199.896 29.2141 199.173 29.8231L191.891 35.9577C189.92 37.6189 189.679 40.5515 191.353 42.5078C191.517 42.7002 191.698 42.8789 191.891 43.0422L199.173 49.1768C199.896 49.7858 200.178 50.7675 199.887 51.6629C198.156 56.9707 195.307 61.8427 191.548 65.9712C190.912 66.6692 189.915 66.9182 189.022 66.6014L180.037 63.414C177.602 62.5507 174.922 63.8098 174.051 66.226C173.966 66.4638 173.9 66.7081 173.854 66.957L172.138 76.2802C171.967 77.2068 171.25 77.9391 170.321 78.1353C167.605 78.7083 164.821 79 162 79C159.177 79 156.391 78.7083 153.674 78.134C152.745 77.9378 152.028 77.2048 151.858 76.2782L150.146 66.9564C149.682 64.4315 147.243 62.7581 144.698 63.2184C144.448 63.2639 144.202 63.3291 143.963 63.414L134.978 66.6014C134.085 66.9182 133.088 66.6692 132.452 65.9712C128.693 61.8427 125.843 56.9707 124.114 51.6629C123.822 50.7675 124.103 49.7858 124.826 49.1768L132.108 43.0423C134.08 41.3811 134.321 38.4485 132.647 36.4921C132.482 36.2997 132.302 36.121 132.108 35.9577L124.826 29.8231C124.103 29.2141 123.822 28.2324 124.114 27.3371ZM150.434 39.4996C150.434 45.8645 155.612 51.0243 161.999 51.0243C168.386 51.0243 173.564 45.8645 173.564 39.4996C173.564 33.1347 168.386 27.9749 161.999 27.9749C155.612 27.9749 150.434 33.1347 150.434 39.4996Z"
        fill={color}
      />
    </svg>
  );
}
AccountSettingsSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function HelpSvg(props) {
  const { color } = props;
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 187 187"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M93.5 0C41.8663 0 0 41.8663 0 93.5C0 145.134 41.8663 187 93.5 187C145.134 187 187 145.134 187 93.5C187 41.8663 145.134 0 93.5 0ZM101.932 136.368C101.723 143.798 96.2132 148.39 89.0754 148.181C82.2299 147.972 76.8453 143.088 77.054 135.617C77.2627 128.187 82.9395 123.47 89.785 123.679C96.9645 123.887 102.182 128.938 101.932 136.368ZM122.26 83.2317C120.506 85.6944 116.583 88.8667 111.657 92.7069L106.189 96.4636C103.518 98.5089 101.848 100.93 100.972 103.685C100.512 105.146 100.179 108.944 100.095 111.49C100.053 111.991 99.7612 113.118 98.2167 113.118H81.896C80.1846 113.118 79.9759 112.117 80.0176 111.616C80.2681 104.687 81.2699 98.9681 84.15 94.3766C88.0319 88.1989 98.9681 81.6873 98.9681 81.6873C100.638 80.435 101.932 79.0993 102.933 77.6384C104.77 75.1339 106.273 72.3373 106.273 69.3319C106.273 65.8674 105.438 62.5699 103.226 59.815C100.638 56.6009 97.8411 55.0565 92.4565 55.0565C87.1554 55.0565 84.0665 57.7279 81.8542 61.2341C79.642 64.7404 80.0176 68.8728 80.0176 72.6295H59.6897C59.6897 58.4375 63.4047 49.3797 71.252 44.0368C76.5531 40.4054 83.3152 38.8192 91.2042 38.8192C101.556 38.8192 109.779 40.7393 117.042 46.2491C123.762 51.3415 127.31 58.521 127.31 68.2049C127.31 74.1739 125.223 79.1828 122.26 83.2317Z"
        fill={color}
      />
    </svg>
  );
}
HelpSvg.propTypes = {
  color: PropTypes.string.isRequired,
};

export function MessagesSvg(props) {
  const { color } = props;
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 384 346"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M383.372 329.819L365.828 277.19C364.828 274.188 365.154 270.96 366.603 268.147C379.787 242.532 385.232 212.289 379.528 180.411C370.782 131.543 334.998 90.9363 288.585 75.3633C300.561 104.287 304.213 136.447 298.23 168.347C286.075 233.184 234.156 284.593 169.039 296.271C160.61 297.783 152.094 298.519 143.643 298.734C163.419 320.07 189.816 335.237 219.262 340.518C250.944 346.2 281.046 340.911 306.584 327.924C309.386 326.499 312.591 326.182 315.574 327.176L368.404 344.786C377.655 347.87 386.456 339.07 383.372 329.819Z"
        fill={color}
      />
      <path
        d="M113.161 2.4514C58.2825 12.6484 14.3055 57.2334 4.47154 112.177C-1.23246 144.055 4.21254 174.298 17.3965 199.913C18.8455 202.726 19.1715 205.954 18.1725 208.956L0.627539 261.585C-2.45546 270.836 6.34454 279.636 15.5955 276.553L68.4255 258.943C71.4095 257.949 74.6155 258.266 77.4165 259.691C102.954 272.678 133.055 277.967 164.738 272.285C219.547 262.456 264.019 218.587 274.279 163.857C292.357 67.4434 209.546 -15.4586 113.161 2.4514ZM148.099 179.987H79.8645C73.1345 179.987 67.6795 174.533 67.6795 167.802C67.6795 161.072 73.1345 155.617 79.8645 155.617H148.099C154.83 155.617 160.284 161.072 160.284 167.802C160.284 174.533 154.83 179.987 148.099 179.987ZM196.838 131.248H79.8635C73.1335 131.248 67.6785 125.794 67.6785 119.063C67.6785 112.333 73.1335 106.878 79.8635 106.878H196.837C203.568 106.878 209.022 112.333 209.022 119.063C209.023 125.794 203.569 131.248 196.838 131.248Z"
        fill={color}
      />
    </svg>
  );
}
MessagesSvg.propTypes = {
  color: PropTypes.string.isRequired,
};
