import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <>
      <Header></Header>
      <div className="contents">
        <article className="home">
          <h1>RED</h1>
          <h2>Welcome to Refrigerator Expiry Date</h2>
        </article>
      </div>
      <Footer></Footer>
    </>
  );
}

export default App;
