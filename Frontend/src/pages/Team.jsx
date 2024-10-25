import React from "react";
import { TeamCard } from "../components/general/TeamCard";

export default function Team() {
  const teamBatch2026 = [
    {
      name: "Adarsh Landge",
      post: "Web Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850929/zjrpk72glgbozuqczh1k.jpg",
    },
    {
      name: "Animesh Bhawsar",
      post: "Joint Secretary",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850659/tgn8fgwnvb7v9xamomad.jpg",
    },
    {
      name: "Riya Chaturvedi",
      post: "Joint Secretary",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850721/uspif3cojsa5j0vfpsbp.jpg",
    },
    {
      name: "Pranav Makwana",
      post: "Treasurer",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850833/iwehabzjkvxb3dski6wj.jpg",
    },
    {
      name: "Aishwarya Choubey",
      post: "Creative Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850963/pbqtnz0aiwwbcnxllkvg.png",
    },
    {
      name: "Daksh Verma",
      post: "Creative Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850764/unuugjvuyms4xdp2mu4z.jpg",
    },
    {
      name: "Devansh Ramdurgekar",
      post: "Design Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851171/hq1gchhxtmamaqfbwsvc.jpg",
    },
    {
      name: "Ranu Nagar",
      post: "Photography Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850889/fgkt9xdoe4to0sfjaey6.jpg",
    },
    { name: "Vivek Gaharwar", post: "Photography Head" },
    {
      name: "Himanshi Mandloi",
      post: "Information Manager",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850581/zg19txqbirs5wulbmion.jpg",
    },
    { name: "Anuj Maheshram", post: "Public Relation Officer" },
    {
      name: "Mrudul Mehta",
      post: "Sponsorship Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851120/tpbplhsmhnmffafrcglu.jpg",
    },
    { name: "Devansh Porwal", post: "Resource Manager" },
    { name: "Utkarsh Sahu", post: "Resource Manager" },
  ];

  const teamBatch2027 = [
    {
      name: "Anuja Pathan",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852486/miysrumrsn3m2tmtt1qy.png",
    },
    {
      name: "Arpita Jain",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852589/ryktkpalxadk8n9akkk7.png",
    },
    {
      name: "Drashti Dharamsey",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851690/yzdjjqvca1vkew7uojoy.png",
    },
    {
      name: "Eklavya Singh Parihar",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852752/nbch2nr3d93z6yimiq8e.png",
    },
    {
      name: "Harsh Gharewal",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852354/gxdt6cf4dtlxbf2r8n83.png",
    },
    {
      name: "Harshita Balchandani",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852894/ewxwmbidlhw0k7c33wn3.png",
    },
    {
      name: "Ibadulla Khilji",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851860/j1mi1mln3qrfln0egat8.png",
    },
    {
      name: "Ishika Ganatra",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852397/okqnan2xwurfqpbp0c7h.png",
    },
    {
      name: "Janvi Rathi",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852200/xvdm6x5ssv3ajktvrbzq.png",
    },
    {
      name: "Kavya Jain",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851467/cj7r34wgsbmcyeu1pg8y.png",
    },
    {
      name: "Manas Kolte",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852152/fhbujxqi0lrxcptmdaa0.png",
    },
    {
      name: "Manish Verma",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851822/rvdezuzhyckmbhx6jnjn.jpg",
    },
    {
      name: "Mohit Wadhwani",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851502/hhx2wyh0aebs5uq0xr3v.jpg",
    },
    {
      name: "Parth Kalra",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852090/pukcgtmfniqqrpvepw1n.png",
    },
    {
      name: "Priyanshi Ratnani",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851424/mltsssvcedopdh9fjxgh.jpg",
    },
    {
      name: "Rajkaran Gond",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851547/kjxuzsfwqnp82rwjdv6m.png",
    },
    {
      name: "Rani Bachani",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852701/ee5aiydxo4d3fnagvckv.png",
    },
    {
      name: "Rohit Mandeliya",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852260/memz9pspvjiq8b2a26ls.png",
    },
    {
      name: "Rudransh Namdeo",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852647/k6jpr4tfugnef5v8ylry.png",
    },
    {
      name: "Sahil Chauganjkar",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851728/mkjs8lgcakyjfgtvclrj.jpg",
    },
    {
      name: "Stuti Bafna",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851596/oxhjarcykstjtacrhwbm.jpg",
    },
    { name: "Vaidansh Suryavanshi", post: "Coordinator" },
    {
      name: "Vibhuti Baldva",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851772/mxr7w9xz8fkmlk0jqvus.png",
    },
    {
      name: "Aadarsh Bharti",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852547/vtwlgahzqa1fl0aibvng.png",
    },
    {
      name: "Adityaraj Panchal",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852442/hy2wqpt5ha6gpsjaa1ug.png",
    },
    {
      name: "Ananya Tripathi",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852300/iaqrqyeuaeq7puq5kuab.png",
    },
  ];

  return (
    <>
      <div className=" text-start font-bold text-8xl mt-20 m-2 bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent ">
        Batch 2026
      </div>

      <div className="flex justify-center gap-12 flex-wrap">
        {teamBatch2026.map((member, index) => (
          <TeamCard key={index} name={member.name} post={member.post} />
        ))}
      </div>

      <div className=" text-start font-bold text-8xl mt-20 m-2 bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent ">
        Batch 2027
      </div>

      <div className="flex justify-center gap-12 flex-wrap">
        {teamBatch2027.map((member, index) => (
          <TeamCard key={index} name={member.name} post={member.post} />
        ))}
      </div>
    </>
  );
}
