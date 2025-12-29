import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  // Helper to render a lantern string
  const renderLanternString = (count: number) => (
    <div className="flex space-x-6">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center transform origin-top animate-float"
          style={{ animationDelay: `${i * 0.5}s` }}
        >
          <div className="w-1 h-16 bg-yellow-600"></div>
          <div className="w-16 h-20 bg-red-600 rounded-lg shadow-[0_0_15px_rgba(220,38,38,0.5)] border-2 border-yellow-400 flex items-center justify-center relative">
            <span className="text-yellow-300 text-2xl font-serif font-bold">
              福
            </span>
            {/* Bottom fringe */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-10 bg-red-500 rounded-full"></div>
              <div className="w-1 h-12 bg-red-500 rounded-full"></div>
              <div className="w-1 h-10 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#450a0a] text-white overflow-hidden relative font-sans selection:bg-festival-gold selection:text-red-900">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-red-600/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-yellow-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Lantern Strings - Positioned safely at top sides */}
      <div className="absolute top-0 left-10 pointer-events-none z-0 hidden lg:block">
        {renderLanternString(2)}
      </div>
      <div className="absolute top-0 right-10 pointer-events-none z-0 hidden lg:block">
        {renderLanternString(2)}
      </div>

      {/* Main Container: Centered Vertically and Horizontally */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};
