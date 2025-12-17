import { Header } from '@/components/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

const wuduSteps = [
  { title: "Intention (Niyyah)", description: "Make the intention in your heart to perform Wudu for prayer.", imageId: "wudu-step-1" },
  { title: "Say 'Bismillah'", description: "Begin by saying 'In the name of Allah'.", imageId: "wudu-step-2" },
  { title: "Wash Hands", description: "Wash both hands up to the wrists three times, starting with the right.", imageId: "wudu-step-3" },
  { title: "Rinse Mouth", description: "Take water into your mouth and rinse it three times.", imageId: "wudu-step-4" },
  { title: "Cleanse Nose", description: "Gently sniff water into your nostrils and blow it out three times.", imageId: "wudu-step-5" },
  { title: "Wash Face", description: "Wash your face from the hairline to the chin and from ear to ear three times.", imageId: "wudu-step-6" },
  { title: "Wash Arms", description: "Wash your right arm, then your left, from the fingertips to the elbow three times.", imageId: "wudu-step-7" },
  { title: "Wipe Head", description: "Wipe your head with wet hands from front to back and back to front once.", imageId: "wudu-step-8" },
  { title: "Wash Feet", description: "Wash your right foot, then your left, up to the ankles three times.", imageId: "wudu-step-9" },
];

const salahSteps = [
    { title: "Takbir", description: "Stand facing the Qibla, make your intention, and say 'Allahu Akbar' while raising your hands to your ears.", imageId: "salah-step-1" },
    { title: "Qiyam", description: "Place your right hand over your left on your chest and recite Surah Al-Fatiha and another Surah.", imageId: "salah-step-2" },
    { title: "Ruku", description: "Bow down, saying 'Allahu Akbar'. Keep your back straight and say 'Subhana Rabbiyal Adhim' three times.", imageId: "salah-step-3" },
    { title: "Rise from Ruku", description: "Rise up, saying 'Sami'Allahu liman hamidah'. Once upright, say 'Rabbana wa lakal-hamd'.", imageId: "salah-step-4" },
    { title: "Sujud", description: "Go into prostration, saying 'Allahu Akbar'. Say 'Subhana Rabbiyal A'la' three times.", imageId: "salah-step-5" },
    { title: "Jalsa", description: "Sit up from Sujud, saying 'Allahu Akbar'. Rest in this position briefly.", imageId: "salah-step-6" },
    { title: "Second Sujud", description: "Perform a second prostration just like the first.", imageId: "salah-step-5" },
    { title: "Tashahhud", description: "After the second Rak'ah, sit and recite the Tashahhud. In the final Rak'ah, also recite the Salawat.", imageId: "salah-step-7" },
    { title: "Salam", description: "Conclude the prayer by turning your head to the right and then left, saying 'Assalamu Alaikum wa Rahmatullah' each time.", imageId: "salah-step-8" },
];

function TutorialStep({ title, description, imageId }: { title: string, description: string, imageId: string }) {
  const image = PlaceHolderImages.find(img => img.id === imageId);
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg text-primary">{title}</h3>
            <p className="text-muted-foreground">{description}</p>
          </div>
          {image && (
            <div className="relative aspect-[3/2] w-full">
              <Image
                src={image.imageUrl}
                alt={description}
                fill
                className="rounded-md object-cover"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default function SalahPage() {
  return (
    <div>
      <Header title="Salah Tutorial" />
      <main className="p-4 sm:p-6 space-y-8">
        <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Wudu (Ablution)</h2>
            <Accordion type="single" collapsible className="w-full">
                {wuduSteps.map((step, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-xl font-headline">{index + 1}. {step.title}</AccordionTrigger>
                        <AccordionContent>
                            <TutorialStep {...step} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
        <div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4">Salah (Prayer)</h2>
            <Accordion type="single" collapsible className="w-full">
                {salahSteps.map((step, index) => (
                     <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-xl font-headline">{index + 1}. {step.title}</AccordionTrigger>
                        <AccordionContent>
                            <TutorialStep {...step} />
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </main>
    </div>
  );
}
