import { SponsorImageCard } from "../components/general/SponsorImageCard";


const sponsorImages = [
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853314/qp4hbpnczrphhzzpgyeu.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853309/zixb1aqkle053isqkjs5.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853288/nltjuttqvufeol3xx2eb.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853280/qszjytiayrnmi8mdrh4y.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853273/en11aldzadpg9pjmq2q7.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853267/kprvtiq8jeygwgoiqodl.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853255/tpmssgnkbsxazz7bgsma.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853247/hzbf6xlcfmddgwmu0c0a.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853239/sxylzfaqyxw7dfuxuavx.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853227/llw6ealybwm5a7dumgod.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853219/avl8jsbmhwmwdlrbzxeb.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853210/yaps8njtlsype0ngyxqf.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853202/dzv84dz27tqrgkpryprh.png' },
  { img: 'https://res.cloudinary.com/dhy548whh/image/upload/v1729853196/fbherulhg8iel8mxfoyn.png' },
];

export default function Sponsors() {
 
  return (
   <>
     <div className=" text-center font-bold text-4xl md:text-8xl mt-20 m-2 bg-gradient-to-r from-blue-600 to-teal-300 bg-clip-text text-transparent ">
       Our Sponsors
      </div>

      <div className="flex justify-center gap-6 md:gap-12 flex-wrap">
        {sponsorImages.map((member, index) => (
          <SponsorImageCard key={index} image={member.img} />
        ))}
      </div>
   </>
  );
}
