import img from './../../assets/img/store.jpg';

function Hero() {
  const scrollToDiscover = () => {
    const element = document.getElementById('Discover');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative">
      <img
        src={img}
        className="w-full object-cover min-h-[calc(100vh+10px)]"
        alt="Store"
      />
      <div className="absolute lg:top-1/3 lg:left-96 lg:transform lg:-translate-y-1/2 text-left text-white px-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex items-center mb-2">
          <div className="w-10 h-[2px] bg-red-900 mr-2"></div>
          <p className="text-lg font-semibold tracking-tight text-rose-300 uppercase">New Trend</p>
        </div>
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-red-900 uppercase px-3">Razan's Store</h1>
        <h2 className="text-4xl mb-4 text-red-950 uppercase">EveryThing You Want</h2>
        <p
          onClick={scrollToDiscover}
          className="text-2xl font-semibold underline underline-offset-4 text-red-950 cursor-pointer uppercase"
        >
          Discover More
        </p>
      </div>
    </div>
  );
}

export default Hero;
