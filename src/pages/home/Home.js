import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Adventure from "../../components/adventure/Adventure";
import Animation from "../../components/animation/Animation";
import Crime from "../../components/crime/Crime";
import Documentary from "../../components/documentary/Documentary";
import Featured from "../../components/featured/Featured";
import Footer from "../../components/footer/Footer";
import Horror from "../../components/horror/Horror";
import Navbar from "../../components/navbar/Navbar";
import Romance from "../../components/romance/Romance";
import ScienceFiction from "../../components/scienceFiction/ScienceFiction";
import SingleMovie from "../../components/singleMovie/SingleMovie";
import Thriller from "../../components/thriller/Thriller";
import Timer from "../../components/timer/Timer";
import "./home.scss";

const Home = () => {
  //Genre selection
  const [genreSelected, setGenreSelected] = useState("");
  const [genreItems, setGenreItems] = useState([]);
  useEffect(() => {
    const fetchDataAccordingToGenre = async () => {
      try {
        const res = await axios.get(`/movies/genre/${genreSelected}`);
        setGenreItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDataAccordingToGenre();
  }, [genreSelected]);

  //Path
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [categoryItems, setCategoryItems] = useState([]);
  const [latestItems, setLatestItems] = useState([]);
  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        if (path === "latest") {
          const res = await axios.get("/movies/latest");
          setLatestItems(res.data);
        }
        const res2 = await axios.get(`/movies/category/${path}`);
        setCategoryItems(res2.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategoryItems();
  }, [path]);

  if (genreSelected) {
    return (
      <>
        <div className="home1">
          <div className="home">
            <Navbar />
            <Featured
              setGenreSelected={setGenreSelected}
              genreSelected={genreSelected}
              genreItems={genreItems}
            />
          </div>
          <span className="singleMovieTitle">Genre : {genreSelected}</span>
          <div className="singleMovieListContainer">
            {genreItems.map((genreItem, i) => (
              <SingleMovie index={i} key={i} genreItem={genreItem} />
            ))}
          </div>
          <Timer />
          <Footer />
        </div>
      </>
    );
  } else if (path === "latest") {
    return (
      <>
        <div className="home1">
          <div className="home">
            <Navbar />
            <Featured
              setGenreSelected={setGenreSelected}
              genreSelected={genreSelected}
              genreItems={genreItems}
              latestItems={latestItems}
            />
          </div>
          <span className="singleMovieTitle">Latest Uploads</span>
          <div className="singleMovieListContainer">
            {latestItems.map((latestItem, i) => (
              <SingleMovie index={i} key={i} latestItem={latestItem} />
            ))}
          </div>
          <Timer />
          <Footer />
        </div>
      </>
    );
  } else if (path === "home") {
    return (
      <>
        <div className="home1">
          <div className="home">
            <Navbar />
            <Featured
              setGenreSelected={setGenreSelected}
              genreSelected={genreSelected}
              genreItems={genreItems}
              latestItems={latestItems}
            />
          </div>
          <span className="singleMovieTitle">All Movies & Shows</span>
          {/* <div className="singleMovieListContainer"> */}
          <>
            <Adventure />
            <Crime />
            <Horror />
            <Romance />
            <ScienceFiction />
            <Thriller />
            <Animation />
            <Documentary />
          </>

          {/* </div> */}
          <Timer />
          <Footer />
        </div>
      </>
    );
  } else {
    return (
      <div className="home">
        <Navbar />
        <Featured
          setGenreSelected={setGenreSelected}
          genreItems={genreItems}
          categoryItems={categoryItems}
        />
        {path && <span className="singleMovieTitle">Category : {path}</span>}

        {path ? (
          <div className="singleMovieListContainer">
            {categoryItems.map((categoryItem, i) => (
              <SingleMovie index={i} key={i} categoryItem={categoryItem} />
            ))}
          </div>
        ) : (
          <>
            <Adventure />
            <Crime />
            <Horror />
            <Romance />
            <ScienceFiction />
            <Thriller />
            <Animation />
            <Documentary />
          </>
        )}

        <Timer />
        <Footer />
      </div>
    );
  }
};

export default Home;

// return (
//   <>
//     {genreSelected ? (
//       <>
//         <div className="home1">
//           <div className="home">
//             <Navbar setSearchResult={setSearchResult} />
//             <Featured
//               setGenreSelected={setGenreSelected}
//               genreSelected={genreSelected}
//               genreItems={genreItems}
//             />
//           </div>
//           <span className="singleMovieTitle">Genre : {genreSelected}</span>
//           <div className="singleMovieListContainer">
//             {genreItems.map((genreItem, i) => (
//               <SingleMovie index={i} key={i} genreItem={genreItem} />
//             ))}
//           </div>
//           <Timer />
//           <Footer />
//         </div>
//       </>
//     ) : (
//       <>
//         <div className="home">
//           <Navbar setSearchResult={setSearchResult} />
//           <Featured
//             setGenreSelected={setGenreSelected}
//             genreItems={genreItems}
//             categoryItems={categoryItems}
//           />
//           {path && (
//             <span className="singleMovieTitle">Category : {path}</span>
//           )}

//           {path ? (
//             <div className="singleMovieListContainer">
//               {categoryItems.map((categoryItem, i) => (
//                 <SingleMovie index={i} key={i} categoryItem={categoryItem} />
//               ))}
//             </div>
//           ) : (
//             <>
//               <Adventure />
//               <Crime />
//               <Horror />
//               <Romance />
//               <ScienceFiction />
//               <Thriller />
//               <Animation />
//               <Documentary />
//             </>
//           )}

//           <Timer />
//           <Footer />
//         </div>
//       </>
//     )}
//   </>
// );
// };

// export default Home;
