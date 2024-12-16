import React from "react";
import { Timeline } from "./../../accertinityui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
        <div className=" md:mb-3 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
          Streetscape{" "}
          <span className="hidden md:block text-neutral-300 text-lg md:text-3xl opacity-70">
            A tint Avenue
          </span>
          <div className="block md:hidden text-neutral-300 text-lg md:text-3xl opacity-70" >
          A tint Avenue 
          </div>
        </div>
        <p className="text-neutral-300 text-sm md:text-base font-mono opacity-50">
          02nd Feb - 03rd Feb
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="text-neutral-300 text-lg opacity-70 py-6 md:col-span-1">
            <span className="block md:hidden">
              A grand 30-hour road painting event that brought together around 800 enthusiastic participants, who competed to create stunning artworks on the Library Road, SGSITS, from February 3 to 4, 2024. The event, organized by Club Pratibimb, not only celebrated creativity but also secured a place in the prestigious Official Book of Records in London.
            </span>
            <span className="hidden md:block">
              A grand 30-hour road painting event that brought together around 800 enthusiastic participants, who competed to create stunning artworks on the Library Road, SGSITS, from February 3 to 4, 2024. The event, organized by Club Pratibimb, not only celebrated creativity but also secured a place in the prestigious Official Book of Records in London. Participants, inspired by various themes, showcased their artistic skills, transforming the road into a vibrant, colorful masterpiece. With its jubilant atmosphere and record-breaking achievement, Streetscape was a truly unforgettable celebration of art and community spirit.
            </span>
          </div>
          <div className="md:col-span-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1733767739/o4r5q4deccmkurcubktm.jpg"
              alt="startup template"
              className=" rounded-lg object-cover  md:w-full  h-48 md:h-full"
            />
          </div>
          <div className="md:col-span-2 mt-6 md:mt-0">
            <iframe
              className="w-full h-48 md:h-96 rounded-3xl"
              src="https://www.youtube.com/embed/ucem4JGCIk0?si=C6RJeIIAF00nla9N"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <div className="md:mb-3 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
            Graffathon{" "}
            <span className="hidden md:block text-neutral-300 text-lg md:text-3xl opacity-70">
              Back to Rituals
            </span>
            <div className="block md:hidden text-neutral-300 text-lg md:text-3xl opacity-70" >Back to Rituals</div>
          </div>
          <p className="text-neutral-300 text-sm md:text-base font-mono opacity-50">
            11th March - 12th March
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="text-neutral-300 text-lg opacity-70 py-6 md:col-span-1">
            <span className="block md:hidden">
            A 30-hour wall painting marathon where participants eagerly
              competed to create stunning murals. They embraced themes such as
              urban art, concept art for social causes, and innovation and
              technology, transforming walls into vibrant expressions of
              creativity and purpose.            </span>
            <span className="hidden md:block">
            A 30-hour wall painting marathon where participants eagerly
              competed to create stunning murals. They embraced themes such as
              urban art, concept art for social causes, and innovation and
              technology, transforming walls into vibrant expressions of
              creativity and purpose.Over the course of the marathon, teams and
              individuals worked tirelessly, transforming blank walls into
              stunning works of art.            </span>
          </div>
          <div className="md:col-span-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195005/ooteb8bx3xpsiiawlcvj.png"
              alt="startup template"
              className=" rounded-lg object-cover  md:w-full  h-48 md:h-full"
            />
          </div>
          <div className="md:col-span-2 mt-6 md:mt-0">
            <iframe
              className="w-full h-48 md:h-96 rounded-3xl"
              src="https://www.youtube.com/embed/oa-yFWUjEp0?si=bup7alQc4TlvItJz"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <div className="md:mb-3 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
            Graffathon 2.O
          </div>
          <p className="text-neutral-300 text-sm md:text-base opacity-70 font-mono">
            2nd Feb - 3rd Feb
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="text-neutral-300 text-lg opacity-70 py-6 md:col-span-1">
            <span className="block md:hidden">
            Graffathon 2.0 was an electrifying 48-hour artistic event held on
              the SGSITS campus on February 2nd and 3rd, 2019. Around 600
              talented artists came together to transform blank walls into
              stunning pieces of public art.           </span>
            <span className="hidden md:block">
            Graffathon 2.0 was an electrifying 48-hour artistic event held on
              the SGSITS campus on February 2nd and 3rd, 2019. Around 600
              talented artists came together to transform blank walls into
              stunning pieces of public art. Overflowing with creativity, they
              crafted vibrant artworks that told powerful stories and brought
              the campus to life. The event blossomed into a recognition of
              collaboration and artistic expression, leaving a profound
              impression on the campus and everyone who witnessed it.            </span>
          </div>
          <div className="md:col-span-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195001/jhtn9aqulolxtkepck13.jpg"
              alt="startup template"
              className=" rounded-lg object-cover  md:w-full  h-48 md:h-full"
            />
          </div>
          <div className="md:col-span-2 mt-6 md:mt-0">
            <iframe
              className="w-full h-48 md:h-96 rounded-3xl"
              src="https://www.youtube.com/embed/Z3XTYr_6yec?si=kAMZujpKnn_fzHdk"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div>
        <div className=" md:mb-3 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
          Graffathon{" "}
          <span className="hidden md:block text-neutral-300 text-lg md:text-3xl opacity-70">
            India Book of Records
          </span>
          <div className="block md:hidden text-neutral-300 text-lg md:text-3xl opacity-70" >
          India Book of Records 
          </div>
        </div>
        <p className="text-neutral-300 text-sm md:text-base font-mono opacity-50">
        1st Oct - 2nd October
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="text-neutral-300 text-lg opacity-70 py-6 md:col-span-1">
            <span className="block md:hidden">
            Club Pratibimb once again set a new record in the India Book of
              Records . Artists came together to cover 63 wall stretches across
              a massive 4,800 square feet. The event, which lasted 36 hours,
              from 10:00 AM on October 1 to 10:00 PM on October 2, was a
              testament to the students' dedication and artistic prowess.            </span>
            <span className="hidden md:block">

            Club Pratibimb once again set a new record in the India Book of
              Records . Artists came together to cover 63 wall stretches across
              a massive 4,800 square feet. The event, which lasted 36 hours,
              from 10:00 AM on October 1 to 10:00 PM on October 2, was a
              testament to the students' dedication and artistic prowess. The
              walls became canvases for a diverse array of themes, ranging from
              bold social commentary, urban art and many innovative themes .            </span>
          </div>
          <div className="md:col-span-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195001/l2d7gnzv92njaoovywng.jpg"
              alt="startup template"
              className=" rounded-lg object-cover  md:w-full  h-48 md:h-full"
            />
          </div>
          
        </div>
      </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div>
        <div className=" md:mb-3 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
          Graffitti{" "}
          <span className="hidden md:block text-neutral-300 text-lg md:text-3xl opacity-70">
            Limca Book of Records
          </span>
          <div className="block md:hidden text-neutral-300 text-lg md:text-3xl opacity-70" >
          Limca Book of Records 
          </div>
        </div>
        <p className="text-neutral-300 text-sm md:text-base font-mono opacity-50">
        22nd - 23rd September
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
          <div className="text-neutral-300 text-lg opacity-70 py-6 md:col-span-1">
            <span className="block md:hidden">
           
Club Pratibimb made history during Graffiti 2012, securing a
              prestigious spot in the Limca Book of Records for an extraordinary
              painting marathon. Over a grueling 36-hour stretch, beginning at
              7:00 AM on September 22 and concluding at 7:00 PM on September 23,
              2012, 175 dedicated students transformed 24 campus walls into
              vibrant works of art.            </span>
            <span className="hidden md:block">

            Club Pratibimb made history during Graffiti 2012, securing a
              prestigious spot in the Limca Book of Records for an extraordinary
              painting marathon. Over a grueling 36-hour stretch, beginning at
              7:00 AM on September 22 and concluding at 7:00 PM on September 23,
              2012, 175 dedicated students transformed 24 campus walls into
              vibrant works of art. Covering a massive 2,400 square feet.The
              students collaborated to create themes that reflected social
              issues, environmental awareness, science and innovation.           </span>
          </div>
          <div className="md:col-span-1 flex justify-center">
            <img
              src="https://res.cloudinary.com/dhy548whh/image/upload/v1734195000/aeoux79oezcwxtoz7buh.jpg"
              alt="startup template"
              className=" rounded-lg object-cover  md:w-full  h-48 md:h-full"
            />
          </div>
          
        </div>
      </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
