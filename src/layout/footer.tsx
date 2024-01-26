import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import bgImage from "~/banner-bg.jpg";

export default function Footer() {
    return (
      <footer className="w-full flex justify-center" style={{padding: "20px 0 60px 0", backgroundImage: `url(${bgImage.src})`, borderRadius: "150px 150px 0 0"}}>
        <div className="flex flex-col gap-5 text-center w-1/2 text-white">
          <p>Designed by <Link href="https://templatemo.com/">TemplateMo</Link></p>
          <div className="flex flex-col gap-2">
            <p>Coded by</p>
            <div className="flex gap-4 justify-center">
              <Link href="https://github.com/Univercee"><FontAwesomeIcon icon={faGithub} size="2x"></FontAwesomeIcon></Link>
              <Link href="https://linkedin.com/in/aleksandr-ostromogilskii-769315205/"><FontAwesomeIcon icon={faLinkedin} size="2x"></FontAwesomeIcon></Link>
            </div>
          </div>
        </div>
      </footer>
    );
}
  