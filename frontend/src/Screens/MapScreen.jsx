import React, { useEffect, useRef, useState } from "react";
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from "@react-google-maps/api";
import axios from "axios";
import LoadingBox from "../components/LoadingBox";
import { useDispatch, useSelector } from "react-redux";
import { USER_SHIPPING_ADDRESS } from "../constanst/userConstants";

const libs = ["places"];

function MapScreen(props) {
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [center, setCenter] = useState({ lat: 33.74, lng: -84.38 });
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/config/googlemap");
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetchData();
  }, []);

  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };

  const onLoad = (map) => {
    mapRef.current = map;
  };

  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };

  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };

  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported on this browser");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userSignin);
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    if (places && places.length === 1) {
      dispatch({
        type: USER_SHIPPING_ADDRESS,
        payload: {
          user: userInfo.name,
          lat: location.lat,
          lng: location.lng,
          address: places[0].name,
          city: places[0].address_components[2].short_name,
          state: places[0].address_components[4].long_name,
          postal_code: places[0].address_components[6].long_name,
          formatted_address: places[0].formatted_address,
          googlePlaceId: places[0].place_id,
        },
      });
      props.history.push("/shipping");
    } else {
      alert("Please Enter Your Address");
    }
  };

  return googleApiKey ? (
    <div className="full-container">
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          id="google-map"
          mapContainerStyle={{ height: "100%", width: "100%" }}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className="map-input-box">
              <button
                className="map-back"
                type="button"
                onClick={() => props.history.push("/shipping")}
              >
                <i className="fa fa-arrow-left"></i>
              </button>
              <input type="text" placeholder="Enter your address" />
              <button
                type="button"
                className="primary confirm"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox />
  );
}

export default MapScreen;
