import { getFormById } from "@/lib/actions/form";
import VisitBtn from "./_components/VisitBtn";
import FormLinkShare from "./_components/FormLinkShare";
import StatsCard from "@/app/(dashboard)/_components/StatsCard";
import { BookText, MousePointerClick, MousePointerSquareDashed, View } from "lucide-react";

interface FormDetailPageProps {
  params: Promise<{ id: string | number }>
}

const FormDetailPage = async ({ params }: FormDetailPageProps) => {
  const { id } = await params; 
  const form = await getFormById(Number(id));

  if (!form) {
    throw new Error("Form not found")
  }

  const { visits, submissions } = form;

  let submissionRate = 0;

  if (visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;
  
  return (
    <>
      <div className="py-10 border-t border-b border-muted">
        <div className="flex justify-between container">
          <h1 className="text-4xl font-bold truncate">{form.name}</h1>
          <VisitBtn shareUrl={form.shareURL} />
        </div>
      </div>
      <div className="py-4 border-b border-muted">
        <div className="container flex gap-2 items-center justify-between">
          <FormLinkShare shareUrl={form.shareURL}/>
        </div>
      </div>
      <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
      <StatsCard 
        title="Total Visits"
        icon={<View className="text-blue-600"/>}
        value={visits.toLocaleString() || "0"}
        helperText="All time form visits"
        loading={false}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard 
        title="Total Submissions"
        icon={<BookText className="text-yellow-600"/>}
        value={submissions.toLocaleString() || "0"}
        helperText="All time submissions"
        loading={false}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard 
        title="Submissions Rate"
        icon={<MousePointerClick className="text-green-600"/>}
        value={submissionRate.toLocaleString() + "%"}
        helperText="Visits that results in form submissions"
        loading={false}
        className="shadow-md shadow-green-600"
      />
      <StatsCard
        title="Bounce Rate"
        icon={<MousePointerSquareDashed className="text-red-600"/>}
        value={bounceRate.toLocaleString() + "%"}
        helperText="Visits that leaves without interacting"
        loading={false}
        className="shadow-md shadow-red-600"
      />
      </div>

      <div className="container pt-10">
        <SubmissionTable id={form.id} />
      </div>
    </>
  );
}

export default FormDetailPage;

function SubmissionTable({ id }: {id: number}) {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Submissions</h1>
    </>
  )
}