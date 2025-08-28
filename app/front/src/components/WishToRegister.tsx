import { Link } from "react-router-dom";
import { Button } from "./ui/Button";

export default function WishToRegister() {
  return (
    <div className="relative bg-[url('/vitaly-gariev-kjK9z5vayYg-unsplash.jpg')] bg-cover bg-center min-h-[350px] w-full flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-start justify-center pl-2">
        <div className="bg-white/60 px-5 py-4 rounded-xl flex flex-col items-center gap-2 w-60">
          <span className="text-secondary italic text-center">
            "J'ai toujours eu envie de partager mon savoir et mes connaissance
            aux autres&nbsp;!"
          </span>
          <Link to="/register">
          <Button className="bg-accent text-white px-6 py-2 justify-center text-center text-lg font-semibold mt-4">
            Je m'incris ici
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
