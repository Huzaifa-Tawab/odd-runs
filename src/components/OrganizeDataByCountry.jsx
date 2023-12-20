import React, { useState, useEffect } from "react";

const OrganizeDataByCountry = ({ data }) => {
  const [organizedData, setOrganizedData] = useState({});

  useEffect(() => {
    const organized = data.results.reduce((acc, result) => {
      const country = result.league.cc || "Unknown";
      const leagueName = result.league.name;
      const key = country;

      if (!acc[key]) {
        acc[key] = { count: 1, leagues: { [leagueName]: [result] } };
      } else {
        acc[key].count += 1;
        if (!acc[key].leagues[leagueName]) {
          acc[key].leagues[leagueName] = [result];
        } else {
          acc[key].leagues[leagueName].push(result);
        }
      }

      return acc;
    }, {});

    setOrganizedData(organized);
  }, [data.results]);

  return (
    <div>
      {Object.entries(organizedData).map(([country, info]) => (
        <div key={country}>
          <h2>{`${country} ${info.count > 1 ? `(${info.count})` : ""}`}</h2>
          {Object.entries(info.leagues).map(([leagueName, details]) => (
            <div key={leagueName}>
              <p>{`${leagueName} ${
                details.length > 1 ? `(${details.length})` : ""
              }`}</p>
              {/* <ul>
                {details.map((result) => (
                  <li
                    key={result.id}
                  >{`Match: ${result.ss}, Time: ${result.time}`}</li>
                ))}
              </ul> */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default OrganizeDataByCountry;
