import React from "react"

interface LoaderProps {
  className?: string
}

export function Loader({ className = "" }: LoaderProps) {
  return (
    <div className={`loader ${className}`}>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__bar"></div>
      <div className="loader__ball"></div>
    </div>
  )
}