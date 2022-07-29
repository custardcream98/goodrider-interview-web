// import { Spinner } from "react-bootstrap";

// const Image = ({ qNum, imgSrc, sliderValue }) => {
//   const [loading, setLoading] = useState(true);

//   const imgLoaded = () => setLoading(false);

//   return (
//     <div className={styles.Item}>
//       <h5 className="display-block">{`${qNum + 1}. `}</h5>
//       <div className={styles.ImgBox}>
//         <Spinner
//           as="p"
//           animation="border"
//           role="status"
//           className={`${loading ? "" : "visually-hidden"}`}
//         >
//           <span className="visually-hidden">Loading...</span>
//         </Spinner>
//         <img
//           className={`${loading ? "visually-hidden" : ""} ${
//             sliderValue < 50 ? styles.SelectedImg : styles.Img
//           }`}
//           src={`http://localhost:3000/${imgSrc}`}
//           onLoad={imgLoaded}
//         />
//       </div>
//     </div>
//   );
// };

// export default Image;
