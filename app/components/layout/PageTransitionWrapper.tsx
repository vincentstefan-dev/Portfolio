"use client";

type PageTransitionWrapperProps = {
  isBlurred: boolean;
  children: React.ReactNode;
};

export default function PageTransitionWrapper({
  isBlurred,
  children,
}: PageTransitionWrapperProps) {
  return (
    <div
      className={`relative z-30 min-h-screen transition-all duration-[400ms] ease-out ${
        isBlurred ? "scale-[1.01] blur-sm" : "scale-100 blur-0"
      }`}
    >
      {children}
    </div>
  );
}