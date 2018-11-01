import React from 'react'

function Loader(props) {
  if (!props.loading) return props.children

  return (
    <div className="loader-container">
      <div className="forecast-loader">
        <div className="cloud" />
        <div className="sun">
          <div className="rays" />
        </div>
      </div>
      <p>Loading Forecast...</p>
    </div>
  )
}

Loader.defaultProps = {
  loading: true
}

export default Loader
