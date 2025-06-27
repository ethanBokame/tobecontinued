import { Button } from "@/components/ui/button"

export default function Component2() {
  return (
    <div
      className="bg-background flex w-fit sm:hidden mx-auto items-center rounded-full border p-1 shadow-sm">
      <div className="flex -space-x-3">
        <img
          className="ring-background rounded-full ring-2"
          src="https://lh3.googleusercontent.com/a/ACg8ocJfUOsyaHrNMqDFca8oUiX49xIGqhsYHfFjpYg_zcS1RduOyA=s96-c"
          width={40}
          height={40}
          alt="Avatar 01" />
        <img
          className="ring-background rounded-full ring-2"
          src="https://lh3.googleusercontent.com/a/ACg8ocKOg-P1u3YiuGd4RiyV_ioCI4ABWVV0HG3RLFdhaPhW_bhd5NY0=s96-c"
          width={40}
          height={40}
          alt="Avatar 02" />
        <img
          className="ring-background rounded-full ring-2"
          src="https://lh3.googleusercontent.com/a/ACg8ocJc35nBUbWun0kzYgjFLHJguBdlVXil8RzxUW5g7tQjSFuRU34-=s96-c"
          width={40}
          height={40}
          alt="Avatar 03" />
        <img
          className="ring-background rounded-full ring-2"
          src="https://lh3.googleusercontent.com/a/ACg8ocJhey8BESevXyl1-F6fNxqePiMXVoKqWmKh4sTU4xi5ZVAAm2Zr=s96-c"
          width={40}
          height={40}
          alt="Avatar 04" />
      </div>
      <Button
        variant="secondary"
        className="text-muted-foreground hover:text-foreground flex items-center justify-center rounded-full bg-transparent px-3 text-xs shadow-none hover:bg-transparent">
        +9
      </Button>
    </div>
  );
}
