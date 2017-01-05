import React, { Component, PropTypes } from 'react';

function Loader(props) {

  if (!props.loading) return props.children;

  return (
    <div class="loader-container">
      <div class="forecast-loader">
        <div class="cloud"></div>
        <div class="sun">
          <div class="rays"></div>
        </div>
      </div>
      <p>Loading Forecast...</p>
    </div>
  )
}

Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};

Loader.defaultProps = {
  loading: true
};

export default Loader;
