import React from "react";
import EventCard from "./EventCard";

export default function PastEvents() {
  const events = [
    {
      title: "Sepia: A Whirl Of Visuals",
      logo: "https://res.cloudinary.com/dhy548whh/image/upload/v1734195240/oakqsgudi6opsbmpzhco.png",
      description:
        "Sepia: A Whirl Of Visuals was an inspiring event held on September 28, 2024. With around 500 attendees, including 250 participants and 80 teams, the workshop offered a perfect fusion of photography techniques and artistic creativity. Participants explored new photography methods and delved into the many facets of art, transforming their understanding of both fields. The workshop provided an immersive experience, blending education and creativity, making it an unforgettable journey for all involved.",
      shortDescription:
        "Sepia: A Whirl Of Visuals was an inspiring event held on September 28, 2024, with 500 attendees and 80 teams, blending photography and art. The workshop offered a perfect fusion of photography techniques and artistic creativity.",
      poster: "https://res.cloudinary.com/dhy548whh/image/upload/v1739047397/sepia_poster_11zon_g6vomh.png",
      video: "https://www.youtube.com/embed/RMCoZOe1U20?rel=0&modestbranding=1&enablejsapi=1", // Updated URL
    },
    {
      title: "Fabrica : Flares of Fibre",
      logo: "https://res.cloudinary.com/dhy548whh/image/upload/v1734195838/emkue7op1fivwjllr5gt.png",
      description:
        "Fabrica: Flares of Fibre was an inspiring T-shirt painting workshop held on September 23, 2023, where over 200 participants spent 9 hours turning blank T-shirts into vibrant works of art. Drawing inspiration from themes like Tribal Art, Contemporary India, and Pop Art, participants showcased their creativity through unique designs. The workshop was the epitome of artistic expression, offering a chance to not only enhance painting skills but also leave with a personalized piece of wearable art. It was a day full of creativity, culture, and hands-on fun.",
      shortDescription:
        "Fabrica: A T-shirt painting workshop held on September 23, 2023 where over 200 participants spent 9 hours turning blank T-shirts into vibrant works of art. Drawing inspiration from themes like Tribal Art, Contemporary India, and Pop Art, participants showcased their creativity through unique designs.",
      poster: "https://res.cloudinary.com/dhy548whh/image/upload/v1734195839/kkwqhtgzev6fmuiwfs4m.jpg",
      video: "https://www.youtube.com/embed/GJaes7jUN_E?rel=0&modestbranding=1&enablejsapi=1", // Updated URL
    },
    {
      title: "Pixshala",
      logo: "https://res.cloudinary.com/dhy548whh/image/upload/v1734194805/bz6bvjuenyvhdskqoreo.png",
      description:
        "Pixshala: Enhance the Aesthetics was a two-day photography workshop held on October 14th and 15th, 2022, aimed at inspiring and educating aspiring photographers. On the first day, participants attended an insightful seminar on professional camera operation, gaining valuable knowledge on how to capture stunning images. The second day was filled with excitement as attendees showcased their newfound skills in a thrilling photography competition. With 200-300 participants, the event offered both learning and creative opportunities, leaving everyone with a deeper appreciation for the art of photography. It was a perfect blend of education, practice, and competition in the world of visual storytelling.",
      shortDescription:
        "Pixshala: A two-day photography workshop held on October 14th and 15th, 2022 with a seminar and competition for 200+ participants, fostering creativity and skills. With 200-300 participants, the event offered both learning and creative opportunities, leaving everyone with a deeper appreciation for the art of photography. It was a perfect blend of education, practice, and competition in the world of visual storytelling.",
      poster: "https://res.cloudinary.com/dhy548whh/image/upload/v1739046845/pixshala_poster_w5ziuc.png",
      video: "https://www.youtube.com/embed/qmpTfj__q_I?rel=0&modestbranding=1&enablejsapi=1", // Updated URL
    },
  ];
  

  return (
    <div>
      <div className="w-4/5 mx-auto border-t border-slate-400"></div>
      {events.map((event, index) => (
        <EventCard key={index} event={event} />
      ))}

      <div className="m-10 text-center bg-gradient-to-br from-slate-400 to-slate-600 bg-clip-text text-3xl font-medium tracking-tight text-transparent md:text-5xl font-poppins">
        More Events Coming Soon . . .
      </div>
    </div>
  );
}
