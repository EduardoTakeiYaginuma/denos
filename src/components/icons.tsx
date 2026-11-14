type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function Icon({ className = "h-6 w-6", children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg {...base} className={className}>
      {children}
    </svg>
  );
}

export const BellIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M6 9a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13 6 9Z" fill="currentColor" stroke="none" />
    <path d="M10.3 18a1.9 1.9 0 0 0 3.4 0" />
  </Icon>
);

export const HomeIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3.5 10.5 12 3.5l8.5 7" />
    <path d="M5.5 9.5V20h13V9.5" />
  </Icon>
);

export const MapIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 4 3.5 6.2V20L9 17.8l6 2.2 5.5-2.2V4L15 6.2 9 4Z" />
    <path d="M9 4v13.8M15 6.2V20" />
  </Icon>
);

export const CameraIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M14.5 4.5h-5L8 7H4.5A1.5 1.5 0 0 0 3 8.5v10A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 19.5 7H16l-1.5-2.5Z" />
    <circle cx="12" cy="13" r="3.5" />
  </Icon>
);

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
    <path d="M3.5 9.5h17M8 3.5V6.5M16 3.5V6.5" />
    <path d="M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
  </Icon>
);

export const PencilIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17v3Z" />
    <path d="M14.5 7.5 17.5 10.5" />
  </Icon>
);

export const BookmarkIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="4" y="3.5" width="16" height="17" rx="3" />
    <path d="M4 8h16" />
    <path d="M9.5 11v6l2.5-1.9 2.5 1.9v-6" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9.5V13l2.2 1.6" />
    <path d="M9 3.2h6" />
  </Icon>
);

export const HelpIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9.3 9a2.8 2.8 0 1 1 3.6 2.7c-.6.2-.9.8-.9 1.4v.6" />
    <path d="M12 17.3h.01" />
  </Icon>
);

export const GearIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M10.3 3.5h3.4l.4 2.2 1.9 1.1 2-.9 1.7 3-1.6 1.5v2.2l1.6 1.5-1.7 3-2-.9-1.9 1.1-.4 2.2h-3.4l-.4-2.2-1.9-1.1-2 .9-1.7-3 1.6-1.5v-2.2L4.3 8.9l1.7-3 2 .9 1.9-1.1.4-2.2Z" />
    <circle cx="12" cy="12" r="2.6" />
  </Icon>
);

export const UsersIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="9" cy="8.5" r="3" />
    <path d="M3.5 19a5.5 5.5 0 0 1 11 0" />
    <path d="M16 6a3 3 0 0 1 0 5.6M17.5 19a5.5 5.5 0 0 0-2-4" />
  </Icon>
);

export const TargetIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </Icon>
);

export const SparkleIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3.5 13.8 9 19.5 10.8 13.8 12.6 12 18.2 10.2 12.6 4.5 10.8 10.2 9 12 3.5Z" />
  </Icon>
);

export const KnotIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7.5 15.5a4 4 0 1 1 6-5.2 4 4 0 1 0 3-1.3" />
    <path d="M16.5 15.5a4 4 0 1 1-6-5.2 4 4 0 1 0-3-1.3" />
  </Icon>
);

export const ChatIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20 12.5a7 7 0 0 1-7.5 7 8 8 0 0 1-3.2-.6L4.5 20.5l1.3-4.3A7 7 0 0 1 12 5.5a7 7 0 0 1 8 7Z" />
  </Icon>
);

export const PinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s6.5-6 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15 12 21 12 21Z" />
    <circle cx="12" cy="10.5" r="2.5" />
  </Icon>
);
