import { useContext, useState } from "react";
import openAIApi from "./apiConfig/openAIApi";
import { useWords } from "./context/WordsContext";
import TopBar from "./component/TopBar";
import { Card, TextField, Typography, Button, CircularProgress } from "@mui/material";
import "./style.css";
import DetailsCard from "./component/DetailsCard";
import "@fontsource/noto-sans-hebrew";
import "@fontsource/noto-serif-hebrew";
import "@fontsource/noto-rashi-hebrew";
import "@fontsource/ibm-plex-sans-hebrew";
import "@fontsource/playpen-sans-hebrew";
import "@fontsource/solitreo";
import { getHebrewWordsPrompt } from "./assets/prompt";
import { useNavigate } from "react-router-dom";
import text from "./assets/text";

function App() {
  const { words, setWords, generateStringToArr, playerDetails } = useWords();
  // const prompt = `תן לי רשימה של 10 מילים קצרות בנושא ${topic}, נפרדות בפסיק ללא רווחים, ללא משפטים נוספים.`;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await openAIApi.getWordsList(
        getHebrewWordsPrompt(playerDetails)
      );
      const wordsArr = generateStringToArr(res);
      console.log(res);

      setWords(wordsArr);
      console.log(words);
    } catch (error) {
      console.error(error);
      console.log("אירעה שגיאה בקבלת תגובה מ-OpenAI");
    } finally {
      setIsLoading(false)
      navigate("trivia");
    }
  };

  const startGame = () => {};
  return (
    <div id="app">
      <TopBar />
      <DetailsCard />
      <Button
        variant="outlined"
        className="startBtn"
        id="startBtn"
        onClick={getData}
      >
        {isLoading ? <CircularProgress  size={"20px"}/> : text.start}
      </Button>
    </div>
  );
}

export default App;

// import '@fontsource/noto-sans-hebrew';
// import '@fontsource/noto-serif-hebrew';
// import '@fontsource/noto-rashi-hebrew';
// import '@fontsource/ibm-plex-sans-hebrew';
// import '@fontsource/playpen-sans-hebrew';
// import '@fontsource/solitreo';

// function App() {
//   const sampleText = "העברית היא שפה עשירה, יפה ומגוונת";

//   return (
//     <div style={{ padding: "2rem", direction: "rtl" }}>
//       <h1 style={{ fontFamily: "'Noto Sans Hebrew', sans-serif" }}>
//         Noto Sans Hebrew
//       </h1>
//       <p style={{ fontFamily: "'Noto Sans Hebrew', sans-serif" }}>{sampleText}</p>

//       <h1 style={{ fontFamily: "'Noto Serif Hebrew', serif" }}>
//         Noto Serif Hebrew
//       </h1>
//       <p style={{ fontFamily: "'Noto Serif Hebrew', serif" }}>{sampleText}</p>

//       <h1 style={{ fontFamily: "'Noto Rashi Hebrew', cursive" }}>
//         Noto Rashi Hebrew
//       </h1>
//       <p style={{ fontFamily: "'Noto Rashi Hebrew', cursive" }}>{sampleText}</p>

//       <h1 style={{ fontFamily: "'IBM Plex Sans Hebrew', sans-serif" }}>
//         IBM Plex Sans Hebrew
//       </h1>
//       <p style={{ fontFamily: "'IBM Plex Sans Hebrew', sans-serif" }}>{sampleText}</p>

//       <h1 style={{ fontFamily: "'Playpen Sans Hebrew', cursive" }}>
//         Playpen Sans Hebrew
//       </h1>
//       <p style={{ fontFamily: "'Playpen Sans Hebrew', cursive" }}>{sampleText}</p>

//       <h1 style={{ fontFamily: "'Solitreo', cursive" }}>
//         Solitreo
//       </h1>
//       <p style={{ fontFamily: "'Solitreo', cursive" }}>{sampleText}</p>
//     </div>
//   );
// }

// export default App;
