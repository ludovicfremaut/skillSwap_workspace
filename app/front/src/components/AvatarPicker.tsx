import { useState, useEffect } from "react";

const styles = ["adventurer", "avataaars", "big-smile", "open-peeps", "personas"];

export default function AvatarPicker({
  selectedUrl,
  onSelect,
}: {
  selectedUrl: string | null;
  onSelect: (url: string) => void;
}) {
  const [avatars, setAvatars] = useState<
    { seed: string; style: string; url: string }[]
  >([]);

  useEffect(() => {
    const seeds = generateSeeds(15);
    const newAvatars = seeds.map((seed) => {
      const randomStyle = styles[Math.floor(Math.random() * styles.length)];
      const url = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(seed)}`;
      return { seed, style: randomStyle, url };
    });
    setAvatars(newAvatars);
  }, []);

  return (
    <div>
      <p className="text-lg font-semibold mb-4 text-center">Choisis ton avatar :</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {avatars.map(({ seed, style, url }) => (
          <img
            key={`${style}-${seed}`}
            src={url}
            alt={`Avatar ${seed} style ${style}`}
            onClick={() => onSelect(url)}
            className={`w-full aspect-square rounded-md cursor-pointer border ${
              selectedUrl === url
                ? "border-4 border-blue-500"
                : "border-gray-300"
            } hover:scale-105 transition-transform duration-150`}
          />
        ))}
      </div>
    </div>
  );
}

function generateRandomSeed(length = 8) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateSeeds(count = 8) {
  const seeds: string[] = [];
  for (let i = 0; i < count; i++) {
    seeds.push(generateRandomSeed());
  }
  return seeds;
}
