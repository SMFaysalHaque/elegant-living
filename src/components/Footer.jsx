import MessageIcon from "./svgs/MessageIcon";
import PhoneIcon from "./svgs/PhoneIcon";

const socialMediaImgs = [
  {
    name: "facebook",
    url: "/assets/images/social-media/facebook-app-symbol (1) 1.png",
  },
  {
    name: "youtube",
    url: "/assets/images/social-media/youtube 1.png",
  },
  {
    name: "instagram",
    url: "/assets/images/social-media/instagram 1.png",
  },
  {
    name: "linkedin",
    url: "/assets/images/social-media/linkedin 1.png",
  },
];

export default function Footer() {
  return (
    <footer className="bg-transparent text-white lg:py-16 py-8 xl:px-0 px-4">
      <div className="max-w-[1024px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
        <div>
          <h2 className="font-tangerine font-bold text-4xl text-primary mb-3">
            Elegant Living
          </h2>
        </div>

        <div>
          <h3 className="font-semibold leading-[100%] lg:mb-7 mb-5">
            Social Media
          </h3>
          <ul className="flex flex-col lg:gap-7 gap-5">
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">Facebook</a>
            </li>
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">Youtube</a>
            </li>
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">Instagram</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold leading-[100%] lg:mb-7 mb-5">
            Why Elegant Living?
          </h3>
          <ul className="flex flex-col lg:gap-7 gap-5">
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">FAQ</a>
            </li>
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">Authors</a>
            </li>
            <li className="text-sm leading-[100%] whitespace-nowrap">
              <a href="#">Books</a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold leading-[100%] lg:mb-7 mb-5 whitespace-nowrap">
            Elegant Living Furniture Limited
          </h3>
          <ul className="flex flex-col lg:gap-7 gap-5">
            <li className="flex flex-col text-sm leading-[100%] whitespace-nowrap">
              <p className="mb-7">105, ECB Tower (4th floor)</p>
              <p>Dhaka Cantt., Dhaka-1230</p>
            </li>
            <li className="flex items-center text-sm leading-[100%] whitespace-nowrap">
              <PhoneIcon />
              +880141111111
            </li>
            <li className="flex items-center text-sm leading-[100%] whitespace-nowrap">
              <MessageIcon />
              hello@elegant_living.com.bd
            </li>
            <li className="flex gap-5">
              {socialMediaImgs.map((img) => (
                <div key={img.name}>
                  <img src={img.url} alt={img.name} className="w-5 h-5" />
                </div>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
