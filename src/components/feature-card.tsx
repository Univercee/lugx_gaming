import Image from "next/image";

export default function FeatureCard({text, iconSrc}: {text: string, iconSrc: string}) {
    return (
      <div className="w-full h-full feature-card py-5 px-16 bg-white rounded-xl flex flex-col justify-center items-center gap-5">
        <div className="rounded-full bg-primary w-1/2 min-w-20 aspect-square flex items-center justify-center">
            <img src={iconSrc} className="w-1/2" alt="Feature icon"/>
        </div>
        <p className="uppercase text-lg font-bold min-w-max">{text}</p>
      </div>
    );
}
  