import React, { ReactNode, useEffect, useState } from 'react';


interface props {
  children: ReactNode,
  className: string
}

export const Layout1 = ( {children, className}: props ) => {

  return (
    <span className={`h-full ${className}`} >
      {children}
    </span>
  );
};