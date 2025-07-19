import React from 'react';

export const Logo: React.FC = () => (
  <div className="flex items-stretch" aria-label="Ad Funnel Labs Logo">
    <div className="bg-secondary flex items-center justify-center py-2 px-3">
      <span className="font-display font-bold text-4xl text-primary" style={{ lineHeight: '1' }}>
        Ad
      </span>
    </div>
    <div className="ml-3 border border-secondary py-1 px-3 flex flex-col justify-center">
      <p className="font-display font-bold text-2xl text-secondary leading-tight">Funnel</p>
      <p className="font-sans font-extralight text-xl text-secondary leading-tight tracking-wider">Labs</p>
    </div>
  </div>
);