/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("events").del();

  // Inserts seed entries
  await knex("events").insert([
    {
      event_name: "SEPIA",
      description:
        "Sepia:A Whirl Of Visuals was an inspiring event held on September 28, 2024;organized by Pratibimb, the vibrant Art and Photography Club of SGSITS, Indore. With around 500 attendees, including 250 participants and 80 teams, the workshop offered a perfect fusion of photography techniques and artistic creativity. Participants explored new photography methods and delved into the many facets of art, transforming their understanding of both fields. The workshop provided an immersive experience, blending education and creativity, making it an unforgettable journey for all involved.",
      start_date: "2024-11-20 09:00:00",
      location: "SGSITS,Indore",
      status: "PAST", // Corrected from 'UPCOMIG'
      ticket_price: 200,
      event_teaser: "https://youtu.be/G3LcD564KLY?si=DWfphGdzA5ZzyBMx",
      event_aftermovie: null,
      event_logo: "tech_expo_logo.png",
      event_poster: "tech_expo_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "FABRICA",
      description:
        "Fabrica: Flares of Fibre was an inspiring T-shirt painting workshop held on September 23, 2023, where over 200 participants spent 9 hours turning blank T-shirts into vibrant works of art. Drawing inspiration from themes like Tribal Art, Contemporary India, and Pop Art, participants showcased their creativity through unique designs. The workshop was the epitome of artistic expression, offering a chance to not only enhance painting skills but also leave with a personalized piece of wearable art. It was a day full of creativity, culture, and hands-on fun.",
      start_date: "2024-09-23 15:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 120,
      event_teaser: "https://youtu.be/GJaes7jUN_E?si=5R2uXiSKFCGb46Dq",
      event_aftermovie: null,
      event_logo: "music_fest_logo.png",
      event_poster: "music_fest_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "PIXSHALA",
      description: "Pixshala: Enhance the Aesthetics was a two-day photography workshop held on October 14th and 15th, 2022, aimed at inspiring and educating aspiring photographers. On the first day, participants attended an insightful seminar on professional camera operation, gaining valuable knowledge on how to capture stunning images. The second day was filled with excitement as attendees showcased their newfound skills in a thrilling photography competition. With 200-300 participants, the event offered both learning and creative opportunities, leaving everyone with a deeper appreciation for the art of photography. It was a perfect blend of education, practice, and competition in the world of visual storytelling.",
      start_date: "2024-10-14 18:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 100,
      event_teaser: "https://youtu.be/r2Y7fTpt7ys?si=KqjHvsSf1uRKl-WX",
      event_aftermovie: "https://youtu.be/qmpTfj__q_I?si=7hvTXoDq46xVmRgm",
      event_logo: "pitch_night_logo.png",
      event_poster: "pitch_night_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "STREETSCAPE",
      description:
        "Streetscape: The Tint Avenue was a grand 30-hour road painting event that brought together around 800 enthusiastic participants, who competed to create stunning artworks on the Library Road, SGSITS, from February 3 to 4, 2024. The event, organized by Club Pratibimb, not only celebrated creativity but also secured a place in the prestigious Official Book of Records in London. Participants, inspired by various themes, showcased their artistic skills, transforming the road into a vibrant, colorful masterpiece. With its jubilant atmosphere and record-breaking achievement, Streetscape was a truly unforgettable celebration of art and community spirit",
      start_date: "2024-02-03 12:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 100,
      event_teaser:"https://youtu.be/G3LcD564KLY?si=DWfphGdzA5ZzyBMx",
      event_aftermovie:"https://youtu.be/ucem4JGCIk0?si=AVKxYAeS4pVD_Mqe",
      event_logo: "https://res.cloudinary.com/dhy548whh/image/upload/v1733767725/irgncmnchscaawu4otrh.png",
      event_poster: "https://res.cloudinary.com/dhy548whh/image/upload/v1733767739/o4r5q4deccmkurcubktm.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      // record_logo = "https://res.cloudinary.com/dgc7xsrcx/image/upload/v1733930857/hsyx3jpvrfeorjqfmiv9.png"
    },
    {
      event_name: "GRAFFATHON",
      description:
        "Graffathon: Back to Rituals was a captivating 30-hour wall painting marathon held on Director’s Office Road, SGSITS, on March 11th and 12th, 2012. With 500 to 1000 eager participants, the event transformed ordinary walls into vibrant, living murals. Themes ranging from urban art to innovative concepts for social causes and technology brought the walls to life, each brushstroke telling a story. As the two-day event unfolded, the air was filled with a magical energy, where creativity flowed freely, and the ordinary became extraordinary—a true celebration of imagination and purpose",
      start_date: "2012-03-11 10:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 500,
      event_teaser: "https://youtu.be/lSklAIQn_64?si=W6xyHdjSMXPBXTNN",
      event_aftermovie: "https://youtu.be/oa-yFWUjEp0?si=vUb8aUIdt2Tqm1nM",
      event_logo: "fashion_week_logo.png",
      event_poster: "fashion_week_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      // record_logo = "https://res.cloudinary.com/dgc7xsrcx/image/upload/v1733931102/fow8o0jj2kfnd2kjgaf7.jpg"
    },
    {
      event_name: "GRAFFATHON 2.0",
      description:
        "Graffathon: Back to Rituals was a captivating 30-hour wall painting marathon held on Director’s Office Road, SGSITS, on March 11th and 12th, 2012. With 500 to 1000 eager participants, the event transformed ordinary walls into vibrant, living murals. Themes ranging from urban art to innovative concepts for social causes and technology brought the walls to life, each brushstroke telling a story. As the two-day event unfolded, the air was filled with a magical energy, where creativity flowed freely, and the ordinary became extraordinary—a true celebration of imagination and purpose",
      start_date: "2012-02-02 10:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 500,
      event_teaser: "https://youtu.be/O_sanO7AQFo?si=rI--nve9L6kHtjLC",
      event_aftermovie: "https://youtu.be/Z3XTYr_6yec?si=r-HwmrzO9RdXrUiP",
      event_logo: "fashion_week_logo.png",
      event_poster: "fashion_week_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
      // record_logo = "https://res.cloudinary.com/dgc7xsrcx/image/upload/v1733932259/zwapycnwfzunel1isefm.jpg"
    },
  ]);
};
