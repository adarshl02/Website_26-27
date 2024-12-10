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
      description: "A major tech expo showcasing innovative technologies.",
      start_date: "2024-11-20 09:00:00",
      location: "SGSITS,Indore",
      status: "PAST", // Corrected from 'UPCOMIG'
      ticket_price: 200,
      event_teaser:"https://youtu.be/G3LcD564KLY?si=DWfphGdzA5ZzyBMx",
      event_aftermovie:null,
      event_logo: "tech_expo_logo.png",
      event_poster: "tech_expo_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "FABRICA",
      description: "An outdoor music festival featuring top artists.",
      start_date: "2024-09-10 15:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 120,
      event_teaser:"https://youtu.be/GJaes7jUN_E?si=5R2uXiSKFCGb46Dq",
      event_aftermovie:null,
      event_logo: "music_fest_logo.png",
      event_poster: "music_fest_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "PIXSHALA",
      description: "An event for startups to pitch their ideas to investors.",
      start_date: "2024-12-05 18:00:00",
      location: "SGSITS,Indore",
      status: "PAST", // Corrected from 'UPCOMIG'
      ticket_price: 100,
      event_teaser:"https://youtu.be/r2Y7fTpt7ys?si=KqjHvsSf1uRKl-WX",
      event_aftermovie:"https://youtu.be/qmpTfj__q_I?si=7hvTXoDq46xVmRgm",
      event_logo: "pitch_night_logo.png",
      event_poster: "pitch_night_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "STREETSCAPE",
      description: "A celebration of street food and gourmet food trucks.",
      start_date: "2024-07-15 12:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 100,
      event_teaser:"https://youtu.be/G3LcD564KLY?si=DWfphGdzA5ZzyBMx",
      event_aftermovie:"https://youtu.be/ucem4JGCIk0?si=AVKxYAeS4pVD_Mqe",
      event_logo: "https://res.cloudinary.com/dhy548whh/image/upload/v1733767725/irgncmnchscaawu4otrh.png",
      event_poster: "https://res.cloudinary.com/dhy548whh/image/upload/v1733767739/o4r5q4deccmkurcubktm.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    },
    {
      event_name: "GRAFFATHON",
      description: "An exclusive fashion event featuring top designers.",
      start_date: "2024-10-01 10:00:00",
      location: "SGSITS,Indore",
      status: "PAST",
      ticket_price: 300,
      event_teaser:"https://youtu.be/lSklAIQn_64?si=W6xyHdjSMXPBXTNN",
      event_aftermovie:"https://youtu.be/oa-yFWUjEp0?si=vUb8aUIdt2Tqm1nM",
      event_logo: "fashion_week_logo.png",
      event_poster: "fashion_week_poster.jpg",
      created_at: knex.fn.now(),
      updated_at: knex.fn.now(),
    }
  ])
}