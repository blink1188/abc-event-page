import { useState } from 'react'

// Use the same placeholder for missing images and images that fail to load.
function EventImage({ src, alt, className, fallbackClassName, children }) {
  const [failedSrc, setFailedSrc] = useState(null)

  if (!src || failedSrc === src) {
    return <div className={fallbackClassName}>{children}</div>
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  )
}

export default EventImage
