import { 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Social from "./Social";

interface CardWrapperProps {
  children: React.ReactNode,
  footer?: React.ReactNode,
  label?: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  footer,
  label="Welcome",
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className='w-[400px] shadow-md enforced authForm'>
      <CardHeader>
        <CardTitle className='hidden'/>
        <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
          <h1 className={cn("text-3xl font-semibold")}>Auth</h1>
          <p className='text-muted-foreground text-sm'>{label}</p>
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>

  )
}

export default CardWrapper;