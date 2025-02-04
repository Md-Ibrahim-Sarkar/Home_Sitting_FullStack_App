

const Banner = () => {
  return (
    <>
      <div className="relative max-h-[200px] font-sans before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10">
        <img src="https://cdn.pixabay.com/photo/2017/09/09/18/25/living-room-2732939_960_720.jpg" alt="Banner Image" className="absolute inset-0 w-full h-full  object-cover" />
        <div className="min-h-[200px] relative z-40 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
          <h2 className="sm:text-4xl text-2xl font-bold mb-6">Book Our Home Service</h2>
        </div>
      </div>
    </>
  )
}

export default Banner