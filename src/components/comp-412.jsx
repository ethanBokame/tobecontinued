export default function People1() {
  return (
    <div
      className="bg-background w-fit mx-auto hidden sm:flex items-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-1.5">
        <img
          className="ring-background rounded-full ring-1"
          src="https://lh3.googleusercontent.com/a/ACg8ocJfUOsyaHrNMqDFca8oUiX49xIGqhsYHfFjpYg_zcS1RduOyA=s96-c"
          width={20}
          height={20}
          alt="Avatar 01" />
        <img
          className="ring-background rounded-full ring-1"
          src="https://lh3.googleusercontent.com/a/ACg8ocKOg-P1u3YiuGd4RiyV_ioCI4ABWVV0HG3RLFdhaPhW_bhd5NY0=s96-c"
          width={20}
          height={20}
          alt="Avatar 02" />
        <img
          className="ring-background rounded-full ring-1"
          src="https://lh3.googleusercontent.com/a/ACg8ocJc35nBUbWun0kzYgjFLHJguBdlVXil8RzxUW5g7tQjSFuRU34-=s96-c"
          width={20}
          height={20}
          alt="Avatar 03" />
        <img
          className="ring-background rounded-full ring-1"
          src="https://lh3.googleusercontent.com/a/ACg8ocJhey8BESevXyl1-F6fNxqePiMXVoKqWmKh4sTU4xi5ZVAAm2Zr=s96-c"
          width={20}
          height={20}
          alt="Avatar 04" />
      </div>
      <p className="text-muted-foreground px-2 text-xs">
        Déjà adoptée par <strong className="text-foreground font-medium">plus de 20</strong>{" "}
        fans de pop culture.
      </p>
    </div>
  );
}
