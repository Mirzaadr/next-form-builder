import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getForms, getFormStats } from "@/lib/actions/form";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, BookText, Edit, LucideFolderMinus, MousePointerClick, MousePointerSquareDashed, View } from "lucide-react";
import { HTMLAttributes, ReactNode, Suspense } from "react";
import CreateFormBtn from "./_components/CreateFormBtn";
import { cn } from "@/lib/utils";
import { Form } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const DashboardPage = () => {
  return (
    <div className='pt-4 px-5 items-center w-full'>
      <Suspense fallback={<StatsCards loading={true}/>}>
        <CardStatsWrapper />
      </Suspense>
      <Separator className="my-6"/>
      <h2 className="text-4xl font-bold col-span-2">Your Form</h2>
      <Separator className="my-6"/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
        <CreateFormBtn />
        <Suspense fallback={[1,2,3,4].map(el => <FormCardSkeleton key={el}/>)}>
          <FormCards />
        </Suspense>
      </div>
    </div>
  )
}

const CardStatsWrapper = async () => {
  const stats = await getFormStats()

  return <StatsCards loading={false} data={stats.data} />
} 

interface StatsCardsProps {
  data?: Awaited<ReturnType<typeof getFormStats>>["data"];
  loading: boolean;
}

const StatsCards = (props: StatsCardsProps) => {
  const {data, loading} = props;

  return (
    <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard 
        title="Total Visits"
        icon={<View className="text-blue-600"/>}
        value={data?.visits.toLocaleString() || "0"}
        helperText="All time form visits"
        loading={loading}
        className="shadow-md shadow-blue-600"
      />
      <StatsCard 
        title="Total Submissions"
        icon={<BookText className="text-yellow-600"/>}
        value={data?.submissions.toLocaleString() || "0"}
        helperText="All time submissions"
        loading={loading}
        className="shadow-md shadow-yellow-600"
      />
      <StatsCard 
        title="Submissions Rate"
        icon={<MousePointerClick className="text-green-600"/>}
        value={data ? data?.submissionRate.toLocaleString() + "%" : "0"}
        helperText="Visits that results in form submissions"
        loading={loading}
        className="shadow-md shadow-green-600"
      />
      <StatsCard 
        title="Bounce Rate"
        icon={<MousePointerSquareDashed className="text-red-600"/>}
        value={data ? data?.bounceRate.toLocaleString() + "%" : "0"}
        helperText="Visits that leaves without interacting"
        loading={loading}
        className="shadow-md shadow-red-600"
      />
    </div>
  )
}

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  helperText: string;
  loading: boolean;
  className: HTMLAttributes<HTMLDivElement>["className"];
}

const StatsCard = ({
  title,
  value,
  icon,
  helperText,
  loading,
  className,
}: StatsCardProps) => {
  return (
    <Card className={cn(className, "w-full")}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {loading && (
            <Skeleton>
              <span className="opacity-0">0</span>
            </Skeleton>
          )}
          {!loading && <span>{value}</span>}
        </div>
        <p className="text-xs text-muted-foreground pt-1">{helperText}</p>
      </CardContent>
    </Card>
  );
}

const FormCardSkeleton = () => {
  return (
    <Skeleton className="border-2 border-primary/20 h-190px w-full"/>
  )
}

const FormCards = async () => {
  const forms = await getForms();

  return (
    <>
      {forms.map((form) => (
        <FormCard key={form.id} form={form} />
      ))}
    </>
  )
}

const FormCard = ({ form }: { form: Form }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <span className="truncate font-bold">
            {form.name}
          </span>
          {form.published && <Badge>Published</Badge>}
          {!form.published && <Badge variant="destructive">Draft</Badge>}
        </CardTitle>
        <CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
          {formatDistance(form.createdAt, new Date(), {
            addSuffix: true,
          })}
          {
            form.published && (
            <span className="flex items-center gap-2">
              <View className="text-muted-foreground"/>
              <span>{form.visits.toLocaleString()}</span>
              <BookText className="text-muted-foreground"/>
              <span>{form.submissions.toLocaleString()}</span>
              <MousePointerClick className="text-muted-foreground"/>
              <span>{form.visits.toLocaleString()}</span>
              <MousePointerSquareDashed className="text-muted-foreground"/>
              <span>{form.visits.toLocaleString()}</span>
            </span>
            )
          }

        </CardDescription>
      </CardHeader>
      <CardContent className="h-[20px] truncate text-sm text-muted-foreground">
        {form.description || "No description"}
      </CardContent>
      <CardFooter>
        {form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4">
            <Link href={`/forms/${form.id}`}>
              View submissions <ArrowRight className="size-4"/>
            </Link>
          </Button>
          )}
        {!form.published && (
          <Button asChild className="w-full mt-2 text-md gap-4" variant="secondary">
            <Link href={`/builder/${form.id}`}>
              Edit form <Edit className="size-4"/>
            </Link>
          </Button>
          )}
      </CardFooter>
    </Card>
  )
}

export default DashboardPage;