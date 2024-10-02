import { Carousel } from "flowbite-react";

export default function HeroSection({ elements }) {
  console.log({ elements });

  return (
    <div className='hero bg-cover text-center text-white'>
      <div className='min-h-60 p-8 backdrop-brightness-50'>
        <h1 className='text-5xl mb-4'>Countries</h1>
        <p className='mb-4 font-semibold text-xl'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi esse
          accusamus dolorum, aliquam optio in.
        </p>

        <div className='h-[200px]'>
          <Carousel leftControl='' rightControl=''>
            {elements.map((element, index) => (
              <div key={index}>
                <div className="flex flex-col w-60 mx-auto mb-8">
                  <img
                    src={element.flagURL}
                    alt={`flag of ${element.name}flag`}
                  />
                  {element.name}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
