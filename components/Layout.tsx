import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  /**
   * Render a Traditional Chinese Lantern
   *
   * Structure:
   * 1. Scale Wrapper (static transform)
   * 2. Animation Wrapper (keyframes)
   * 3. Content
   */
  const Lantern = ({
    text = "福",
    stringHeight = "h-24", // Control how low it hangs
    delay = 0,
    scale = 1,
  }: {
    text?: string;
    stringHeight?: string;
    delay?: number;
    scale?: number;
  }) => (
    <div
      style={{ transform: `scale(${scale})` }}
      className="origin-top z-20 relative"
    >
      <div
        className={`flex flex-col items-center origin-top animate-swing`}
        style={{ animationDelay: `${delay}s` }}
      >
        {/* Hanging String */}
        <div
          className={`w-1 ${stringHeight} bg-gradient-to-b from-yellow-700 via-yellow-500 to-yellow-600 shadow-sm mx-auto`}
        ></div>

        {/* The Lantern Body */}
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-red-600/40 blur-[30px] rounded-full"></div>

          {/* Top Gold Cap */}
          <div className="w-20 h-5 bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800 rounded-t-lg mx-auto relative z-10 shadow-lg border-b border-yellow-900/50"></div>

          {/* Bulbous Body (Curved Waist) */}
          <div className="w-48 h-36 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-[60px] shadow-[inset_0_5px_20px_rgba(0,0,0,0.3),0_10px_30px_rgba(185,28,28,0.4)] border border-yellow-500/20 flex items-center justify-center relative overflow-hidden z-0">
            {/* Decorative Ribs */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <div className="absolute left-1/2 -translate-x-1/2 w-[1px] h-full bg-black/10"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-3/4 h-[110%] -top-[5%] border-x border-black/10 rounded-[50%]"></div>
              <div className="absolute left-1/2 -translate-x-1/2 w-2/5 h-[110%] -top-[5%] border-x border-black/10 rounded-[50%]"></div>
            </div>

            {/* Center Piece (Diamond) */}
            <div className="w-20 h-20 bg-red-800/90 backdrop-blur-sm rotate-45 flex items-center justify-center border-2 border-yellow-400/80 shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] group-hover:scale-105 transition-transform duration-500">
              <span className="-rotate-45 text-yellow-300 text-4xl font-serif font-black drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)] select-none">
                {text}
              </span>
            </div>
          </div>

          {/* Bottom Gold Cap */}
          <div className="w-20 h-5 bg-gradient-to-r from-yellow-800 via-yellow-500 to-yellow-800 rounded-b-lg mx-auto relative z-10 shadow-lg border-t border-yellow-900/50"></div>
        </div>

        {/* Tassel Only (No Hongbao) */}
        <div className="flex flex-col items-center -mt-1 relative z-0">
          <div className="w-1 h-3 bg-red-800"></div>
          <div className="w-6 h-6 border-2 border-red-500 rotate-45 bg-red-900/50 mb-1 shadow-sm"></div>
          <div className="w-2 h-24 bg-gradient-to-b from-red-600 to-red-800 rounded-full blur-[0.5px]"></div>
        </div>
      </div>
    </div>
  );

  /**
   * Render a Festive Red Envelope (Hongbao)
   */
  const RedEnvelope = ({
    delay = 0,
    scale = 1,
    rotation = 0,
  }: {
    delay?: number;
    scale?: number;
    rotation?: number;
  }) => (
    <div
      className="relative group z-20"
      style={{ transform: `scale(${scale}) rotate(${rotation}deg)` }}
    >
      <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
        {/* Glow */}
        <div className="absolute inset-0 bg-red-500/20 blur-xl"></div>

        {/* Envelope Body */}
        <div className="w-28 h-40 bg-gradient-to-b from-red-600 to-red-800 rounded-xl border border-yellow-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.3)] flex flex-col items-center overflow-hidden relative transition-transform duration-300 hover:-translate-y-4">
          {/* Top Flap Arc */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-40 h-24 bg-red-700/80 rounded-[50%] border-b border-yellow-500/20 shadow-sm"></div>

          {/* Gold Seal / Coin */}
          <div className="absolute top-8 w-10 h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 shadow-md flex items-center justify-center border-2 border-yellow-200 z-10">
            <span className="text-yellow-900 font-bold text-lg">福</span>
          </div>

          {/* Pattern/Texture */}
          <div className="mt-20 text-yellow-500/20 text-6xl font-serif font-black select-none">
            ￥
          </div>

          {/* Bottom Shine */}
          <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-[#450a0a] text-white overflow-hidden relative font-sans selection:bg-festival-gold selection:text-red-900">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[20%] w-[80%] h-[80%] bg-red-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[60%] h-[60%] bg-yellow-600/5 rounded-full blur-[100px]"></div>
      </div>

      {/* --- TOP: 4 Lanterns (Scaled Down & Moved to Edges) --- */}
      {/* Outer Left (High) - Moved to edge, smaller scale */}
      <div className="absolute top-[-20px] left-[-10px] hidden md:block pointer-events-none">
        <Lantern text="财" stringHeight="h-12" delay={0} scale={0.65} />
      </div>
      {/* Inner Left (Low) - Moved outward, smaller scale */}
      <div className="absolute top-[-20px] left-[10%] hidden lg:block pointer-events-none">
        <Lantern text="福" stringHeight="h-32" delay={0.5} scale={0.75} />
      </div>
      {/* Inner Right (Low) - Moved outward, smaller scale */}
      <div className="absolute top-[-20px] right-[10%] hidden lg:block pointer-events-none">
        <Lantern text="吉" stringHeight="h-32" delay={1.0} scale={0.75} />
      </div>
      {/* Outer Right (High) - Moved to edge, smaller scale */}
      <div className="absolute top-[-20px] right-[-10px] hidden md:block pointer-events-none">
        <Lantern text="祥" stringHeight="h-12" delay={1.5} scale={0.65} />
      </div>

      {/* --- BOTTOM: 4 Red Envelopes --- */}
      {/* Outer Left */}
      <div className="absolute bottom-8 left-[8%] hidden md:block pointer-events-none">
        <RedEnvelope delay={0.2} scale={0.9} rotation={-15} />
      </div>
      {/* Inner Left */}
      <div className="absolute bottom-4 left-[28%] hidden lg:block pointer-events-none">
        <RedEnvelope delay={1.2} scale={1.0} rotation={-5} />
      </div>
      {/* Inner Right */}
      <div className="absolute bottom-4 right-[28%] hidden lg:block pointer-events-none">
        <RedEnvelope delay={0.8} scale={1.0} rotation={5} />
      </div>
      {/* Outer Right */}
      <div className="absolute bottom-8 right-[8%] hidden md:block pointer-events-none">
        <RedEnvelope delay={1.8} scale={0.9} rotation={15} />
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center p-4 md:p-8">
        {children}
      </main>
    </div>
  );
};
