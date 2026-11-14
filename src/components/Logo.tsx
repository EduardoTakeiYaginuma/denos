type LogoProps = {
  className?: string;
};

export default function Logo({ className = "" }: LogoProps) {
  return (
    <img
      src="/assets/logo-amarela.png"
      alt="denós"
      draggable={false}
      className={`h-auto w-full max-w-[15rem] select-none ${className}`}
    />
  );
}
