import { notFound } from "next/navigation";
import TourDetails from "@/Components/TourDetails";
import { getTourById } from "@/lib/api/added-tours";

type PageProps = {
  params: Promise<{ id: string }>;
};


export default async function TourDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const tour = await getTourById(id);
  
  if (!tour) {
    notFound();
  }

  return <TourDetails tour={tour} />;
}