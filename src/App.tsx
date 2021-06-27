import { FormEvent, useState } from "react";
import { Result } from "./components/Result";
import { getLocation } from "./services/apiIpify";

function App() {
  const [search, setSearch] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  const [location, setLocation] = useState("");
  const [timezone, setTimezone] = useState("");
  const [isp, setIsp] = useState("");

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

    </div>
  );
}

export default App;
