import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/Card";
import { Button } from "./ui/Button";
import type { IUser } from "@/types/user";
import { Link } from "react-router-dom";

export function ProfileCard({ user }: { user: IUser }) {
  return (
    <Card className=" w-80 h-full mx-auto bg-accent">
      <CardContent className="flex flex-col items-stretch gap-4">
        <div className="flex-shrink-0 h-50">
          <img
            src={user.profile_picture}
            alt={user.firstname}
            className="object-cover rounded h-full w-full"
          />
        </div>
        <div className="flex flex-col justify-between flex-1">
          <CardHeader className="px-0 pb-2">
            <CardTitle>
              {user.firstname} {user.lastname}
            </CardTitle>
            <CardDescription>{user.city}</CardDescription>

            <div className="flex flex-wrap w-full gap-2 pt-2">
              {user.skills.map((skill) => (
                <Button
                  key={skill.id}
                  className="h-6 bg-secondary text-white text-sm px-2 py-1 rounded"
                >
                  {skill.name}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="text-white text-sm">{user.description}</div>
          </CardContent>
          <CardFooter className="px-0 pt-2">
            <Link
              to={`/profilepage/${user.id}`} // l
              className="text-blue-500 hover:underline"
            >
              Voir le profil
            </Link>
          </CardFooter>
        </div>
      </CardContent>
    </Card>
  );
}
