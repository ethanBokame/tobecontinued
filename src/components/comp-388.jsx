import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Textarea } from "@/components/ui/textarea"
import { Headset } from 'lucide-react';
import { useState } from 'react';

export default function Feedback() {
  const [open, setOpen] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "4fc53e73-c4eb-4def-99a1-a0b26c9c0ad7");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
      setOpen(false); // Ferme la modal après un envoi réussi
      event.target.reset(); // Réinitialise le formulaire
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="hidden lg:flex ml-4 h-[45px]">
            <Headset />
            Assistance
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <h2 className="mb-2 text-sm font-semibold">
            Une suggestion ?
          </h2>
          <form onSubmit={onSubmit} className="space-y-3">
            <Textarea
              id="feedback"
              name="feedback"
              placeholder="Comment pourrions-nous améliorer ToBeContinued ?"
              aria-label="Send feedback"
            />
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button type="submit" size="sm">Envoyer</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
