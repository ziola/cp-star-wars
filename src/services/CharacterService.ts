export type Character = {
  url: string;
  name: string;
  height: string;
  mass: string;
  hairColor: string;
  skinColor: string;
  eyeColor: string;
  birthYear: string;
};

export async function getCharacter(url: string): Promise<Character> {
  const people = await fetch(url);

  const rawCharacter = await people.json();
  return {
    url,
    name: rawCharacter.name,
    height: rawCharacter.height,
    mass: rawCharacter.mass,
    hairColor: rawCharacter.hair_color,
    skinColor: rawCharacter.skin_color,
    eyeColor: rawCharacter.eye_color,
    birthYear: rawCharacter.birth_year,
  };
}
