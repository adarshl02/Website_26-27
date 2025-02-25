/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("events").del(); // Clears existing data

  // Inserts seed entries
  await knex("events").insert([
    {
      event_name: "SEPIA",
      description:
        "Sepia:A Whirl Of Visuals was an inspiring event held on September 28, 2024; organized by Pratibimb, the vibrant Art and Photography Club of SGSITS, Indore. With around 500 attendees, including 250 participants and 80 teams, the workshop offered a perfect fusion of photography techniques and artistic creativity.",
      start_date: "2024-11-20 09:00:00",
      location: "SGSITS, Indore",
      status: "PAST",
      ticket_price: 200,
      event_teaser: "https://youtu.be/G3LcD564KLY?si=DWfphGdzA5ZzyBMx",
      event_aftermovie: null,
      event_logo:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1734028288/p226bs61jpgbt6yic4pe.png",
      event_poster:
        "https://drive.google.com/file/d/1_bPFVi05iESgJ0U_NZ7W9uPAbPar5yXQ/view?usp=sharing",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "FABRICA",
      description:
        "Fabrica: Flares of Fibre was an inspiring T-shirt painting workshop held on September 23, 2023, where over 200 participants spent 9 hours turning blank T-shirts into vibrant works of art.",
      start_date: "2024-09-23 15:00:00",
      location: "SGSITS, Indore",
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
      description:
        "Pixshala: Enhance the Aesthetics was a two-day photography workshop held on October 14th and 15th, 2022, aimed at inspiring and educating aspiring photographers.",
      start_date: "2025-03-03 18:00:00",
      location: "SGSITS, Indore",
      status: "ONGOING",
      ticket_price: 200,
      event_teaser: "https://youtu.be/r2Y7fTpt7ys?si=KqjHvsSf1uRKl-WX",
      event_aftermovie: "https://youtu.be/qmpTfj__q_I?si=7hvTXoDq46xVmRgm",
      event_logo:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1734029243/ljrkccmc4pfmsk16tcvh.png",
      event_poster: "pitch_night_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
  ]);
}
