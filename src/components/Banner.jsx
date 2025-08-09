// src/components/Banner.jsx
const Banner = () => {
  return (
    <div className="carousel w-full rounded-lg shadow-md m-y-10 mt-12">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-[250px] sm:h-[400px]">
        <img src="https://i.ibb.co/1fXm31ck/pexels-runffwpu-2461977.jpg" className="w-full object-cover" alt="Marathon 1" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
          <a href="#slide3" className="btn btn-circle btn-primary btn-soft">❮</a>
          <a href="#slide2" className="btn btn-circle btn-primary btn-soft">❯</a>
        </div>
        <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 p-4 rounded">
          <h2 className="text-2xl font-bold">Run with Purpose</h2>
          <p className="text-sm">Join community events across the country</p>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-[250px] sm:h-[400px]">
        <img src="https://i.ibb.co/PsGQg1qd/pexels-stephen-leonardi-587681991-29840318.jpg" className="w-full object-cover" alt="Marathon 2" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
          <a href="#slide1" className="btn btn-circle btn-primary btn-soft">❮</a>
          <a href="#slide3" className="btn btn-circle btn-primary btn-soft">❯</a>
        </div>
        <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 p-4 rounded">
          <h2 className="text-2xl font-bold">Challenge Yourself</h2>
          <p className="text-sm">Different distances for every skill level</p>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-[250px] sm:h-[400px]">
        <img src="https://i.ibb.co/Psk9QcVF/2151847308.jpg" className="w-full object-cover" alt="Marathon 3" />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-4 right-4 top-1/2">
          <a href="#slide2" className="btn btn-circle btn-primary btn-soft">❮</a>
          <a href="#slide1" className="btn btn-circle btn-primary btn-soft">❯</a>
        </div>
        <div className="absolute bottom-5 left-5 text-white bg-black bg-opacity-50 p-4 rounded">
          <h2 className="text-2xl font-bold">Track Your Journey</h2>
          <p className="text-sm">Manage events and track progress</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
