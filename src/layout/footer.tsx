import bgImage from "~/banner-bg.jpg";

export default function Footer() {
    return (
      <footer className="w-full flex justify-center" style={{padding: "20px 0 60px 0", backgroundImage: `url(${bgImage.src})`, borderRadius: "150px 150px 0 0"}}>
        <div className="text-center w-1/2">
          <p className="text-white">Copyright © 2048 LUGX Gaming Company. All rights reserved.</p>
          <p className="text-white">Design: TemplateMo</p>
        </div>
      </footer>
    );
}
  