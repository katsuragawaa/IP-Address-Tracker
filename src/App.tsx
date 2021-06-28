import { FormEvent, useEffect, useState } from "react";
import { Result } from "./components/Result";
import { getLocation } from "./services/apiIpify";
import { Map, Marker, TileLayer } from "react-leaflet";

import "./style.css";

function App() {
  // setup hooks
  const [search, setSearch] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");
  const [coordinates, setCoordinates] = useState<any>([-25.441105, -49.276855]); // quick workaround 

  // get user IP address on access
  useEffect(() => {
    async function getUserIp() {
      const response = await fetch("https://geolocation-db.com/json/");
      const data = await response.json();
      setSearch(data.IPv4);
    }
    getUserIp();
  }, []);

  async function handleButtonClick(event: FormEvent) {
    event.preventDefault();

    try {
      const searchResult = await getLocation(search);

      setIpAddress(searchResult.ipAddress);
      setLocation(
        `${searchResult.city}, ${searchResult.country} ${searchResult.postalCode}`
      );
      setTimezone(`UTC ${searchResult.timezone}`);
      setIsp(searchResult.isp);
      setCoordinates(searchResult.coordinates);
    } catch (error) {
      alert("Invalid IP or Domain");
    }
    setSearch("");
  }

  return (
    <div>
      <header>
        <h1>IP Address Tracker</h1>
        <form onSubmit={handleButtonClick}>
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button>&gt;</button>
        </form>
      </header>
      <div className="container">
        <Result title="ip address" content={ipAddress} />
        <Result title="location" content={location} />
        <Result title="timezone" content={timezone} />
        <Result title="isp" content={isp} />
      </div>
      <div>
        <Map center={coordinates} zoom={14}>
          <TileLayer
            url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            maxZoom={18}
            id="mapbox/streets-v11"
            tileSize={512}
            zoomOffset={-1}
            accessToken={process.env.REACT_APP_MAPBOX_KEY}
          />
          <Marker position={coordinates} />
        </Map>
      </div>
    </div>
  );
}

export default App;
