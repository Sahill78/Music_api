import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tracks, setTracks] = useState([]);

  const getTracks = async () => {
    setIsLoading(true);
    let data = await fetch(
      `https://v1.nocodeapi.com/ultron/spotify/CSfjDEnQVHRbUuws/search?q=${keyword==""?"trending":keyword}&type=track`
    );
    let convertedData = await data.json();
    console.log(convertedData.tracks.items);
    setTracks(convertedData.tracks.items || []);
    setIsLoading(false);
  };

  useEffect(() => {
    getTracks();

  }, []);
  
  return (
    <>
      <nav className="navbar  navbar-dark navbar-expand-lg  bg-dark ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Beast-music
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-center"
            id="navbarSupportedContent"
          >
            <input
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button onClick={getTracks} className="btn btn-outline-success">
              Search
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
      <h1>Listen T0 Your Heart  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="currentColor" class="bi bi-hearts" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015m6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343M7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358"/>
</svg></h1>
      
        <div className={`row ${isLoading ?"" : "d-none"}`}>
          <div className="col-12 py-5 text-center">

            <div
              className="spinner-border"
              style={{ width: "3rem", height: "3rem" }}
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>

          </div>
        </div>
        <div className="row">
          {tracks.map((element) => {
            return (
              <div key={element.id} className="col-lg-3 col-md-6 py-2">
                <div className="card">
                  <img
                    src={element.album.images[1].url}
                    className="card-img-top"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title ">{element.name}</h5>
                    <p className="card-text">
                      Artist:{element.album.artists[0].name}
                    </p>
                    <p className="card-text">
                      Release_date:{element.album.release_date}
                    </p>
                    <audio
                      src={element.preview_url}
                      controls
                      className="w-100"
                    ></audio>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
