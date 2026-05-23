type CloseIconProps = {
  /** Pixel size of the icon's bounding box. Defaults to 16. */
  size?: number;
};

/**
 * The "X" close glyph shared by every dismissible surface (modals, popups,
 * the file-remove pill). Always decorative — wrap it in a labelled <button>.
 */
const CloseIcon = ({ size = 16 }: CloseIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
);

export default CloseIcon;
