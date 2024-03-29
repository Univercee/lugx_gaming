import BreadcrumbsHeader from "@/components/layout/breadcrumbs-header";
import Link from "next/link";


export default function Page() {
  const title = "Contacts";
  return (
    <div>
    <BreadcrumbsHeader title={title}></BreadcrumbsHeader>
    <div className="grow wrapper">
      <div className="my-16 max-md:px-0">
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-16 my-16">
          <div className="bg-muted px-12 py-16 rounded-3xl flex flex-col gap-8">
            <div>
              <h6 className="text-accent font-semibold">CONTACT ME</h6>
              <h2 className="font-bold text-3xl">Say Hello!</h2>
            </div>
            <div>
              <p>Hello! Thank you for visiting my portfolio site. If you have any questions, collaboration proposals, or just want to connect, feel free to reach out. I'm always open to new projects and exciting ideas.</p>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-bold">Linked In</p>
                <Link className="text-primary hover:underline" href="https://www.linkedin.com/in/aleksandr-ostromogilskii-769315205/">Aleksandr Ostromogilskii</Link>
              </div>
              <div>
                <p className="font-bold">Email</p>
                <Link href="mailto:aleksandr.ostromogilskii@gmail.com" className="break-words text-primary hover:underline">aleksandr.ostromogilskii@gmail.com</Link>
              </div>
              <div>
                <p className="font-bold">Phone</p>
                <Link href="tel:+37441778105" className="break-words text-primary hover:underline">+374-41-778-105</Link>
              </div>
            </div>
          </div>
          <div>
            <form action="" className="feedback-form gap-4">
              <input name="name" type="text" className="border p-4 rounded-3xl" placeholder="Your name"/>
              <input name="surname" type="text" className="border p-4 rounded-3xl" placeholder="Your Surname"/>
              <input name="email" type="text" className="border p-4 rounded-3xl" placeholder="Your E-mail"/>
              <input name="subject" type="text" className="border p-4 rounded-3xl" placeholder="Subject"/>
              <textarea name="message" className="border p-4 rounded-3xl" style={{gridArea: "message"}} placeholder="Your Message"></textarea>
              <input className="button-accented cursor-pointer" type="submit" style={{gridArea: "submit"}} value="Send Message Now"/>
            </form>
          </div>
        </main>
      </div>
    </div>
  </div>
  );
}
  