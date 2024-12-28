import React, { useEffect, useState } from "react";
import { TeamCard } from "../components/general/TeamCard";

export default function Team() {
  const [selectedOption, setSelectedOption] = useState("Executives");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  },[])

  const teamBatch2026 = [
    {
      name: "Jinesh Sanghvi Secretary",
      post: "Secretary",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364788/sdpejdmpeuwaluj2ktjn.png",
    },
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
      name: "Mrudul Mehta",
      post: "Sponsorship Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851120/tpbplhsmhnmffafrcglu.jpg",
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
    {
      name: "Vivek Gaharwar",
      post: "Photography Head",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1733399200/jtdmsezle9mbi1kc5u1z.png",
    },
    {
      name: "Himanshi Mandloi",
      post: "Information Manager",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729850581/zg19txqbirs5wulbmion.jpg",
    },
    {
      name: "Anuj Maheshram",
      post: "Public Relation Officer",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729870824/fpnftmlo8zjc2qglevzg.png",
    },
    {
      name: "Devansh Porwal",
      post: "Resource Manager",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729871076/i0fcwt2guhaievhrjw1u.png",
    },
  ];
  const teamBatch2025 = [
    {
      name: "Abbas Ujjainwala",
      image: "/Abbas_Sir.png",
    },
    {
      name: "Divyanshi Rawat",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364523/ounv915uq6td68ufkrta.png",
    },
    {
      name: "Ansh Jain",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364739/syebrfo0dcct6uw02lqi.png",
    },
    {
      name: "Churchill Jain",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364909/brdfviwcmqdhnxbmakip.jpg",
    },
    {
      name: "Kartik Baghel",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364262/dn0asjpmizuy5rx0rg7z.png",
    },
    {
      name: "Shivam Bhatia",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364262/ymq3u7jtrrrq9rrmuer9.png",
    },
    {
      name: "Akriti Pandey",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364541/fq4s3w9kqp1gvjjnt5xx.png",
    },
    {
      name: "Nishika Shahidhar",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364130/vztssoypf6sbdogr5c1p.png",
    },
    {
      name: "Shubhang Nigudkar",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364185/vxsbc2rb02tf1ky8vgav.png",
    },
    {
      name: "Aditi Bidkar",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364424/hmze0ok9yc1jgx3ab3xz.png",
    },
    {
      name: "Ashi Soni",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364503/jwwmz9yptlflm2sp6vpg.png",
    },
    {
      name: "Priyank Bhadoriya",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364424/fssst0shrgaohidtsqlo.png",
    },

    {
      name: "Sneha Mandloi",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364262/nhmbkcytp59rdlw8pxj2.png",
    },
    {
      name: "Aditee Pathak",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364767/y98vteghgymbq4chiu9c.png",
    },
    {
      name: "Ashwin Barua",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364262/vs3nhqlri5r8pvw2gpx9.png",
    },
    {
      name: "Arun Kumar",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1732364739/thkv3typjfvmoruzbuoq.png",
    },
  ];

  const teamBatch2027 = [
    {
      name: "Vibhuti Baldva",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851772/mxr7w9xz8fkmlk0jqvus.png",
    },
    {
      name: "Arpita Jain",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852589/ryktkpalxadk8n9akkk7.png",
    },

    {
      name: "Eklavya Singh Parihar",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852752/nbch2nr3d93z6yimiq8e.png",
    },

    {
      name: "Aadarsh Bharti",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852547/vtwlgahzqa1fl0aibvng.png",
    },
    {
      name: "Harsh Gharewal",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852354/gxdt6cf4dtlxbf2r8n83.png",
    },
    {
      name: "Drashti Dharamsey",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729851690/yzdjjqvca1vkew7uojoy.png",
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
      name: "Anuja Pathan",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729852486/miysrumrsn3m2tmtt1qy.png",
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
    {
      name: "Vaidansh Suryavanshi",
      post: "Coordinator",
      image:
        "https://res.cloudinary.com/dhy548whh/image/upload/v1729870896/t5jjndnyarz8i38zepz3.png",
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
    <div className="py-2 md:mt-20">
      
    <div className="md:hidden text-center py-2  bg-gradient-to-br from-slate-400 to-slate-800 bg-clip-text text-4xl font-medium tracking-tight text-transparent  font-poppins">
     Our Team
    </div>

    {/* Radio Button Group */}
    <div className=" flex w-full flex-wrap justify-center space-x-2 md:space-x-8 mb-4">
      {["Advisory Board","Executives","Coordinators"].map((option) => (
        <div key={option}>
          <input
            type="radio"
            className="btn-check hidden"
            name="eventOptions"
            id={option}
            value={option}
            autoComplete="off"
            checked={selectedOption === option}
            onChange={handleOptionChange}
          />
          <label
            className={`btn font-bold text-sm md:text-base cursor-pointer px-2 md:px-4 py-1 md:py-2 rounded-lg flex items-center transition duration-300 ${
              selectedOption === option
                ? "bg-cyan-500 text-white border-2 border-cyan-500"
                : "bg-white text-cyan-800 border-2 border-opacity-50 border-cyan-500 hover:text-white hover:bg-cyan-500"
            }`}
            htmlFor={option}
          >
            {option}
          </label>
        </div>
      ))}
    </div>
    
      {/* Scrollable Team Section */}
      <div className="pt-4 rounded-2xl pb-12 overflow-y-auto h-screen bg-gradient-to-r from-slate-950 to-slate-800">
        {selectedOption === "Advisory Board" && (
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            {teamBatch2025.map((member, index) => (
              <TeamCard key={index} name={member.name} image={member.image} />
            ))}
          </div>
        )}
        {selectedOption === "Executives" && (
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            {teamBatch2026.map((member, index) => (
              <TeamCard key={index} name={member.name} image={member.image} />
            ))}
          </div>
        )}
        {selectedOption === "Coordinators" && (
          <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
            {teamBatch2027.map((member, index) => (
              <TeamCard key={index} name={member.name} image={member.image} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
  
}
