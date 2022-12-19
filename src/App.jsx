import { useEffect, useState } from "react";
import { fetchImages } from "./api";
import percent1 from '/data/poke1.json';
import percent2 from '/data/poke2.json';
import percent3 from '/data/poke3.json';
import percent4 from '/data/poke4.json';
import percent5 from '/data/poke5.json';
import percent6 from '/data/poke6.json';
import percent7 from '/data/poke7.json';
import percent8 from '/data/poke8.json';



function Header() {
  return (
    <header className = "hero is-dark is-bold">
      <div className = "hero-body">
        <div className = "container">
          <h1 className = "title">世代別御三家ポケモンランキング！</h1>
          <h2>日本大学文理学部情報科学科 Webプログラミングの演習課題</h2>
          <h3>学籍番号：5420074</h3>
          <h3>氏名：筧 直人</h3>
        </div>
      </div>
    </header>
  );
}





function Form(props) {
  function handleSubmit(event) {
    event.preventDefault();
    const { breed } = event.target.elements;
    props.setelement(breed.value);
  }
  return (
    <div>
      <form onSubmit = {handleSubmit}>
        <div className = "field has-addons">
          <div className = "control is-expanded">
            <div className = "select is-fullwidth">
              <select name = "breed" defaultValue="percent1">
                <option value = "percent1">初代(ゼニガメ、ヒトカゲ、フシギダネ)</option>
                <option value = "percent2">第2世代(ワニノコ、ヒノアラシ、チコリータ)</option>
                <option value = "percent3">第3世代(ミズゴロウ、アチャモ、キモリ)</option>
                <option value = "percent4">第4世代(ポッチャマ、ヒコザル、ナエトル)</option>
                <option value = "percent5">第5世代(ミジュマル、ポカブ、ツタージャ)</option>
                <option value = "percent6">第6世代(ケロマツ、フォッコ、ハリマロン)</option>
                <option value = "percent7">第7世代(アシマリ、ニャビー、モクロー)</option>
                <option value = "percent8">第8世代(クワッス、ホゲータ、ニャオハ)</option>
              </select>
            </div>
          </div>
          <div className = "control">
            <button type = "Submit" className = "button is-dark">
              Reload
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}


function Main() {
  const dataBase = {
    "percent1": percent1,
    "percent2": percent2,
    "percent3": percent3,
    "percent4": percent4,
    "percent5": percent5,
    "percent6": percent6,
    "percent7": percent7,
    "percent8": percent8,
  }
  const [element, setelement] = useState("percent1");
  useEffect(() => {
    fetchImages("percent1").then((urls) => {
      setUrls(urls);
    });
  }, []);
  
  const [pokedata, setpokeData] = useState(percent1);
  useEffect(() => {
    setpokeData(dataBase[element]);
  })
  let cut = "";
  let label = "";
  pokedata.map(
    (item) => {
      cut += item[element] + ",";
      label += item[element] + "%" + "|";
    }
  )
  return (
  <main>
      <section className="section">
        <div className="container">
          <Form setelement={setelement} />
        </div>
        </section>
        <center>
      <img src = {`https://image-charts.com/chart?cht=p&chs=400x400&chd=t:${cut}&chl=${label}&chco=00AAFF|FF3B1F|00FF00`} ></img>
      </center>
    </main>
  );
}

function Footer() {
  return (
    <footer className = "footer">
      <div className = "content has-text-centered">
        <p>image charts are retrieved from image charts API</p>
        <p>
          <a href = "https://www.image-charts.com">image charts API</a>
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;