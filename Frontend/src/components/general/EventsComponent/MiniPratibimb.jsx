import React from "react";

export default function MiniPratibimb() {
  return (
    <div className="">
      <div className="w-4/5 mx-auto border-t mb-3 border-slate-400"></div>
      <div className="mb-2 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-3xl text-center font-medium tracking-tight text-transparent md:text-6xl font-poppins">
        About MiniPratibimb
      </div>
      <div className="text-center text-neutral-700 text-base md:text-lg opacity-70 w-4/5 mx-auto">
        An initiative by Club Pratibimb, is dedicated to fostering creativity
        and artistic skills across schools, institutions, and communities.
        <span className="hidden md:block">
          Through immersive workshops and interactive sessions, we aim to
          empower individuals to explore their creative potential, master
          artistic expressions, and embrace art as a force for storytelling and
          transformation.
        </span>
      </div>

      <div className="mb-2 mt-6 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xl text-center font-medium tracking-tight text-transparent md:text-4xl font-poppins">
        Photography Workshop at <br /> St. Vincent Pallotti School <br />{" "}
        <span className="text-lg md:text-2xl font-sans"> 31.08.24</span>
      </div>
      <div className="text-center text-neutral-700 text-base md:text-lg opacity-70 w-4/5 mx-auto">
        Mini Pratibimb at St. Vincent Pallotti School engaged over 100+ students
        from Grades 6 to 8 in a dynamic 3-hour photography workshop, sparking
        their creativity and equipping them with skills to capture meaningful
        moments and artistic expressions.
      </div>

      <div className="mt-4">
        <img
          src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950568/isvwixlbdpetjx1k2scn.png"
          alt="image"
          className="col-span-2 w-full rounded-lg mx-auto max-w-[80%]"
        />
      </div>
      <div className="flex my-2 md:my-6 mx-10 md:mx-28 gap-4 md:gap-6">
        <div>
          <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950568/jojim6asxs6y5myypgjp.jpg" alt="image" className="rounded-lg mx-auto" />
        </div>
        <div>
          <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950569/ac6u7gcltgvgtntxgchz.jpg" alt="image" className="rounded-lg mx-auto" />
        </div>
      </div>

      <div className="mb-2 mt-6 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xl text-center font-medium tracking-tight text-transparent md:text-4xl font-poppins">
        Photography Workshop at <br /> Choithram School <br />{" "}
        <span className="text-lg md:text-2xl font-sans"> 07.10.23</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="flex-1 my-auto text-center md:text-right mx-12 mb-2 md:ml-24 text-neutral-700 text-base md:text-lg opacity-70">
          Club Pratibimb continued its legacy with Mini Pratibimb,{" "}
          <span className="hidden md:block">
            which is a platform for school students to be a part of its
            activities and explore the varied aspects of arts and photography.
          </span>{" "}
          Mini Pratibimb's implementation this year was through a photography
          workshop organised by the club in Choithram School.
        </div>
        <div className="flex-1 flex justify-center">
          <img src="https://res.cloudinary.com/dgc7xsrcx/image/upload/v1734950568/nyws74l7nbpiwy8htnpv.png" alt="image" className="w-[40%] rounded-xl" />
        </div>
      </div>

      <div className="mb-2 mt-6 bg-gradient-to-br from-slate-500 to-slate-800 bg-clip-text text-xl text-center font-medium tracking-tight text-transparent md:text-4xl font-poppins">
        Photography Workshop at <br /> Choithram School <br />{" "}
        <span className="text-lg md:text-2xl font-sans"> 05.11.22</span>
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between">
        <div className="flex-1 flex justify-center">
          <img src="/mini3_1.png" alt="image" className="w-[40%] rounded-xl" />
        </div>
        <div className="flex-1 my-auto text-center md:text-left m-12 md:mr-24 text-base md:text-neutral-700 md:text-lg opacity-70">
          <span className="hidden md:block">
            Club Pratibimb introduced Mini Pratibimb which is a platform for
            school students or institutions to join the club, be a part of its
            activities and explore the varied aspects of arts and photography.
            Mini Pratibimb's first implementation was through a photography
            workshop organised by the club in Choithram School.
          </span>
          <div className="block md:hidden">
            Club pratibimb introduced Mini Pratibimb and successfully conducted
            Photography workshop in Choithram School.
          </div>
        </div>
      </div>
    </div>
  );
}
