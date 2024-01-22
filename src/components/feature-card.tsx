import Image from "next/image";

export default function FeatureCard({text, iconSrc}: {text: string, iconSrc: string}) {
    return (
      <div className="feature-card h-52  py-5 px-16 bg-white rounded-xl flex flex-col justify-center items-center gap-5">
        <div className="rounded-full bg-primary min-h-20 aspect-square flex items-center justify-center">
            <img src={iconSrc} className="w-1/2 aspect-square" alt="Feature icon"/>
        </div>
        <p className="uppercase text-lg font-bold text-center text-nowrap">{text}</p>
      </div>
    );
}
  