"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

import { Button } from "./Button";
import { ProfileCard } from "../ProfileCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAsyncState } from "@/hooks/useAsyncState";
import { getRandomUsers } from "@/services/user.service";
import type { IUser } from "@/types/user";

// Ajout du type props
type CarouselPluginProps = {
  className?: string;
};

export function CarouselPlugin({ className = "" }: CarouselPluginProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );

  const [users, setUsers] = useState<IUser[]>([]);
  const { loading, setLoading, error, setError, reset } = useAsyncState();

  useEffect(() => {
    const fetchUsers = async () => {
      reset();
      try {
        setLoading(true);
        const users = await getRandomUsers();
        setUsers(users);
      } catch (error) {
        setError("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p className="text-white">Chargement du profil…</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!users) return null;

  return (
    <section className={`bg-primary p-6 ${className}`}>
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-xs mx-auto relative p-1 bg-primary text-white"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {Array.isArray(users) &&
            users.map((user: any, index) => (
              <CarouselItem
                key={user.id || index}
                className="flex justify-center"
              >
                <div className="p-1">
                  <ProfileCard user={user} />
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="ml-2 text-accent" />
        <CarouselNext className="mr-2 text-accent" />
      </Carousel>
      <div className="flex justify-center mt-6">
        <Link to="/search" className="no-underline">
          <Button className="bg-accent hover:bg-secondary text-white px-6 py-2 text-lg font-semibold">
            Découvrir les profils
          </Button>
        </Link>
      </div>
    </section>
  );
}
